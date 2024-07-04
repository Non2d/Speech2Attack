# app.py
from fastapi import FastAPI, Request
from pydantic import BaseModel
import torch
from transformers import GPT2LMHeadModel, GPT2Tokenizer

app = FastAPI()

class TextRequest(BaseModel):
    text: str

# モデルとトークナイザーの読み込み
model_name = "gpt2"
tokenizer = GPT2Tokenizer.from_pretrained(model_name)
model = GPT2LMHeadModel.from_pretrained(model_name)

@app.post("/generate")
async def generate_text(request: TextRequest):
    inputs = tokenizer.encode(request.text, return_tensors="pt")
    outputs = model.generate(inputs, max_length=50)
    response_text = tokenizer.decode(outputs[0], skip_special_tokens=True)
    return {"response": response_text}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)
