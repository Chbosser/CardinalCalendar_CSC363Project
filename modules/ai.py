from openai import OpenAI
from pydantic import BaseModel
from dotenv import load_dotenv
import os
import json
from modules.module1 import Parameter
import openai

load_dotenv()
client = OpenAI(api_key=os.getenv("openai_api_key"))

# What a user input should look like
# "Hello, I am Elio. I am a 3rd year Computer Science Major looking to register for the Spring 2026 term. My required courses are CSC306 and CSC409. I also need to take 1 MATH elective and 2 CSC electives. I don't want friday classes and prefer not to have classes after 6PM"

def run_ai(user_input):
    class HardConstraints(BaseModel):
        unavailable_days: list[str]
        no_class_after: str

    class ParameterStructure(BaseModel):
        term: str
        major: str
        required_courses: list[str]
        electives: list[str]
        hard_constraints: HardConstraints

    response = client.responses.parse(
        model = "gpt-5-nano",
        reasoning={"effort": "low"},
        instructions= """
    "You are an expert at structured data extraction. You will be given unstructured text from a user's metadata and should convert it into the given structure. 
    {
        "term": "Spring 2026",
        "major": "Computer Science",
        "required_courses": ["CSC306", "CSC409"],
        "electives": ["MATH", "CSC"],
        "hard_constraints": {
            "unavailable_days": ["Mon", "Fri"],
            "no_class_after": "4PM"
        }
    }
    Please note the following when creating the structure:
    - electives: only use the class code like CSC, MATH
    - unavailable_days: Use the first 3 letters of the day with the first Letter capatailized and the rest lowercase.
    - no_class_after: use 12 hour time, with PM or AM respectively to the user's input with no space inbetween the time and PM or AM 
    """,
        input = [
            {
                "role": "user",
                "content": user_input
            }
        ],
        text_format=ParameterStructure
    )

    execute_parameter = Parameter()
    parameter = execute_parameter.parse_json(response.output_parsed.model_dump_json(indent=2))
    json_format = json.dumps(parameter, indent = 2)
    print(f'JSON FORMAT:\n{json_format}')
    print(f'PRINTING PARAMETER\n{parameter}')
    result = execute_parameter.execute_parametersv2(parameter)
    return result


def get_response(user_input):
    client = OpenAI(api_key=os.getenv("openai_api_key"))
    chatbot_client = client.responses.create(
        model="gpt-5-nano",
        input = [
            {
                "role": "system",
                "content": "answer any question the user has or be nice and conversate with the user"
            },
            {
                "role": "user",
                "content": user_input
            }
        ]
    )
    print(chatbot_client.output_text)
    return chatbot_client.output_text