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

    # takes json string as a parameter and returns it as a python object
    def parse_json(self, string: str) -> dict:
        return json.loads(string)
    
    # checks if the parameter is a python object
    def is_json_to_dict(self, parameter: dict) -> bool:
        if isinstance(parameter, dict):
            return True
        else:
            return False
        
    
    def execute_parametersv1(self, parameter: dict) -> str: # returns JSON-formatted string

        query_builder = QueryBuilder()
        query = query_builder.build_sqlv1(parameter)
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
        return json.dumps(result, indent=1) # returns JSON-formatted string
    
    def execute_cs_curriculum(self, parameter: dict):
        
        query_builder = QueryBuilder()
        query = query_builder.build_curriculum_sql(parameter)
        print(query) # prints sql query for debugging
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
    
    def execute_parametersv2(self, parameter):
        list_of_queries = []
        query_builder = QueryBuilder()
        query = query_builder.build_sqlv2(parameter)
        # print(str(query[1]))
        for q in query:
            print(f'\nquery: {q}')

        for q in query:
            self.cur.execute(q)
            colnames = []
            for desc in self.cur.description:
                colnames.append(desc[0])

            rows = self.cur.fetchall()

            result = []
            for row in rows:
                result.append(dict(zip(colnames, row)))
            list_of_queries.append(json.dumps(result, indent=1))
        #print(qz)
        return list_of_queries

    
# cur.close()
# conn.close()