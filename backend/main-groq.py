from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from collections import Counter
from pydantic import BaseModel
import re
import os
from dotenv import load_dotenv
load_dotenv()

from groq import Groq

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


client = Groq(
    api_key=os.environ.get("GROQ_API_KEY"),
)

class TextRequest(BaseModel):
    text: str

@app.get("/")
async def root():
    return {"message": "FastAPI is running :)"}

@app.post("/gpt")
async def generate_text(request: TextRequest):
    response = client.chat.completions.create(
        messages=[
            {
            "role": "user",
                "content": f"Please score the strength of the ultimate ability named {request.text} between 0 and 100 in battle game. Scores should be low when it is too dirty. The average score is 30. Do not return anything other than the score.",
                # "content":f"Explain about the ultimate ability named {request.text} in the shooting game. Note that they do not exist in real."
            }
        ],
        model="llama3-70b-8192",
    )
    response2 = client.chat.completions.create(
        messages=[
            {
            "role": "user",
                "content": f"Please score the fire power of the ultimate ability named {request.text} between 0 and 100 in battle game. Scores should be low when it is too dirty. The average score is 30. Do not return anything other than the score.",
                # "content":f"Explain about the ultimate ability named {request.text} in the shooting game. Note that they do not exist in real."
            }
        ],
        model="llama3-70b-8192",
    )
    response3 = client.chat.completions.create(
        messages=[
            {
            "role": "user",
                "content": f"Please score the ice power of the ultimate ability named {request.text} between 0 and 100 in battle game. Scores should be low when it is too dirty. The average score is 30. Do not return anything other than the score.",
                # "content":f"Explain about the ultimate ability named {request.text} in the shooting game. Note that they do not exist in real."
            }
        ],
        model="llama3-70b-8192",
    )
    response4 = client.chat.completions.create(
        messages=[
            {
            "role": "user",
                "content": f"Please score the thunder power of the ultimate ability named {request.text} between 0 and 100 in battle game. Scores should be low when it is too dirty. The average score is 30. Do not return anything other than the score.",
                # "content":f"Explain about the ultimate ability named {request.text} in the shooting game. Note that they do not exist in real."
            }
        ],
        model="llama3-70b-8192",
    )
    # response_text = chat_completion.choices[0].message.content
    # word_counts = Counter(re.findall(r'\b\w+\b', response_text))
    # filtered_word_counts = {word: count for word, count in word_counts.items() if count > 3}
    # return {"response": response_text, "word_counts": dict(word_counts)}
    return {
        "strength": response.choices[0].message.content,
        "fire": response2.choices[0].message.content,
        "ice": response3.choices[0].message.content,
        "thunder": response4.choices[0].message.content
    }


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)
