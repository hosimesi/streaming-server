import asyncio
from functools import lru_cache

from openai import AzureOpenAI
from utils.config import Settings


@lru_cache()
def get_settings():
    return Settings()


class OpenAIService:
    def __init__(self):
        self.settings = get_settings()
        self.client = AzureOpenAI(
            api_version=self.settings.OPENAI_API_VERSION,
            azure_endpoint=self.settings.OPENAI_API_BASE,
            api_key=self.settings.OPENAI_API_KEY,
        )

    async def get_chat_response(self, prompt: str):
        for response in self.client.chat.completions.create(
            model=self.settings.OPENAI_CHAT_ENGINE,
            messages=[{"role": "user", "content": prompt}],
            temperature=1,
            seed=42,
            max_tokens=100,
            stream=True,
        ):
            if response.choices:
                yield f"{response.choices[0].delta.content}\n\n"
                await asyncio.sleep(0.1)
