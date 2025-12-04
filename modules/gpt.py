from openai import OpenAI
from pydantic import BaseModel
from dotenv import load_dotenv
import os
from modules.parameter_executer import ExecuteParameter
import openai

load_dotenv()
client = OpenAI(api_key=os.getenv("openai_api_key"))

def ai_sql_pipeline(user_input):
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

    execute_parameter = ExecuteParameter()
    parameter = execute_parameter.parse_json(response.output_parsed.model_dump_json(indent=2))
    # json_format = json.dumps(parameter, indent = 2)
    # print(f'JSON FORMAT:\n{json_format}')
    # print(f'PRINTING PARAMETER\n{parameter}')
    result = execute_parameter.execute_sql(parameter) # result are classes from database
    return result

def ai_choose_electives(electives, user_input):
    # print(f'elective: {electives}')
    # print(type(electives))
    # print(f'ui: {ui}')
    content = f'Electives {electives}\nUser Input: {user_input}'
    response = client.responses.create(
        model="gpt-5-mini",
        instructions = """
            Based on the user's input, select the number of electives specified by the user that best suit their personal interests. 
            Return the electives in the same JSON format as received. Do not include any additional text, explanations, or commentary. Only return the JSON array of electives.

            Filter electives according to the user's year:
            - First-year user → include only class codes starting with 1 or 2
            - Second-year user → include only class codes starting with 2 or higher
            - Third-year user → include only class codes starting with 3 or higher
            - Fourth-year user → include only class codes starting with 4 or higher

            Also consider the user's stated interests and prioritize electives that align with those interests.

            The user will provide:
            - Their year
            - Their interests
            - The list of available electives in JSON format
            - The number of electives they want
            """,
        input = [{'role': 'user', 'content': content}]
    )

    # print(f'printing response...\n{response}') # <-- debugging to see response of ai
    return response.output[1].content[0].text


# function was used for testing purposes to see how OpenAI's model worked.
# def get_response(user_input):
#     client = OpenAI(api_key=os.getenv("openai_api_key"))
#     chatbot_client = client.responses.create(
#         model="gpt-5-nano",
#         input = [
#             {
#                 "role": "system",
#                 "content": "answer any question the user has or be nice and conversate with the user"
#             },
#             {
#                 "role": "user",
#                 "content": user_input
#             }
#         ]
#     )
#     print(chatbot_client.output_text)
#     return chatbot_client.output_text