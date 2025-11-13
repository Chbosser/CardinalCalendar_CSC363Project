import psycopg2
import os
from dotenv import load_dotenv
import json
import textwrap
from modules.query_builder import QueryBuilder

load_dotenv()

class Parameter:
    
    conn = psycopg2.connect(host="localhost", dbname = "csc363project", user = "postgres", password = os.getenv("password"), port = 5432)
    cur = conn.cursor()

    def jsonify(self, string: str):
        return json.loads(string)
    
    def is_json_to_dict(self, parameter: dict) -> bool:
        if isinstance(parameter, dict):
            return True
        else:
            return False
        
    def get_json(self, parameter: dict):

        query_builder = QueryBuilder()
        query = query_builder.build_query(parameter)
        values = query_builder.values

        # print(f'\nquery: {query}')
        # print(f'values: {values}')
        self.cur.execute(query, values)

        query_builder.clear_values()

        colnames = []
        for desc in self.cur.description:
            colnames.append(desc[0])

        rows = self.cur.fetchall()

        result = []
        for row in rows:
            result.append(dict(zip(colnames, row)))

        # print(json.dumps(result, indent=1))
        return json.dumps(result, indent=1)
    
    def get_json2(self, parameter: dict):
        
        query_builder = QueryBuilder()
        query = query_builder.curriculum_query(parameter)
        print(query)
        self.cur.execute(query)

        colnames = []
        for desc in self.cur.description:
            colnames.append(desc[0])

        rows = self.cur.fetchall()

        result = []
        for row in rows:
            result.append(dict(zip(colnames, row)))

        # print(json.dumps(result, indent=1))
        return json.dumps(result, indent=1)

    
# cur.close()
# conn.close()