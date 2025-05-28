import { ChatResponseResult, FlowerIntelligence, Message, StreamEvent } from '@flwr/flwr';
import { useState, useEffect } from 'react';
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

const STORAGE_KEY = 'flower-chat-history';

// Helper functions for localStorage
const loadHistoryFromStorage = (): Message[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.warn('Failed to load chat history from localStorage:', error);
    return [];
  }
};

const saveHistoryToStorage = (history: Message[]) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
  } catch (error) {
    console.warn('Failed to save chat history to localStorage:', error);
  }
};

export function App() {
  const fi: FlowerIntelligence = FlowerIntelligence.instance;

  const [input, setInput] = useState("");
  const [history, setHistory] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedModel, setSelectedModel] = useState(AVAILABLE_MODELS[0].value);

  // Load history from localStorage on component mount
  useEffect(() => {
    const savedHistory = loadHistoryFromStorage();
    setHistory(savedHistory);
  }, []);

  // Save history to localStorage whenever it changes
  useEffect(() => {
    saveHistoryToStorage(history);
  }, [history]);

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

  const clearHistory = () => {
    setHistory([]);
  };

  return (
    <div className="app">
      <h1>Chat</h1>

      <div className="messages">
        {history.length === 0 ? (
          <div className="empty-state">No messages yet. Start a conversation!</div>
        ) : (
          history.map((message, index) => (
            <div key={index} className={`message ${message.role}`}>
              <strong>{message.role}:</strong> {message.content}
            </div>
          ))
        )}
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
        {history.length > 0 && (
          <button
            onClick={clearHistory}
            className="clear-button"
            disabled={isLoading}
          >
            Clear History
          </button>
        )}
      </div>

      <div className="input-container">
        <input
          type="text"
          value={input}
          placeholder="Type your message..."
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleMessage()
            }
          }}
          onChange={(e) => setInput(e.target.value)}
          disabled={isLoading}
        />
        <button onClick={handleMessage} disabled={isLoading || !input.trim()}>
          {isLoading ? 'Loading...' : 'Send'}
        </button>
      </div>
    </div>
  );
}
