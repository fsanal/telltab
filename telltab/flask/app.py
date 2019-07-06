from flask import Flask
from flask import request
from autotag import autotag

import json

app = Flask(__name__)

@app.route('/')
def hello():
    return 'Welcome to the backend server for ML algorithms!'

@app.route('/autotag', methods=['POST'])
def get_autotag():
    body = request.get_json()
    if not('tags' in body and 'title' in body and 'body' in body):
        return json.dumps({'success': False, 'error': 'Missing argument(s) in request body'})
    
    tags = body['tags']
    postTitle = body['title']
    postBody = body['body']
    res = autotag(tags, postTitle, postBody)
    if res == None:
        return json.dumps({'success': False, 'error': 'No auto tag found'})
    return json.dumps({'success': True, 'autotag': res})