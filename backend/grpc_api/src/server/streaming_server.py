import asyncio
import logging

import grpc
from proto import streaming_server_pb2, streaming_server_pb2_grpc
from services.open_ai import OpenAIService

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

def run(bind_address: str) -> None:
    asyncio.run(_run(bind_address))


async def _run(bind_address: str) -> None:
    logger.info(f"Starting server on {bind_address}")

    server = grpc.aio.server()
    streaming_server_pb2_grpc.add_ResponseStreamingServiceServicer_to_server(ServerStreamService(), server)
    server.add_insecure_port(bind_address)

    logger.info("Starting server")
    await server.start()
    await server.wait_for_termination()


class ServerStreamService(streaming_server_pb2_grpc.ResponseStreamingServiceServicer):
    def __init__(self):
        self.service = OpenAIService()

    async def stream(self, request, context) -> streaming_server_pb2.LlmResponse:
        response = self.service.get_chat_response(request.prompt)
        async for chat in response:
            yield streaming_server_pb2.LlmResponse(llm_content=f"Response {chat}")
            await asyncio.sleep(0.1)
