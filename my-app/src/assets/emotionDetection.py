import cognitive_face as cf
import numpy as np


# get access to faces API
faces_key = '23699a2992f34aa6ab96464fb0a9bec7'
faces_url = 'https://westcentralus.api.cognitive.microsoft.com/face/v1.0'
cf.Key.set(faces_key)
cf.BaseUrl.set(faces_url)


# returns bounds of all faces in input image
def getRectangle(faceDictionary):
    rect = faceDictionary['faceRectangle']
    left = rect['left']
    top = rect['top']
    bottom = left + rect['height']
    right = top + rect['width']
    return ((left, top), (bottom, right))


# detects emotion based on input image
def detectEmotion(img):
    # determine faces and their attributes
    faces = cf.face.detect(img, 'true', 'false', 'age,gender,headPose,smile,facialHair,glasses,emotion,hair,makeup,occlusion,accessories,blur,exposure,noise')

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
    return(emotions[largestRectangleIdx])
