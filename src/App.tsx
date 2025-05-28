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
    <div className="h-screen flex flex-col bg-sand-50">
      {/* Header */}
      <div className="border-b border-sand-200 bg-white/80 backdrop-blur-sm">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <h1 className="text-xl font-semibold text-sand-900">Chat</h1>
            <span className="text-sm text-sand-600">Powered by Flower Intelligence</span>
          </div>

          <div className="flex items-center gap-4">
            {/* Model Selector */}
            <select
              value={selectedModel}
              onChange={(e) => setSelectedModel(e.target.value)}
              disabled={isLoading}
              className="bg-white border border-sand-300 text-sand-900 rounded-md px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-sand-500 focus:border-transparent disabled:opacity-50"
            >
              {AVAILABLE_MODELS.map((model) => (
                <option key={model.value} value={model.value}>
                  {model.label}
                </option>
              ))}
            </select>

            {/* Clear History Button */}
            {history.length > 0 && (
              <button
                onClick={clearHistory}
                disabled={isLoading}
                className="text-sm text-sand-600 hover:text-sand-900 px-3 py-1.5 rounded-md hover:bg-sand-100 transition-colors disabled:opacity-50"
              >
                Clear
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto">
        {history.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-sand-100 flex items-center justify-center mb-4 mx-auto">
                <span className="text-2xl">💬</span>
              </div>
              <p className="text-sand-600 font-medium mb-1">No messages yet</p>
              <p className="text-sand-500 text-sm">Start a conversation below</p>
            </div>
          </div>
        ) : (
          <div className="max-w-4xl mx-auto px-6 py-6">
            <div className="space-y-6">
              {history.map((message, index) => (
                <div key={index} className="flex gap-4">
                  {/* Avatar */}
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    message.role === 'user'
                      ? 'bg-sand-200 text-sand-700'
                      : 'bg-blue-100 text-blue-700'
                  }`}>
                    {message.role === 'user' ? 'U' : 'AI'}
                  </div>

                  {/* Message Content */}
                  <div className="flex-1 min-w-0">
                    <div className={`rounded-lg px-4 py-3 ${
                      message.role === 'user'
                        ? 'bg-sand-100 text-sand-900'
                        : 'bg-blue-50 text-blue-900 border border-blue-100'
                    }`}>
                      <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
                    </div>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          </div>
        )}
      </div>

      {/* Input Container */}
      <div className="border-t border-sand-200 bg-white/80 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex gap-3">
            <input
              type="text"
              value={input}
              placeholder="Type your message..."
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleMessage();
                }
              }}
              onChange={(e) => setInput(e.target.value)}
              disabled={isLoading}
              className="flex-1 bg-white border border-sand-300 rounded-md px-4 py-2 text-sand-900 placeholder-sand-500 focus:outline-none focus:ring-2 focus:ring-sand-500 focus:border-transparent disabled:opacity-50"
            />
            <button
              onClick={handleMessage}
              disabled={isLoading || !input.trim()}
              className="bg-sand-900 hover:bg-sand-800 text-white px-4 py-2 rounded-md font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Sending</span>
                </div>
              ) : (
                'Send'
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
