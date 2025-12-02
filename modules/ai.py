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
# I am a 3rd year Computer Science Major looking to register for the Spring 2026 term. My required courses are CSC306 and CSC409. I also need to take 1 MATH elective and 2 CSC electives. I don't want friday classes and prefer not to have classes after 6PM. I like graph theory classes and I want computer science electives that can help me land a software engineering job.
# I am a 3rd year Computer Science Major looking to register for the Spring 2026 term. My required courses are CSC306 and CSC409. I also need to take 1 MATH elective and 2 CSC electives. I don't want friday classes and prefer not to have classes after 6PM. I like mathematical finance classes and I want computer science electives that can help me land a job unrelated to software engineering.
# "Hello, I am Elio. I am a 1st year Computer Science Major looking to register for the Spring 2026 term. My required courses are CSC306, CSC210, CSC223, and CSC322. I need 1 PHIL elective and I dont want friday classes and. no classes after 6pm"
#"Hello, I am Elio. I am a 1st year Computer Science Major looking to register for the Spring 2026 term. My required courses are CSC306, CSC210, CSC223, and CSC322. i have no electives and no hard constraints"


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

def conversate_with_ai(electives, ui):
    # print(f'elective: {electives}')
    # print(type(electives))
    # print(f'ui: {ui}')
    content = f'Electives {electives}\nUser Input: {ui}'
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

    print(f'printing response...\n{response}')
    return response.output[1].content[0].text

        # instructions="Based on the User input, return the specified amount (given by the user) of electives in which you think best suites their personal interests. Return the electives in the same FORMAT as received (json format) no other words needed just the format. In addition to that, the user will give you their year. only return electives that correspond to that year or above. for example. if the user is a first year. return electives that their class codes start with 1 or 2, if the user is a 3rd year, return electives that class codes only start with 3 and above. The user will also tell you their interests so keep in mind when choosing the electives",

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


# def create_conversationID():
#     conversation = client.conversations.create(
#         metadata={"topic": "course scheduling"}
#     )
#     return conversation

# def conversate_with_ai(id, electives, ui):
#     print('hiiiiiii')
#     content = f'Electives {electives}\nUser Input: {ui}'
#     convoid = id
#     response = client.responses.create(
#         model='gpt-5-nano',
#         conversation =convoid,
#         instructions="Given the list of ELECTIVES, you are going to try and figure out the best options for the user to take in their next semester by ASKING QUESTIONS nothing more. If given a new set of electives/classes, assume it is a different user., If the user's input has something along the lines 'my required classes are..., ignore that and only focus on what electives they need. Your job is to focus on the electives not the required classes. Ask 2 questions at most.",
#         input = [
#             {
#                 'role': 'user',
#                 'content': content
#             }
#         ]
#     )
#     print(response)
#     return response.output[1].content[0].text
