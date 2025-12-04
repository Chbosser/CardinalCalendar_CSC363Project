import psycopg2
import os
from dotenv import load_dotenv
import json
import textwrap

load_dotenv()

class QueryBuilder:
    def insert_user(self):
        string = textwrap.dedent("""
                            INSERT INTO users
                                 (first_name, last_name, email, username, password_hash)
                                 VALUES (%s, %s, %s, %s, %s)
                                   
                """)
        return string
    
    def get_user(self):
        string = textwrap.dedent("""
SELECT username, password_hash FROM users WHERE username = %s
""")
        return string
    
class UserTable:
    conn = psycopg2.connect(host = 'localhost', dbname = "csc363project", user = 'postgres', password = os.getenv('password'), port = 5432)
    cur = conn.cursor()
    query_builder = QueryBuilder()

    def create_user(self, fname, lname, email, username, password):
        query = self.query_builder.insert_user()
        user_created = self.cur.execute(query, (fname, lname, email, username, password))
        self.conn.commit()
        return user_created
    
    def get_user(self, username):
        query = self.query_builder.get_user()
        self.cur.execute(query, (username,))
        user_from_db = self.cur.fetchone()
        return user_from_db