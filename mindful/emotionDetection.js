'use strict';

// require request packags
const request = require('request');

// define access to Microsoft Faces API
const subscriptionKey = '23699a2992f34aa6ab96464fb0a9bec7';
const uriBase = 'https://westcentralus.api.cognitive.microsoft.com/face/v1.0/detect';


const imageUrl =
    'https://previews.123rf.com/images/iordani/iordani1612/iordani161201373/68220326-problem-depressioned-teenage-with-messed-hair-and-sad-face-real-junky-bad-looking-girl-close-up.jpg';

function detectEmotion(imageUrl) {
    // Request parameters.
    const params = {
        'returnFaceId': 'true',
        'returnFaceLandmarks': 'false',
        'returnFaceAttributes': 'emotion'
    };

    const options = {
        uri: uriBase,
        qs: params,
        body: '{"url": ' + '"' + imageUrl + '"}',
        headers: {
            'Content-Type': 'application/json',
            'Ocp-Apim-Subscription-Key' : subscriptionKey
        }
    };


    var ret = 'oh'
    var r = request.post(options, (error, response, body) => {
        if (error) {
            console.log('Error: ', error);
            return 'uh';
        }
        let jsonResponse = JSON.stringify(JSON.parse(body), null, '  ');
        console.log('JSON Response\n');
        console.log(jsonResponse);
        // want to return the jsonResponse from this function
    });

}

var emotion = detectEmotion(imageUrl)
console.log(emotion)
