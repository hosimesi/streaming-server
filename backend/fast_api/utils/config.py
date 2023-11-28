import os

from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    OPENAI_API_VERSION: str
    OPENAI_API_BASE: str
    OPENAI_API_KEY: str
    OPENAI_CHAT_ENGINE: str

    class Config:
        env_file = ".env"
        # env_file = "../.env"
        # @property
        # def _env_file(self):
        #     if os.path.exists(".env"):
        #         return ".env"
        #     else:
        #         self.OPENAI_API_VERSION = os.environ.get("OPENAI_API_VERSION")
        #         self.OPENAI_API_BASE = os.environ.get("OPENAI_API_BASE")
        #         self.OPENAI_API_KEY = os.environ.get("OPENAI_API_KEY")
        #         self.OPENAI_CHAT_ENGINE = os.environ.get("OPENAI_CHAT_ENGINE")
