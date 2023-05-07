import requests
import sqlite3
from flask import Flask, request, jsonify
from createTables import create_table
app = Flask(__name__)
conn = sqlite3.connect('talkAI.db')

@app.route('/api_call', methods=['POST'])
def api_call():
    try:
        print('we are here')
        data = request.get_json()
        question = data['question']
        character = data['character']
        print(question)
        print(character)
        message = 'Paras'
        return jsonify(message), 200, {'Content-Type': 'application/json'}
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


if __name__ == '__main__':
    create_table(conn)
    app.run(host='192.168.29.144', port=5000, debug = True)
