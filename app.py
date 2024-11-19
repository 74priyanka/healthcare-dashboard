from flask import Flask, request
from flask_cors import CORS
import os
import logging

app = Flask(__name__)
CORS(app)

logging.basicConfig(level=logging.DEBUG)

UPLOAD_FOLDER = './uploads'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

@app.route('/upload', methods=['POST'])
def upload_file():
    
    name = request.form.get('name')
    age = request.form.get('age')
    file = request.files.get('file')
    

    app.logger.debug(f"Name: {name}, Age: {age}, File: {file.filename if file else None}")

    if not name or not age or not file:
        return {"message": "Missing data"},400
    
    file_path = os.path.join(UPLOAD_FOLDER, file.filename)
    file.save(file_path)

    return {"message": f"Data received: {name}, {age}, file saved as {file.filename}"}, 200

if __name__ == '__main__':
    app.run(debug=True, port=5000)