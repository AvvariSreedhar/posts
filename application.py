import time
from flask import Flask, render_template, request, jsonify

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('index.html') 

@app.route('/post')
def post():

    # Get start and end parameters for the posts
    try:
        start = int(request.args.get('start'))
        end = int(request.args.get('end'))
    except TypeError:
        return '<h1>Error: Please try again.</h1>'

    # Generate the list of posts
    data = []
    for i in range(start, end + 1):
        data.append(f'post-{i}')
        
    # Artificially delay speed of response
    time.sleep(1)

    # Return list of posts
    return jsonify(data)
