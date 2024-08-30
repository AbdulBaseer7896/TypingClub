from app import app
from functools import wraps
from flask import request , send_file , session , redirect , jsonify
from datetime import datetime
from model.user_model import user_model
obj  = user_model()

@app.route("/SignUp", methods=['POST'])
def SignUp():
    print("this is the sign up funciton in flask")
    data = request.json
    if not data:
        return jsonify({"message": "No data provided"}, 400)
    try:
        return obj.check_existing_user(request.json)
    
    except Exception as e:
        return jsonify({"message": str(e)}), 500


@app.route("/login", methods=['GET', 'POST'])
def Login():
    if request.method == 'POST':
        return obj.login_model(request.json)
    else:
        return jsonify({"message": "GET method not supported for this route"}), 405


@app.route("/loginData" )
def loginData():
    return jsonify({"message": "GET Login Data is working"}), 200


@app.route('/Ranking', methods=['GET'])
def Ranking():
    data  = obj.getRakingData()
    if isinstance(data, tuple) and isinstance(data[0], dict) and isinstance(data[1], int):
        return jsonify(data[0]), data[1]
    else:
        return jsonify(data), 200


@app.route("/uploadResult", methods=['POST'])
def uploadResult():    
    print("this work 2")
    data = request.json  # Correct way to get JSON data
    if not data:
        return jsonify({"message": "No data provided"}, 400)
    # try:
    return obj.check_last_score(request.json)
    
    # except Exception as e:
    #     return jsonify({"message": str(e)}), 500



@app.route('/api/logout', methods=['POST'])
def logout():
    obj.logout()
    return jsonify({"message": "User logged out successfully"})