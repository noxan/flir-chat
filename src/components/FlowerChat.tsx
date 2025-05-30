import {
  type ChatResponseResult,
  FlowerIntelligence,
  type Message,
  type StreamEvent,
} from '@flwr/flwr'
import { useEffect, useRef, useState } from 'react'
import { MarkdownMessage } from '../MarkdownMessage'
import { AVAILABLE_MODELS } from '../models'
import { TopBar } from './TopBar'

const STORAGE_KEY = 'flower-chat-history'

// Helper functions for localStorage
const loadHistoryFromStorage = (): Message[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored ? JSON.parse(stored) : []
  } catch (error) {
    console.warn('Failed to load chat history from localStorage:', error)
    return []
  }
}

const saveHistoryToStorage = (history: Message[]) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(history))
  } catch (error) {
    console.warn('Failed to save chat history to localStorage:', error)
  }
}

export function FlowerChat() {
  const fi: FlowerIntelligence = FlowerIntelligence.instance
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const [input, setInput] = useState('')
  const [history, setHistory] = useState<Message[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [selectedModel, setSelectedModel] = useState(AVAILABLE_MODELS[0].value)
  const [streamingMessage, setStreamingMessage] = useState<string>('')
  const [isStreaming, setIsStreaming] = useState(false)
  const [isModelLoading, setIsModelLoading] = useState(false)
  const [currentLoadedModel, setCurrentLoadedModel] = useState<string | null>(
    null,
  )

  // Auto-scroll to bottom when messages change
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [history, streamingMessage])

  // Load history from localStorage on component mount
  useEffect(() => {
    const savedHistory = loadHistoryFromStorage()
    setHistory(savedHistory)
  }, [])

  // Save history to localStorage whenever it changes
  useEffect(() => {
    saveHistoryToStorage(history)
  }, [history])

  // Handle model loading when selectedModel changes
  useEffect(() => {
    if (currentLoadedModel !== selectedModel) {
      setIsModelLoading(true)
      // Simulate model loading time - in real implementation, this would be handled by Flower Intelligence
      const loadingTimeout = setTimeout(() => {
        setCurrentLoadedModel(selectedModel)
        setIsModelLoading(false)
      }, 2000) // 2 second loading simulation

      return () => clearTimeout(loadingTimeout)
    }
  }, [selectedModel, currentLoadedModel])

  const handleMessage = async () => {
    if (!input.trim()) return

    // If model is loading, we can still queue the message but show appropriate feedback
    if (isModelLoading) {
      // Could potentially queue the message or show a different message
      return
    }

    setIsLoading(true)
    setIsStreaming(true)
    setStreamingMessage('')

    // Add user message to history
    const userMessage: Message = { role: 'user', content: input }
    setHistory((history) => [...history, userMessage])

    // Clear input immediately
    const currentInput = input
    setInput('')

    try {
      const response: ChatResponseResult = await fi.chat({
        messages: [...history, userMessage],
        model: selectedModel,
        stream: true,
        onStreamEvent: (event: StreamEvent) => {
          // Append each chunk to the streaming message
          setStreamingMessage((prev) => prev + event.chunk)
        },
      })

      if (response.ok) {
        // Add the complete AI message to history
        setHistory((history) => [...history, response.message])
        setStreamingMessage('')
        setIsStreaming(false)
      } else {
        console.error(
          `${response.failure.code}: ${response.failure.description}`,
        )
        // On error, restore the input and remove the user message
        setInput(currentInput)
        setHistory((history) => history.slice(0, -1))
        setStreamingMessage('')
        setIsStreaming(false)
      }
    } catch (error) {
      console.error('Error sending message:', error)
      // On error, restore the input and remove the user message
      setInput(currentInput)
      setHistory((history) => history.slice(0, -1))
      setStreamingMessage('')
      setIsStreaming(false)
    }

    setIsLoading(false)
  }

  const clearHistory = () => {
    setHistory([])
  }

  return (
    <>
      {/* Header */}
      <TopBar
        isLoading={isLoading}
        isModelLoading={isModelLoading}
        selectedModel={selectedModel}
        onModelChange={setSelectedModel}
        onClearHistory={clearHistory}
        hasHistory={history.length > 0}
      />

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto pt-20 pb-24 relative">
        {/* Model Loading Overlay - Only over messages */}
        {isModelLoading && (
          <div className="absolute inset-0 bg-white/80 backdrop-blur-sm z-10 flex items-center justify-center">
            <div className="bg-white border border-sand-200 rounded-lg shadow-lg p-6 max-w-sm mx-4">
              <div className="text-center">
                {/* Animated flower icon */}
                <div className="relative mb-4">
                  <div className="w-12 h-12 mx-auto relative">
                    {/* Flower petals */}
                    <div
                      className="absolute inset-0 animate-spin"
                      style={{ animationDuration: '2s' }}
                    >
                      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-gradient-to-br from-pink-300 to-pink-500 rounded-full opacity-80" />
                      <div className="absolute top-1 right-1 w-2.5 h-2.5 bg-gradient-to-br from-purple-300 to-purple-500 rounded-full opacity-70" />
                      <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-3 h-3 bg-gradient-to-br from-blue-300 to-blue-500 rounded-full opacity-80" />
                      <div className="absolute bottom-1 right-1 w-2.5 h-2.5 bg-gradient-to-br from-green-300 to-green-500 rounded-full opacity-70" />
                      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-gradient-to-br from-yellow-300 to-yellow-500 rounded-full opacity-80" />
                      <div className="absolute bottom-1 left-1 w-2.5 h-2.5 bg-gradient-to-br from-red-300 to-red-500 rounded-full opacity-70" />
                      <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-3 h-3 bg-gradient-to-br from-indigo-300 to-indigo-500 rounded-full opacity-80" />
                      <div className="absolute top-1 left-1 w-2.5 h-2.5 bg-gradient-to-br from-orange-300 to-orange-500 rounded-full opacity-70" />
                    </div>
                    {/* Center */}
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-gradient-to-br from-sand-300 to-sand-500 rounded-full" />
                  </div>
                </div>

                <h3 className="text-lg font-semibold text-sand-900 mb-2">
                  Loading Model
                </h3>
                <p className="text-sand-600 text-sm mb-4">
                  Flower Intelligence is loading{' '}
                  <span className="font-medium">
                    {
                      AVAILABLE_MODELS.find((m) => m.value === selectedModel)
                        ?.label
                    }
                  </span>
                </p>

                {/* Progress dots */}
                <div className="flex justify-center space-x-1">
                  <div
                    className="w-2 h-2 bg-sand-400 rounded-full animate-bounce"
                    style={{ animationDelay: '0ms' }}
                  />
                  <div
                    className="w-2 h-2 bg-sand-400 rounded-full animate-bounce"
                    style={{ animationDelay: '150ms' }}
                  />
                  <div
                    className="w-2 h-2 bg-sand-400 rounded-full animate-bounce"
                    style={{ animationDelay: '300ms' }}
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {history.length === 0 && !isStreaming ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-sand-100 flex items-center justify-center mb-4 mx-auto">
                <span className="text-2xl">💬</span>
              </div>
              <p className="text-sand-600 font-medium mb-1">No messages yet</p>
              <p className="text-sand-500 text-sm">
                {isModelLoading
                  ? 'Loading model...'
                  : 'Start a conversation below'}
              </p>
            </div>
          </div>
        ) : (
          <div className="max-w-4xl mx-auto px-6 py-6">
            <div className="space-y-6">
              {history.map((message, index) => (
                <div key={index} className="flex gap-4">
                  {/* Avatar */}
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                      message.role === 'user'
                        ? 'bg-sand-300 text-sand-800'
                        : 'bg-blue-200 text-blue-800'
                    }`}
                  >
                    {message.role === 'user' ? 'U' : 'AI'}
                  </div>

                  {/* Message Content */}
                  <div className="flex-1 min-w-0">
                    <div
                      className={`rounded-lg px-4 py-3 ${
                        message.role === 'user'
                          ? 'message-user'
                          : 'message-assistant'
                      }`}
                    >
                      <MarkdownMessage
                        content={message.content}
                        isUser={message.role === 'user'}
                      />
                    </div>
                  </div>
                </div>
              ))}

              {/* Streaming Message */}
              {isStreaming && (
                <div className="flex gap-4">
                  {/* Avatar */}
                  <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium bg-blue-200 text-blue-800">
                    AI
                  </div>

                  {/* Streaming Message Content */}
                  <div className="flex-1 min-w-0">
                    <div className="rounded-lg px-4 py-3 message-assistant">
                      <MarkdownMessage
                        content={streamingMessage}
                        isUser={false}
                      />
                      <span className="inline-block w-2 h-4 bg-blue-500 ml-1 animate-pulse" />
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>
          </div>
        )}
      </div>

      {/* Input Container */}
      <div className="fixed bottom-0 left-0 right-0 z-10 border-t border-sand-200/50 backdrop-blur-md">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex gap-3">
            <input
              type="text"
              value={input}
              placeholder={
                isModelLoading
                  ? 'Please wait for model to finish loading...'
                  : 'Type your message...'
              }
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault()
                  handleMessage()
                }
              }}
              onChange={(e) => setInput(e.target.value)}
              disabled={isLoading}
              className="flex-1 bg-white border border-sand-300 rounded-md px-4 py-2 text-sand-900 placeholder-sand-500 focus:outline-none focus:ring-2 focus:ring-sand-500 focus:border-transparent disabled:opacity-50"
            />
            <button
              onClick={handleMessage}
              disabled={isLoading || isModelLoading || !input.trim()}
              className="bg-sand-900 hover:bg-sand-800 text-white px-4 py-2 rounded-md font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Sending</span>
                </div>
              ) : isModelLoading ? (
                <span>Wait for model</span>
              ) : (
                'Send'
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
