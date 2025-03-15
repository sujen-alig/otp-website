from flask import Flask, request, jsonify
import mysql.connector
import random
import datetime

app = Flask(__name__)

db = mysql.connector.connect(
    host="localhost",
    user="root",
    password="",
    database="otp_system"
)
cursor = db.cursor()

@app.route('/send_otp', methods=['POST'])
def send_otp():
    phone = request.json['phone']
    otp = str(random.randint(100000, 999999))
    expires = datetime.datetime.now() + datetime.timedelta(minutes=5)

    cursor.execute("INSERT INTO otps (phone_number, otp_code, expires_at) VALUES (%s, %s, %s)", (phone, otp, expires))
    db.commit()

    return jsonify({"otp": otp, "message": "OTP sent successfully"})

if __name__ == '__main__':
    app.run(host="0.0.0.0", port=5000)
