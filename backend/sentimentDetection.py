from flask import Flask, request, jsonify


app = Flask(__name__)



# return sentiment of text based on input
@app.rout('/sentimentDetection', methods=['POST'])
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
