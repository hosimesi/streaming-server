import React, { useEffect, useState } from 'react';

import {ResponseStreamingServiceClient} from "../proto-web/streaming_server_grpc_web_pb";
import { UserRequest, LlmResponse } from "../proto-web/streaming_server_pb";
import {ClientReadableStream} from "grpc-web";

const StreamingForm: React.FC = () => {
  const [prompt, setPrompt] = useState("");
  const [beforePrompt, setBeforePrompt] = useState("");
  const [answer, setAnswer] = useState("");
  const apiUrl = process.env.REACT_APP_REST_API_URL ?? '';
  const grpcUrl = process.env.REACT_APP_GRPC_API_URL ?? '';
  const [ws, setWs] = useState<WebSocket | null>(null);

  useEffect(() => {
    const socket = new WebSocket(apiUrl.replace('http', 'ws') + '/ws');
    setWs(socket);

    socket.onmessage = (event) => {
      const response = event.data;
      if (response.indexOf('None') === -1) {
        const data = response.split(': ')
        setAnswer(answer => answer + data[1]);
      }
    };

    // return () => {
    //   socket.close();
    // };
  }, [apiUrl]);


  // clickイベントの定義
  const handleStreamClick = async (prompt: string) => {
    let chatRequest = {
      prompt: prompt,
      max_tokens: 50,
      seed: 42,
      temperature: 1.0,
      stream: true
    };
    const response = await fetch(apiUrl + '/streaming/fastapi/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(chatRequest)
    });

    setBeforePrompt(prompt);
    setPrompt("");
    if (!response.ok) {
      console.error(`Error: ${response.status}`);
      return;
    }
    if (response.body) {
      const reader = response.body.getReader();
      const decoder = new TextDecoder('utf-8');
      reader.read().then(function processText({ done, value }): Promise<void> {
        if (done) {
          return Promise.resolve();
        }
        const result = decoder.decode(value);
        if (result.indexOf('None') === -1) {
          const data = result.split(': ')
          setAnswer(answer => answer + data[1]);
        }
          return reader.read().then(processText);
      });
      setAnswer("");
    }
  };


    const handleStarletteClick = async (prompt: string) => {
      let chatRequest = {
        prompt: prompt,
        max_tokens: 50,
        seed: 42,
        temperature: 1.0,
        stream: true
      };
      const response = await fetch(apiUrl + '/streaming/starlette/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(chatRequest)
      });

      setBeforePrompt(prompt);
      setPrompt("");
      if (!response.ok) {
        console.error(`Error: ${response.status}`);
        return;
      }
      if (response.body) {
        const reader = response.body.getReader();
        const decoder = new TextDecoder('utf-8');
        reader.read().then(function processText({ done, value }): Promise<void> {
          if (done) {
            return Promise.resolve();
          }
          const result = decoder.decode(value);
          const data = result.split("\n")
          const filteredData = data.map(item => item.split(":")[1])
                                .filter(item => item && item.trim() !== '');

          if (result.indexOf('None') === -1) {
              setAnswer(answer => answer + filteredData.join(""));
          }
            return reader.read().then(processText);
        });
        setAnswer("");
      }
  };


  const handleWebSocketsClick = async (prompt: string) => {
    if (ws) {
      ws.send(prompt);
      setBeforePrompt(prompt);
      setPrompt("");
      setAnswer("");
    }
  };

  const handleGrpcClick = async (prompt: string) => {
    const client = new ResponseStreamingServiceClient(grpcUrl, null, null);
    const request = new UserRequest();
    request.setPrompt(prompt);
    const stream: ClientReadableStream<LlmResponse> = client.stream(request, {});
    stream.on('data', (response: LlmResponse) => {
      const res = response.getLlmContent().split(' ');
      if (res[1].indexOf('None') === -1) {
        setAnswer(answer => answer + res[1]);
      }
    });
    setBeforePrompt(prompt);
    setPrompt(prompt);
    setAnswer("");
  };

  return (
    <div>
      <div>
        <textarea
          value={prompt}
          onChange={e => setPrompt(e.target.value)}
        />
      </div>
      <div style={{ marginLeft: '20px' }}>
        <br />
        <button style={{ marginRight: '10px' }} onClick={() => { handleStreamClick(prompt); }}>Send to FastAPI Stream</button>
        <button style={{ marginRight: '10px' }} onClick={() => { handleStarletteClick(prompt); }}>Send to Starlette Stream</button>
        <button style={{ marginRight: '10px' }} onClick={() => { handleWebSocketsClick(prompt); }}>Send to WebSockets Stream</button>
        <button onClick={() => { handleGrpcClick(prompt); }}>Send to Grpc Stream</button>
        <br />
      </div>
      <div style={{ width: '100%', overflow: 'auto' }}>
        <br />
        <p>User: {beforePrompt}</p>
        <p>Response: {answer}</p>
      </div>
    </div>
  );
};

export default StreamingForm;
