from fastapi import FastAPI
from fastapi.responses import HTMLResponse
from routers import chat

app = FastAPI()
app.include_router(chat.router)

html = """
<!DOCTYPE html>
<html>
    <head>
        <title>Chat</title>
    </head>
    <body>
        <h1>WebSocket Chat</h1>
        <form action="" onsubmit="sendMessage(event)">
            <input type="text" id="messageText" autocomplete="off"/>
            <button>Send to Web Socket</button>
        </form>
        <button onclick="sendREST('streaming/fastapi')">Send to REST SSE (FastAPI)</button>
        <button onclick="sendREST('streaming/starlette')">Send to REST SSE (Starlette)</button>
        <ul id='messages'>
        </ul>
        <script>
            var ws = new WebSocket("ws://localhost:5000/ws");
            ws.onmessage = function(event) {
                var messages = document.getElementById('messages')
                var message = document.createElement('li')
                var content = document.createTextNode(event.data)
                message.appendChild(content)
                messages.appendChild(message)
            };
            function sendMessage(event) {
                var input = document.getElementById("messageText")
                ws.send(input.value)
                input.value = ''
                event.preventDefault()
            }
            function sendREST(endpoint) {
                var input = document.getElementById("messageText")
                var xhr = new XMLHttpRequest();
                xhr.open("POST", "http://localhost:5000/" + endpoint, true);
                xhr.setRequestHeader("Content-Type", "application/json");
                xhr.send(JSON.stringify({prompt: input.value, stream: true}));
                input.value = ''
            }
        </script>
    </body>
</html>
"""

@app.get("/")
def health_check():
    return HTMLResponse(html)
