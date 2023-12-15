from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    OPENAI_API_VERSION: str
    OPENAI_API_BASE: str
    OPENAI_API_KEY: str
    OPENAI_CHAT_ENGINE: str

    class Config:
        env_file = ".env"
