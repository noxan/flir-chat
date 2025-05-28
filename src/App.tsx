import { ChatResponseResult, FlowerIntelligence, Message, StreamEvent } from '@flwr/flwr';
import { useEffect, useRef, useState } from 'react';
import "./index.css";
import { AVAILABLE_MODELS } from './models';

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
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [input, setInput] = useState("");
  const [history, setHistory] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedModel, setSelectedModel] = useState(AVAILABLE_MODELS[0].value);

  // Auto-scroll to bottom when messages change
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [history]);

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
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-4xl mx-auto bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-sand-200 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-sand-400 to-warm-400 p-6 text-center">
          <h1 className="text-4xl font-bold text-sand-900 mb-2">Chat</h1>
          <p className="text-sand-800 opacity-90">Powered by Flower Intelligence</p>
        </div>

        {/* Messages Container */}
        <div className="h-96 overflow-y-auto p-6 bg-gradient-to-b from-sand-50/50 to-warm-50/50">
          {history.length === 0 ? (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <div className="text-6xl mb-4">💬</div>
                <p className="text-sand-600 text-lg font-medium">No messages yet</p>
                <p className="text-sand-500">Start a conversation!</p>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {history.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl shadow-md border-l-4 ${
                      message.role === 'user'
                        ? 'message-user border-l-sand-500'
                        : 'message-assistant border-l-warm-500'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-semibold uppercase tracking-wide opacity-75">
                        {message.role === 'user' ? '👤 You' : '🤖 Assistant'}
                      </span>
                    </div>
                    <p className="text-sm leading-relaxed">{message.content}</p>
                  </div>
                </div>
              ))}
              {/* Auto-scroll target */}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        {/* Controls */}
        <div className="p-6 bg-white/90 border-t border-sand-200">
          {/* Model Chooser */}
          <div className="flex flex-wrap items-center justify-center gap-4 mb-6">
            <label htmlFor="model-select" className="text-sand-800 font-semibold">
              Model:
            </label>
            <select
              id="model-select"
              value={selectedModel}
              onChange={(e) => setSelectedModel(e.target.value)}
              disabled={isLoading}
              className="bg-white border-2 border-sand-300 text-sand-900 rounded-xl px-4 py-2 font-medium min-w-64 focus:outline-none focus:border-sand-500 focus:ring-2 focus:ring-sand-200 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
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
                disabled={isLoading}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-md"
              >
                Clear History
              </button>
            )}
          </div>

          {/* Input Container */}
          <div className="flex gap-3 bg-sand-100 rounded-2xl p-3 border-2 border-sand-200 focus-within:border-sand-400 transition-colors duration-200">
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
              className="flex-1 bg-transparent border-none outline-none text-sand-900 placeholder-sand-500 text-lg px-2 disabled:opacity-50"
            />
            <button
              onClick={handleMessage}
              disabled={isLoading || !input.trim()}
              className="bg-gradient-to-r from-sand-500 to-warm-500 hover:from-sand-600 hover:to-warm-600 text-white px-6 py-3 rounded-xl font-bold transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Sending...</span>
                </div>
              ) : (
                <span>Send 🚀</span>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
