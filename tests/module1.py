import time
import psycopg2
import os
from dotenv import load_dotenv
import json

# this script will test the following:
# given a set of parameters similar to:
# {
#     "user_id": "u123",
#     "term": "2026-Fall",
#     "major": "CS",
#     "completed_courses": ["MATH101", "CS101"],
#     "degree_requirements": [
#       "CORE_CS",
#       "MATH_REQ",
#       "ELECTIVES:6credits"
#       ],
#     "hard_constraints": {
#         "no_class_before": "11:00",
#         "max_credits": 18,
#         "min_credits": 12,
#         "unavailable_times": [
#         {"day": "Mon", "start": "13:00",  "end": "15:00"}
#         ]
#     },
#     "soft_constraints": {
#         "prefer_mwf": true,
#         "avoid_friday": true,
#         "maximize_morning_free": true
#     },
#     "must_take": ["CS301"],
#     "preferences": {
#         "instructor": ["Dr. Smith"],
#         "campus": "Main"
#         }
# }
# fetch the appropriate data from the database
# return data in json format

load_dotenv()
conn = psycopg2.connect(host="localhost", dbname = "csc363project", user = "postgres", password = os.getenv("password"), port = 5432)

cur = conn.cursor()

json_test_string1 = """
{
  "term": "Spring 2026",
  "major": "Computer Science",
  "completed_courses": ["MATH101", "CSC123"],
  "hard_constraints": {
    "no_class_before": "11:00",
    "unavailable_times": [
      {"day": "Mon", "start": "1:00PM", "end": "3:00PM"}
    ]
  },
  "soft_constraints": {
    "prefer_mw": true,
    "avoid_friday": true
  },
  "preferences": {
    "instructor": ["Dr. Rizk"],
    "campus": "Main"
  }
}
"""
test_paramter = json.loads(json_test_string1)

def json_to_dict_valid(value):
    if isinstance(value, dict):  
        return True
    else:
        return False

def obj_to_json():
    if json_to_dict_valid(test_paramter):

        day = test_paramter['hard_constraints']['unavailable_times'][0]['day']
        day = f'{day}%'

        cur.execute("SELECT class_section_number, class.crs_code, crs_name, subject_name, term, class_instructor, class_time, class_days FROM class FULL JOIN COURSE ON class.crs_code = course.crs_code WHERE class_time <> 'TBA' AND subject_name = %s AND term = %s AND class_days NOT LIKE %s", (test_paramter['major'], test_paramter['term'], day))

        colnames = [desc[0] for desc in cur.description]

        rows = cur.fetchall()

        result = [dict(zip(colnames, row)) for row in rows]

        return json.dumps(result, indent=1)
    

print(obj_to_json())


cur.close()
conn.close()

