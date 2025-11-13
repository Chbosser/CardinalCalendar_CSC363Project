import psycopg2
import os
from dotenv import load_dotenv
import json
import textwrap

load_dotenv()

class Parameter:
    
    conn = psycopg2.connect(host="localhost", dbname = "csc363project", user = "postgres", password = os.getenv("password"), port = 5432)
    cur = conn.cursor()

    def jsonify(self, string):
        return json.loads(string)
    
    def is_json_to_dict(self, parameter):
        if isinstance(parameter, dict):
            return True
        else:
            return False
        
    def get_json(self, parameter):
        if self.is_json_to_dict(parameter):
            day = parameter['hard_constraints']['unavailable_times'][0]['day']
            day = f'{day}%'
        query = textwrap.dedent("""
          SELECT 
            class_section_number,
            class.crs_code,
            crs_name,
            crs_credit,
            subject_name,
            term,
            class_instructor,
            class_time,
            class_days
          FROM
            class
          FULL JOIN course
            on class.crs_code = course.crs_code
          WHERE
            class_time <> 'TBA'
            AND subject_name = %s
            AND term = %s
            AND class_days NOT LIKE %s
            AND class_instructor LIKE %s             
          """)
        self.cur.execute(query, (parameter['major'], parameter['term'], day,parameter['preferences']['instructor']))

        # the following were passed in:
        # Major
        # Term
        # Unavailable Days
        # Instructor

        colnames = [desc[0] for desc in self.cur.description]
        rows = self.cur.fetchall()

        result = [dict(zip(colnames, row)) for row in rows]
        # print(json.dumps(result, indent=1))
        return json.dumps(result, indent=1)
    
# cur.close()
# conn.close()