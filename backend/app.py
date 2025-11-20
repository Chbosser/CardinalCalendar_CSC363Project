from flask import Flask, jsonify, request
from flask_cors import CORS
from backend.services.database import UserTable
from flask_bcrypt import Bcrypt
from flask_bcrypt import generate_password_hash, check_password_hash

app = Flask("__name__")
CORS(app)
flask_bcrypt = Bcrypt(app)

@app.route("/api")
def index():
    result = {
        "message": 'hi'
    }
    return jsonify(result)

@app.route("/register", methods = ['GET', 'POST'])
def register():
    user = UserTable()
    if request.method == 'POST':
        hash_password = generate_password_hash(request.form.get('password')).decode('utf-8')
        print(type(hash_password))
        user.create_user(request.form.get('fname'),request.form.get('lname'),request.form.get('emailaddress'),request.form.get('username'), hash_password)

    return jsonify({"success": True}), 201

@app.route('/login', methods = ['POST', 'GET'])
def login():
    if request.method == 'POST':
        user = UserTable()
        username = request.form.get('username')
        candidate = request.form.get('password').encode('utf-8')
        result = user.get_user(username)

        stored_hash = result[1].strip()
        password_matches = check_password_hash(stored_hash, candidate)
        if password_matches:
            return jsonify({'success': True})

        

if __name__ == "__main__":
    app.run(debug=True, port = 8000)