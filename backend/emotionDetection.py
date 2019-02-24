import cognitive_face as cf
from flask import Flask, request, jsonify
import numpy as np
from flask_cors import CORS
import io
import base64
import requests


# define flask env
app = Flask(__name__)
CORS(app)

# returns bounds of all faces in input image
def getRectangle(faceDictionary):
    rect = faceDictionary['faceRectangle']
    left = rect['left']
    top = rect['top']
    bottom = left + rect['height']
    right = top + rect['width']
    return ((left, top), (bottom, right))


# main function
# detects emotion based on input image
@app.route('/post', methods=['POST'])
def detectEmotion():
    # request image

    img = request.values['img']
    # get access to faces API
    faces_key = '23699a2992f34aa6ab96464fb0a9bec7'
    faces_url = 'https://westcentralus.api.cognitive.microsoft.com/face/v1.0'
    cf.Key.set(faces_key)
    cf.BaseUrl.set(faces_url)
    file_img = io.BytesIO(base64.b64decode(img))

    # with open("imageToSave.png", "wb") as fh:
    #     fh.write(base64.decodebytes(img))

    # determine faces and their attributes
    faces = cf.face.detect(file_img, 'true', 'false', 'age,gender,headPose,smile,facialHair,glasses,emotion,hair,makeup,occlusion,accessories,blur,exposure,noise')
    if len(faces) == 0:
        return jsonify('No face detected :(')
                       
    # identify emotions of faces and their locations; create rectangles around bounds of faces detected
    emotions =[]
    rectangles = []
    for face in faces:
        fa = face["faceAttributes"]
        emotions.append(max(fa["emotion"], key=fa['emotion'].get))
        rectangles.append(getRectangle(face))

    # use rectangle size to determine subject of image (for cases of multiple faces in crowd)
    for r in range(len(rectangles)):
        left = rectangles[r][0][0]
        top = rectangles[r][0][1]
        bottom = rectangles[r][1][0]
        right = rectangles[r][1][1]
        rectangles[r] = np.abs((left - right) * (top - bottom))

    largestRectangleIdx = np.argmax(rectangles)

    # return emotion of face
    print((emotions[largestRectangleIdx]))
    return jsonify(emotions[largestRectangleIdx])

@app.route('/journal', methods=['POST'])
def detectSentiment():
    # request text
    input_text = request.form['text']

    # define access to text analytics api
    text_key = '6c3ec9f51cf5412f88be0d2e59203fac'
    text_url = 'https://westcentralus.api.cognitive.microsoft.com/text/analytics/v2.0/'
    language_url = text_url + "languages"
    sentiment_url = text_url + "sentiment"


    # assert language is supported
    # currently supported: English
    lang_docs = { 'documents': [
        { 'id': '1', 'text': input_text}
    ]}
    lang_headers   = {"Ocp-Apim-Subscription-Key": text_key}
    lang_response  = requests.post(language_url, headers=lang_headers, json=lang_docs)
    languages = lang_response.json()
    detectedLanguage = languages['documents'][0]['detectedLanguages'][0]['name']
    if detectedLanguage != 'English':
        return 'Language is not currently supported.'

    # determine sentiment of input_text
    text_docs = {'documents' : [
      {'id': '1', 'language': 'en', 'text': input_text}
    ]}
    text_headers   = {"Ocp-Apim-Subscription-Key": text_key}
    text_response  = requests.post(sentiment_url, headers=text_headers, json=text_docs)
    sentiments = text_response.json()
    detectedSentiment = sentiments['documents'][0]['score']

    # return 'Negative', 'Neutral', 'Positive'
    if detectedSentiment < 0.30:
        return jsonify('Negative')
    elif detectedSentiment >= 0.70:
        return jsonify('Positive')
    else:
        return jsonify('Neutral')


if __name__ == '__main__':
    app.run()
