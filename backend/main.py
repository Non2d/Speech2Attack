from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv
load_dotenv()

from openai import AsyncOpenAI
client = AsyncOpenAI()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class TextRequest(BaseModel):
    text: str

@app.get("/")
async def root():
    return {"message": "FastAPI is running :)"}

@app.post("/gpt")
async def generate_text(request: TextRequest):
    response = await client.chat.completions.create(
        model="gpt-4o",
        messages=[
            {"role": "user", "content": f"Please return the list of scores of the fire power, ice power, and thunder power of the ultimate ability named {request.text} between 0 and 20 in battle game. The average score is 7. 15 or higher scores are very rare. The format is [fire power, ice power, thunder power]. Do not return anything other than the score list."}
        ],
    )
    return {
        "response": response.choices[0].message.content
    }


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)
