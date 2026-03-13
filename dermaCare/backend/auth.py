from flask import Blueprint, request, jsonify

auth_bp = Blueprint("auth", __name__)

# Temporary in-memory storage
users = []

@auth_bp.route("/register", methods=["POST"])
def register():
    data = request.get_json()
    print("Register data received:", data)

    name = data.get("name")
    email = data.get("email")
    password = data.get("password")

    if not name or not email or not password:
        return jsonify({
            "success": False,
            "message": "All fields are required."
        }), 400

    # Check if email already exists
    for user in users:
        if user["email"] == email:
            return jsonify({
                "success": False,
                "message": "Email already registered."
            }), 400

    users.append({
        "name": name,
        "email": email,
        "password": password
    })

    print("Users after register:", users)

    return jsonify({
        "success": True,
        "message": "Registration successful."
    }), 201


@auth_bp.route("/login", methods=["POST"])
def login():
    data = request.get_json()
    print("Login data received:", data)
    print("Current users:", users)

    email = data.get("email")
    password = data.get("password")

    if not email or not password:
        return jsonify({
            "success": False,
            "message": "Email and password are required."
        }), 400

    for user in users:
        if user["email"] == email and user["password"] == password:
            return jsonify({
                "success": True,
                "message": "Login successful.",
                "user": {
                    "name": user["name"],
                    "email": user["email"]
                }
            }), 200

    return jsonify({
        "success": False,
        "message": "Invalid email or password."
    }), 401