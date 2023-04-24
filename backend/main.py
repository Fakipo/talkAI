
import requests
from flask import Flask, request, jsonify

app = Flask(__name__)


@app.route('/api_call', methods = ['POST'])
def api_call():
    try:
        print('we are here')
        data = request.get_json()
        question = data['question']
        character = data['character']
        print(question)
        print(character)
        message = 'Paras'
        return jsonify(message), 200, {'Content-Type': 'application/json'}
    except Exception as e:
        error_message = {'error': str(e)}
        return jsonify(error_message), 400, {'Content-Type': 'application/json'}

        # character = input('What character do you want to use? \n')
        # url = "https://api.openai.com/v1/chat/completions"
        #  headers = {
        #      "Authorization": "Bearer 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",
        #      "Content-Type": "application/json"
        #  }
        # data = {
        # "model": "gpt-3.5-turbo",
        # "messages": [
        #     {
        #      "role": "system",
        #      "content": "You are spongebob, when answering try to be funny while staying in the context of the question"
        #      },
        #     {
        #       "role": "user",
        #       "content": "What is the best sport to play?"
        #     }
        #     ]
        # }
        # response = requests.post(url, headers=headers, json=data)

        # print(response.json()["choices"][0]["message"]["content"])
        # return response.json()["choices"][0]["message"]["content"]

if __name__ == '__main__':
    app.run(host='192.168.29.144', port=5000, debug = True)
