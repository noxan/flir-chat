import { ChatResponseResult, FlowerIntelligence } from '@flwr/flwr';
import "./index.css";

import logo from "./logo.svg";
import reactLogo from "./react.svg";
import { useState } from 'react';


export async function App() {
  const fi: FlowerIntelligence = FlowerIntelligence.instance;

  const [input, setInput] = useState("");
  const [history, setHistory] = useState<ChatResponseResult[]>([]);

  const handleMessage = async () => {
    const response: ChatResponseResult = await fi.chat(input);
    if (response.ok) {
      setHistory([...history, response]);
      setInput("");
    }
  }

  return (
    <div className="app">
      <div className="logo-container">
        <img src={logo} alt="Bun Logo" className="logo bun-logo" />
        <img src={reactLogo} alt="React Logo" className="logo react-logo" />
      </div>

      <h1>Chat</h1>

      <input type="text" value={input} onChange={(e) => setInput(e.target.value)} />
      <button onClick={handleMessage}>Send</button>

      <div className="messages">
        {history.map((item) => (
          <div key={item.message.id}>{item.message.content}</div>
        ))}
      </div>
    </div>
  );
}

export default App;
