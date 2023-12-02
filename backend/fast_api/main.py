from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import chat

app = FastAPI()
app.include_router(chat.router)

# FIXME: This is a security risk. Do not use this in production.
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def health_check():
    return {"message": "check ok"}
