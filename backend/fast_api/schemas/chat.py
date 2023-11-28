from pydantic import BaseModel

class ChatRequest(BaseModel):
    prompt: str = "Hello"
    max_tokens: int = 100
    seed: int = 42
    temperature: int = 1
    stream: bool = True
