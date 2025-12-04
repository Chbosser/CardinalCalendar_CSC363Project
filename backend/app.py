from flask import Flask, jsonify, request
from flask_cors import CORS, cross_origin
from backend.services.database import UserTable
from flask_bcrypt import Bcrypt
from flask_bcrypt import generate_password_hash, check_password_hash
from modules.gpt import ai_sql_pipeline, ai_choose_electives

app = Flask("__name__")
CORS(app)

flask_bcrypt = Bcrypt(app)

@app.route("/register", methods = ['GET', 'POST'])
def register():
    user = UserTable() # connects to database
    if request.method == 'POST':
        hash_password = generate_password_hash(request.form.get('password')).decode('utf-8') # hashing sensitive data is important to ensure security for a user's data
        # print(type(hash_password)) # <-- used in debugging purposes
        user.create_user(request.form.get('fname'),request.form.get('lname'),request.form.get('emailaddress'),request.form.get('username'), hash_password)

    return jsonify({"success": True}), 201

@app.route('/login', methods = ['POST', 'GET'])
def login():
    if request.method == 'POST':
        user = UserTable() # connects to database
        username = request.form.get('username')
        candidate = request.form.get('password').encode('utf-8')
        result = user.get_user(username)

        if result == None: # if statement ensures user is valid before checking password
            return jsonify({'success': False})
        
        stored_hash = result[1].strip()
        password_matches = check_password_hash(stored_hash, candidate)

        if password_matches:
            return jsonify({'success': True})
        else:
            return jsonify({'success': False})
        
@app.route('/cardinalcalendar', methods = ['POST', 'GET'])
def user_input():
    if request.method == 'POST':

        user_input = request.form.get('chat-input')
        result = ai_sql_pipeline(user_input) # result is a list of objects in a list (first index is the required classes, second index are electives)

        return jsonify(result)

@app.route('/electives', methods = ['POST', 'GET'])
def electives():
    electives = request.form.get('other')
    user_input = request.form.get('input')

    result = ai_choose_electives(electives, user_input)
    return jsonify(result)

if __name__ == "__main__":
    app.run(debug=True, port = 8000)
        
# @app.route("/api")
# def index():
#     result = {
#         "message": 'hi'
#     }
#     return jsonify(result)

# @app.route('/createconversation', methods = ['POST', 'GET'])
# def create_conversation():
#     convo = create_conversationID()
#     return jsonify({'convoid': convo.id})



# @app.route('/api/chatbot', methods = ['POST', 'OPTIONS'])
# def chat_bot():
#     if request.method == "OPTIONS":
#         return '', 200
#     if request.method == "POST":
#         print(request.form.get('chat-input'))
#         print(f'this is the string that i am supposed to get from the frontend.... {request.form.get('chat-input')}')
#         string = get_response(request.form.get('chat-input'))
#         return jsonify(string)
