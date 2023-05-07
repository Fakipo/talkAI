import sqlite3

def create_table(conn):
    print('we are here in create_table')
    cursor = conn.cursor()

    # Define the table schema
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            firstName TEXT,
            lastName TEXT,
            email TEXT,
            password TEXT NOT NULL,
            gender TEXT,
            dob TEXT,
            phoneNumber TEXT
        )
    ''')

    # Close the connection to the database
    return conn