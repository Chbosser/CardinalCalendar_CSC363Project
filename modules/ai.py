from openai import OpenAI
from pydantic import BaseModel
from dotenv import load_dotenv
import os
import json

load_dotenv()
class HardConstraints(BaseModel):
    unavailable_days: list[str]
    no_class_after: str

class Parameters(BaseModel):
    term: str
    major: str
    required_courses: list[str]
    electives: list[str]
    hard_constraints: HardConstraints

client = OpenAI(api_key=os.getenv("openai_api_key"))
response = client.responses.parse(
    model = "gpt-5-nano",
    reasoning={"effort": "low"},
    instructions= """
"You are an expert at structured data extraction. You will be given unstructured text from a research paper and should convert it into the given structure. Please note the following when creating the structure:
- electives: only use the class code like CSC, MATH
- unavailable_days: Use the first 3 letters of the day with the first Letter capatailized and the rest lowercase.
- no_class_after: use 12 hour time, with PM or AM respectively to the user's input with no space inbetween the time and PM or AM "
""",
    input = [
        {
            "role": "user",
            "content": "Hello, I am Elio. I am a 3rd year Computer Science Major looking to register for the Spring 2026 term. My required courses are CSC306 and CSC409. I also need to take 1 MATH elective and 2 CSC electives. I don't want friday classes and prefer not to have classes after 7PM"
        }
    ],
    text_format=Parameters
)
print(response.output_parsed.model_dump_json(indent=2))
