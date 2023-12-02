from fastapi import APIRouter, WebSocket
from fastapi.responses import StreamingResponse
from schemas.chat import ChatRequest
from services.open_ai import OpenAIService
from sse_starlette.sse import EventSourceResponse

router = APIRouter(
    tags=["openai"],
    dependencies=[],
    responses={404: {"description": "Not found"}},
)


@router.post("/streaming/fastapi")
async def fastapi(chat_request: ChatRequest):
    service = OpenAIService()
    return StreamingResponse(service.get_chat_streaming_response(chat_request))


@router.post("/streaming/starlette")
async def stream(chat_request: ChatRequest):
    service = OpenAIService()
    return EventSourceResponse(service.get_chat_event_source_response(chat_request))


@router.websocket("/ws")
async def websockets(websocket: WebSocket):
    service = OpenAIService()
    await websocket.accept()
    while True:
        data = await websocket.receive_text()
        async for response in service.get_chat_streaming_response(ChatRequest(prompt=data)):
            await websocket.send_text(response)
