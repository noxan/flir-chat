import { ChatResponseResult, FlowerIntelligence, Message, StreamEvent } from '@flwr/flwr';
import { useState } from 'react';
import "./index.css";

// Available models for the chooser (Web platform supported models only)
const AVAILABLE_MODELS = [
  { value: 'meta/llama3.2-1b/instruct-q4', label: 'Llama 3.2 1B (Q4) - Fast' },
  { value: 'meta/llama3.2-1b/instruct-fp16', label: 'Llama 3.2 1B (FP16) - Fast' },
  { value: 'meta/llama3.2-3b/instruct-q4', label: 'Llama 3.2 3B (Q4) - Balanced' },
  { value: 'meta/llama3.1-8b/instruct-q4', label: 'Llama 3.1 8B (Q4) - Quality' },
  { value: 'huggingface/smollm2-135m/instruct-fp16', label: 'SmolLM2 135M (FP16) - Ultra Fast' },
  { value: 'huggingface/smollm2-360m/instruct-q4', label: 'SmolLM2 360M (Q4) - Very Fast' },
  { value: 'huggingface/smollm2-360m/instruct-fp16', label: 'SmolLM2 360M (FP16) - Very Fast' },
  { value: 'huggingface/smollm2-1.7b/instruct-q4', label: 'SmolLM2 1.7B (Q4) - Fast' },
  { value: 'deepseek/r1-distill-llama-8b/q4', label: 'DeepSeek R1 Distill 8B (Q4) - Quality' },
];

export function App() {
  const fi: FlowerIntelligence = FlowerIntelligence.instance;

  const [input, setInput] = useState("");
  const [history, setHistory] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedModel, setSelectedModel] = useState(AVAILABLE_MODELS[0].value);

  const handleMessage = async () => {
    setIsLoading(true);

    setHistory(history => [...history, { role: 'user', content: input }]);
    const response: ChatResponseResult = await fi.chat({
      messages: [...history, { role: 'user', content: input }],
      model: selectedModel,
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

      <div className="model-chooser">
        <label htmlFor="model-select">Model:</label>
        <select
          id="model-select"
          value={selectedModel}
          onChange={(e) => setSelectedModel(e.target.value)}
          disabled={isLoading}
        >
          {AVAILABLE_MODELS.map((model) => (
            <option key={model.value} value={model.value}>
              {model.label}
            </option>
          ))}
        </select>
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
