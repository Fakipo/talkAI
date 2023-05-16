from functools import wraps

import requests
import sqlite3
from flask import Flask, request, jsonify
from createTables import create_table
import jwt
import datetime
from config import Config
# ...

app = Flask(__name__)
conn = sqlite3.connect('talkAI.db')
app.config.from_object('config.Config')


@app.route('/api_call', methods=['POST'])
def api_call():
    try:
        data = request.get_json()
        question = data['question']
        character = data['character']
        url = "https://api.openai.com/v1/chat/completions"
        headers = {
             "Authorization": "Bearer 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",
             "Content-Type": "application/json"
        }
        data = {
        "model": "gpt-3.5-turbo",
        "messages": [
            {
             "role": "system",
             "content": "You are " + character + ", when answering try to be funny while staying in the context of the question and keep the answer less than 25 words"
             },
            {
              "role": "user",
              "content": question,
            }
            ]
        }
        response = requests.post(url, headers=headers, json=data)

        answer = response.json()["choices"][0]["message"]["content"]
        return jsonify(answer), 200, {'Content-Type': 'application/json'}

        # print(question)
        # print(character)
        # message = 'Paras'
        # return jsonify(message), 200, {'Content-Type': 'application/json'}
    except Exception as e:
        print(e);
        error_message = {'error': str(e)}
        return jsonify(error_message), 400, {'Content-Type': 'application/json'}


@app.route('/login', methods=['POST'])
def login():
    try:
        data = request.get_json()
        email = data['email']
        password = data['password']
        conn = sqlite3.connect('talkAI.db')
        cursor = conn.cursor()
        cursor.execute('SELECT * FROM users WHERE email = ?', (email,))
        user_data = cursor.fetchone()
        print('we are here in login');
        if user_data:
            # If a user with the provided email exists in the database, check if the password matches
            if user_data[4] == password:
                # If the password is correct, return the user data
                payload = {
                    'sub': user_data[0],
                    'exp': datetime.datetime.utcnow() + datetime.timedelta(minutes=30)
                }
                token = jwt.encode(payload, app.config['SECRET_KEY'], algorithm='HS256')
                return jsonify({'message': 'Logged IN Successfully', 'token': token}), 200,  {'Content-Type': 'application/json'}
            else:
                # If the password is incorrect, return None
                return jsonify({'message': 'Wrong Username or password'}), 400, {'Content-Type': 'application/json'}
        else:
            # If a user with the provided email doesn't exist in the database, return None
            return jsonify({'message': 'Wrong Email or Password'}), 400, {'Content-Type': 'application/json'}
    except Exception as e:
        error_message = {'error': str(e)}
        return jsonify(error_message), 400, {'Content-Type': 'application/json'}


@app.route('/register', methods=['POST'])
def register():
    try:
        data = request.get_json()
        firstName = data['firstName']
        lastName = data['lastName']
        email = data['email']
        password = data['password']
        gender = data['gender']
        dob = data['dob']
        phoneNumber = data['phoneNumber']
        conn = sqlite3.connect('talkAI.db')
        cursor = conn.cursor()
        # Insert data into the database
        cursor.execute('INSERT INTO users (firstName, lastName, email, password, gender, dob, phoneNumber) VALUES (?, ?, ?, ? ,? ,? ,?)', (firstName, lastName, email, password, gender, dob, phoneNumber))
        conn.commit()
        print('Data saved to database.')

        return jsonify({'message': 'User registered successfully.'}), 200, {'Content-Type': 'application/json'}
    except Exception as e:
        error_message = {'error': str(e)}
        return jsonify(error_message), 400, {'Content-Type': 'application/json'}

@app.route('/check_token', methods=['GET'])
def check_token():
    try:
        token = request.headers.get('Authorization').split()[1]
        print('token is', token)
        payload = jwt.decode(token, app.config['SECRET_KEY'], algorithms=['HS256'])
        print('all working fine')
        return jsonify({'message': 'Token is valid'}), 200
    except jwt.ExpiredSignatureError as e:
        print('we are here throwing errror??? ', e)
        return jsonify({'message': 'Token has expired'}), 401
    except (jwt.InvalidTokenError, IndexError):
        print('we are here throwing errror???')
        return jsonify({'message': 'Invalid token'}), 401

@app.route('/logout', methods=['POST'])
def logout():
    try:
        token = request.headers.get('Authorization').split()[1]
        print('we are logging out token = ', token )
        payload = jwt.decode(token, app.config['SECRET_KEY'], algorithms=['HS256'])
        payload['exp'] = datetime.datetime.utcnow()
        return jsonify({'message': 'Logged out successfully'}), 200, {'Content-Type': 'application/json'}
    except jwt.ExpiredSignatureError as e:
        print('we are here log out error 1')
        return jsonify({'message': 'Token has expired'}), 401, {'Content-Type': 'application/json'}
    except (jwt.InvalidTokenError, IndexError):
        print('we are here log out error 1')
        return jsonify({'message': 'Invalid token'}), 401, {'Content-Type': 'application/json'}

if __name__ == '__main__':
    create_table(conn)
    app.run(host='192.168.29.144', port=5000, debug = True)
