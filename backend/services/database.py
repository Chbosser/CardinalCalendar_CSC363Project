import psycopg2
import os
from dotenv import load_dotenv
import json
from backend.services.query_builder import QueryBuilder

load_dotenv()

class UserTable:
    conn = psycopg2.connect(host = 'localhost', dbname = "csc363project", user = 'postgres', password = os.getenv('password'), port = 5432)
    cur = conn.cursor()
    query_builder = QueryBuilder()

    def create_user(self, fname, lname, email, username, password):
        query = self.query_builder.insert_user()
        did_it_happen = self.cur.execute(query, (fname, lname, email, username, password))
        self.conn.commit()
        return did_it_happen
    
    def get_user(self, username):
        query = self.query_builder.get_user()
        self.cur.execute(query, (username,))
        result = self.cur.fetchone()
        return result
    