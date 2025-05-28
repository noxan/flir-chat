import { ChatResponseResult, FlowerIntelligence, Message, StreamEvent } from '@flwr/flwr';
import { useState } from 'react';
import "./index.css";


export function App() {
  const fi: FlowerIntelligence = FlowerIntelligence.instance;

  const [input, setInput] = useState("");
  const [history, setHistory] = useState<Message[]>([]);

  const handleMessage = async () => {
    setHistory(history => [...history, { role: 'user', content: input }]);

    const response: ChatResponseResult = await fi.chat(input, {
      model: 'meta/llama3.2-1b/instruct-fp16',
      stream: true,
      onStreamEvent: (event: StreamEvent) => console.log(event.chunk)
    });

    if (response.ok) {
      setHistory(history => [...history, response.message ]);
      setInput("");
    } else {
      console.error(`${response.failure.code}: ${response.failure.description}`);
    }
  }

  return (
    <div className="app">
      <h1>Chat</h1>

      <input type="text" value={input} onChange={(e) => setInput(e.target.value)} />
      <button onClick={handleMessage}>Send</button>

      <div className="messages">
        {history.map((message, index) => (
          <div key={index}>{message.content}</div>
        ))}
      </div>
    </div>
  );
}
