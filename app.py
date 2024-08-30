from flask import Flask , jsonify
from flask_cors import CORS 


app = Flask(__name__)
CORS(app)
# CORS(app, resources={r"/api/*": {"origins": "http://localhost:3000"}})



# @app.route("/")
# def Home():
#     return jsonify({"message": "this is the home app"}), 200

# @app.after_request
# def after_request(response):
#     response.headers.add('Access-Control-Allow-Origin', 'http://localhost:3000')
#     response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
#     response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
#     return response

from controller import *

if __name__ == "__main__":
    app.run(host='127.0.0.1', port=5000)