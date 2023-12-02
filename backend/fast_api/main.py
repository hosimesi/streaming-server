from fastapi import FastAPI
from routers import chat

app = FastAPI()
app.include_router(chat.router)


@app.get("/")
def health_check():
    return {"message": "check ok"}
