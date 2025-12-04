# CardinalCalender_CSC363Project
The app, Cardinal Calendar, is designed to help students plan their academic journey by interacting with an AI model. Students will input key information such as their major, required courses, and personal interests. In response, the AI will offer personalized course recommendations for upcoming semesters.

## Web Scraping
A Python web scraper was developed to handle the large amount of course data from CUA course catalog. This scraper is located in the data folder as `cua.py`, this script utilizes the Selenium library. By extracting the data, we were able to also insert it into our local database simultaneously. There were over 3000 courses offered in the Spring 2026 semester. 

## Backend (Flask)
For this project, we utilized Flask, a Python web framework to easily develop web applications easily. We needed a backend for endpoints, communication for our database, and data manipulation. The backend's main responsibilities were: 
* handle requests from the frontend
* manage the database
* authenticate user data and user authentication
* send course data to the frontend
* use functions from different modules such as the `gpt.py`, `parameter_executer.py`, and `query_builder.py` modules.

## Frontend (HTML + JavaScript)
Using Vanilla HTML, CSS, and JavaScript, we were able to design a calendar UI that is inspired by Coursicle. The UI is broken down into 3 sections. The first section contains the buttons such as settings, export, and sign out. THe middle section is the bulk of the UI, where the calendar and hour blocks were constructed. The final section contains the chat-box/chat-field, wehre the user can input their needs. The frontend's main responsibilities were:
* send HTTP requests to the backend containing form data
* insert courses into the correct day and time in the calendar
* display electives in the chat box
* allow user to add, delete, and modify their own calendar to their own personal needs

In addition to this, modern UI features such as dark mode were implemented to enhance styling and user satisfaction.

## AI Components + Other Modules
The highlight of this project was incorporating AI into this project. For most of us, it was our first time using OpenAI's API. This came with many challenges, such as extracting the result from models, tokenization utilization, cost per token, incorporating user data into the responses, etc. However, with trial and error, we successfully implemented 2 models into the project.

Using OpenAI's `gpt-5-nano` model, we wanted the model to parse the user input into the following parameter: 
<pre> ```
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
``` </pre>

In other words, if the user were to say,
"I am a 3rd year Computer Science Major looking to register for the Spring 2026 term. My required courses are CSC306 and CSC409. I also need to take 1 MATH elective and 2 CSC electives. I don't want friday classes and prefer not to have classes after 6PM. I like graph theory classes and I want computer science electives that can help me land a software engineering job."

The `gpt-5-nano` model will parse the input into the following parameter. This parameter will then be used by the `parameter_executer.py` and the `query_builder.py` module to both build a SQL query based on the parameter, and execute it to retrieve data from the database.

Once we have all the course data, the second AI model can be used to reason through each elective and choose the right number of electives based on the user's personal interests and need. For this function, we used OpenAI's `gpt-5-mini` model. This model provides a greater sense of reasoning compared to `gpt-5-nano`, which was needed to select electives. In addition, it was faster at processing the large amount of data.

Below is a code snippet with the instructions used to showcase how the model decided on electives:
```python
def ai_choose_electives(electives, user_input):
    content = f'Electives {electives}\nUser Input: {user_input}'
    response = client.responses.create(
        model="gpt-5-mini",
        instructions = """
            Based on the user's input, select the number of electives
            specified by the user that best suit their personal interests. 
            Return the electives in the same JSON format as received.
            Do not include any additional text, explanations, or commentary.
            Only return the JSON array of electives.

            Filter electives according to the user's year:
            - First-year user → include only class codes starting with 1 or 2
            - Second-year user → include only class codes starting with 2 or higher
            - Third-year user → include only class codes starting with 3 or higher
            - Fourth-year user → include only class codes starting with 4 or higher

            Also consider the user's stated interests and prioritize electives that
            align with those interests.

            The user will provide:
            - Their year
            - Their interests
            - The list of available electives in JSON format
            - The number of electives they want
            """,
        input = [{'role': 'user', 'content': content}]
    )
    return response.output[1].content[0].text
```
Once the electives have been chosen, it is returned to frontend for it to be displayed to the user. 

## How to Run Cardinal Calendar
1. Clone the Repository (or download the project folder)
2. Create and Activate a Virtual Environment on your local machine
   
   If you are on MacOS, run the following commands in your terminal
  ```
  python3 -m venv .venv
  source .venv/bin/activate
  ```

3. Install Dependencies
   
   There is a `requirements.txt` file that lists all of the libraries used in this project. Run the following command: `pip install -r requirements.txt`

4. Set up the Database
   
    In the backend/services/database.py directory, make sure you update the settings and succesfully connect your own database credentials. Note: We used postgresql for our database.
  
5. Start the Backend Server

    In your terminal, run the following command: `python3 -m backend.app`
  
6. Start the Frontend

    We used Live Server (VS Code Extension) to create a frontend server on `http://127.0.0.1:5500`
