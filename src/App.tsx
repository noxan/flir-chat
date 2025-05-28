import { ChatResponseResult, FlowerIntelligence, Message, StreamEvent } from '@flwr/flwr';
import { useState } from 'react';
import "./index.css";


export function App() {
  const fi: FlowerIntelligence = FlowerIntelligence.instance;

  const [input, setInput] = useState("");
  const [history, setHistory] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleMessage = async () => {
    setIsLoading(true);

    setHistory(history => [...history, { role: 'user', content: input }]);
    const response: ChatResponseResult = await fi.chat({
      messages: [...history, { role: 'user', content: input }],
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
    setIsLoading(false);
  }

  return (
    <div className="app">
      <h1>Chat</h1>

      <div className="messages">
        {history.map((message, index) => (
          <div key={index}>{message.role}: {message.content}</div>
        ))}
      </div>

      <div className="input-container">
        <input type="text" value={input} onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleMessage()
            }
          }}
          onChange={(e) => setInput(e.target.value)}
          disabled={isLoading}
        />
        <button onClick={handleMessage} disabled={isLoading}>{isLoading ? 'Loading...' : 'Send'}</button>
      </div>
    </div>
  );
}
