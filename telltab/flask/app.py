from flask import Flask
from flask import request
from autotag import autotag
from similarity import similarity

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

@app.route('/similarity', methods=['POST'])
def get_similarity():
    body = request.get_json()
    if not('doc1' in body and 'doc2' in body):
        return json.dumps({'success': False, 'error': 'Missing argument(s) in request body'})

    doc1 = body['doc1']
    doc2 = body['doc2']
    res = similarity(doc1, doc2)
    return json.dumps({'success': True, 'similarity': res})