import asyncio
from functools import lru_cache

from openai import AzureOpenAI
from schemas.chat import ChatRequest
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

    async def get_chat_streaming_response(self, chat_request: ChatRequest):
        if not chat_request.stream:
            raise Exception("Use get_chat_response for non-streaming responses")
        for response in self.client.chat.completions.create(
            model=self.settings.OPENAI_CHAT_ENGINE,
            messages=[{"role": "user", "content": chat_request.prompt}],
            temperature=chat_request.temperature,
            seed=chat_request.seed,
            max_tokens=chat_request.max_tokens,
            stream=chat_request.stream,
        ):
            if response.choices:
                yield f"data: {response.choices[0].delta.content}\n\n"
                await asyncio.sleep(0.1)

    async def get_chat_event_source_response(self, chat_request: ChatRequest):
        if not chat_request.stream:
            raise Exception("Use get_chat_response for non-streaming responses")
        for response in self.client.chat.completions.create(
            model=self.settings.OPENAI_CHAT_ENGINE,
            messages=[{"role": "user", "content": chat_request.prompt}],
            temperature=chat_request.temperature,
            seed=chat_request.seed,
            max_tokens=chat_request.max_tokens,
            stream=chat_request.stream,
        ):
            if response.choices:
                yield f"{response.choices[0].delta.content}\n\n"
                await asyncio.sleep(0.1)
