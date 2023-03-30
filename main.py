
import requests
from flask import Flask

app = Flask(__name__)


@app.route('/api_call')
def api_call():
    character = input('What character do you want to use? \n')
    url = "https://api.openai.com/v1/chat/completions"
    headers = {
        "Authorization": "Bearer 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 ",
        "Content-Type": "application/json"
    }
    data = {
    "model": "gpt-3.5-turbo",
    "messages": [
        {
         "role": "system",
         "content": "You are" + str(character) +" , when answering try to be funny while staying in the context of the question"
         },
        {
          "role": "user",
          "content": "What is the best sport to play?"
        }
        ]
    }
    response = requests.post(url, headers=headers, json=data)
    print(response.json()["choices"][0]["message"]["content"])
    return response.json()["choices"][0]["message"]["content"]

if __name__ == '__main__':
    app.run(debug=True)