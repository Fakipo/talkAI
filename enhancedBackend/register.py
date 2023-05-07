import sqlite3
from flask import Blueprint, request, jsonify

register_api = Blueprint('register_api', __name__)
conn = sqlite3.connect('talkAI.db')
cursor = conn.cursor()



# Define the table schema
cursor.execute('''
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY,
        name TEXT,
        email TEXT
    )
''')


@register_api.route('/register', methods=['POST'])
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

        # Insert data into the database
        cursor.execute('INSERT INTO users (firstName, lastName, email, password, gender, dob, phoneNumber) VALUES (?, ?)', (firstName, lastName, email, password, gender, dob, phoneNumber))
        conn.commit()
        print('Data saved to database.')

        return jsonify({'message': 'User registered successfully.'}), 200, {'Content-Type': 'application/json'}
    except Exception as e:
        error_message = {'error': str(e)}
        return jsonify(error_message), 400, {'Content-Type': 'application/json'}


# Close the connection to the database
conn.close()

