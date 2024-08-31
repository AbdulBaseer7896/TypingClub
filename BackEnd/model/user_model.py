
import mysql.connector
from flask import jsonify, make_response

class user_model():
    def __init__(self):
        self.cur = None
        self.isUserLogin = False
        self.connect_to_db()

    def connect_to_db(self):
        try:
            self.myDb = mysql.connector.connect(
                host="sql12.freesqldatabase.com",
                user="sql12728689",
                password="hxlD6IfBwc",
                database="sql12728689",
                connection_timeout=600
            )
            self.myDb.autocommit = True
            self.cur = self.myDb.cursor(dictionary=True)
            print("Connection established successfully")
        except Exception as e:
            print(f"Could not connect to the database. Error: {str(e)}")
            self.cur = None

    def execute_query(self, query, fetchone=False):
        if self.cur is None:
            self.connect_to_db()
        try:
            self.cur.execute(query)
            if fetchone:
                return self.cur.fetchone()
            else:
                return self.cur.fetchall()
        except mysql.connector.Error as err:
            print(f"Database query error: {err}")
            return None

    def check_existing_user(self, data):
        
        query = f"""SELECT * FROM user WHERE email = '{data['email']}' OR user_name = '{data['userName']}' OR number = {data['number']};"""
        result = self.execute_query(query, fetchone=True)
        if result:
            return jsonify({"message": "Email, Username, or Number already exists!"}), 400
        else:
            return self.insert_user(data)
        

    def check_last_score(self, data):
        query = f"""SELECT typingSpeed FROM TypingRanking WHERE useremail = '{data['email']}';"""
        result = self.execute_query(query)

        if result != [] :
            if(data['typingSpeed'] <= int(result[0]['typingSpeed'])):
                return jsonify({"message": "Your typing speed is lower than the current best score."}), 400
            else:
                return self.updateNewRanking(data)
        else:
            return self.insertNewRanking(data)
        
    def updateNewRanking(self, data):
        self.cur.execute(f""" Update TypingRanking set  accuracy = {data['accuracy']} , elapsedTime =  '{data['elapsedTime']}', typingSpeed =  {data['typingSpeed']} ,date = '{data['date']}' WHERE useremail = '{data['email']}';""")
        return make_response({"message": "The data is Update successfully"}, 201)

    def insertNewRanking(self, data):
        self.cur.execute(f""" INSERT INTO TypingRanking(useremail, userName, accuracy, elapsedTime, typingSpeed ,date ) 
                        VALUES('{data['email']}', '{data['name']}', {data['accuracy']}, 
                        '{data['elapsedTime']}' , {data['typingSpeed']} , '{data['date']}');""")
        return make_response({"message": "The data is inserted successfully"}, 201)
    

    def getRakingData(self):
        query = "SELECT * FROM TypingRanking WHERE accuracy > 95 ORDER BY typingSpeed DESC;"
        result = self.execute_query(query)
        if result:
            return result
        else:
            return jsonify({"message": "There is not Ranking Data!"}), 400




    def insert_user(self, data):
        # self.cur.execute(f""" INSERT INTO user(name, user_name, email, number, password) 
        #                 VALUES('{data['name']}', '{data['userName']}', '{data['email']}', 
        #                 '{data['number']}', ENCRYPT_PASSWORD('{data['password']}'));""")
        query = """
            INSERT INTO user(name, user_name, email, number, password) 
            VALUES(%s, %s, %s, %s, ENCRYPT_PASSWORD(%s));
        """
        self.cur.execute(query, (data['name'], data['userName'], data['email'], data['number'], data['password']))

            # return make_response({"message": "Failed to insert data"}, 500)
        return make_response({"message": "The data is inserted successfully"}, 201)

    def login_model(self, data):
        query = """
            SELECT id, email, name, number
            FROM user
            WHERE email = %s AND DECRYPT_PASSWORD(password) = %s;
        """
        self.cur.execute(query, (data['email'], data['password']))
        result = self.cur.fetchone()
        if result:
            self.isUserLogin = True
            return jsonify({
                "status": 'success',
                "role": "user",
                "payload": result
            }), 200
        else:
            return jsonify({"message": "Invalid credentials"}), 401

    def verify_userLogin(self):
        return self.isUserLogin

    def logout(self):
        self.isUserLogin = False
        return jsonify({"message": "User logged out successfully"}), 200
