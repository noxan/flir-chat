import { AVAILABLE_MODELS } from '../models'

interface TopBarProps {
  isLoading?: boolean
  isModelLoading?: boolean
  selectedModel?: string
  onModelChange?: (model: string) => void
  onClearHistory?: () => void
  hasHistory?: boolean
  disabled?: boolean
}

export function TopBar({
  isLoading = false,
  isModelLoading = false,
  selectedModel,
  onModelChange,
  onClearHistory,
  hasHistory = false,
  disabled = false,
}: TopBarProps) {
  return (
    <div className="fixed top-0 left-0 right-0 z-10 border-b border-sand-200/50 backdrop-blur-md">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-3">
          <h1 className="text-xl font-semibold text-sand-900">Flir Chat</h1>
          <span className="text-sm text-sand-600">
            Local-only AI chat powered by{' '}
            <a
              href="https://flower.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sand-700 hover:text-sand-900 underline"
            >
              Flower Intelligence
            </a>
          </span>
        </div>

        <div className="flex items-center gap-4">
          {/* Model Loading Indicator */}
          {isModelLoading && (
            <div className="flex items-center gap-2 text-sm text-sand-600">
              <div className="w-4 h-4 border-2 border-sand-400 border-t-transparent rounded-full animate-spin" />
              <span>Loading model...</span>
            </div>
          )}

          {/* Model Selector or Loading Placeholder */}
          {selectedModel && onModelChange ? (
            <select
              value={selectedModel}
              onChange={(e) => onModelChange(e.target.value)}
              disabled={isLoading || isModelLoading || disabled}
              className="bg-white border border-sand-300 text-sand-900 rounded-md px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-sand-500 focus:border-transparent disabled:opacity-50"
            >
              {AVAILABLE_MODELS.map((model) => (
                <option key={model.value} value={model.value}>
                  {model.label}
                </option>
              ))}
            </select>
          ) : (
            <div className="bg-sand-200 animate-pulse rounded-md h-8 w-48" />
          )}

          {/* Clear History Button */}
          {hasHistory && onClearHistory && (
            <button
              type="button"
              onClick={onClearHistory}
              disabled={isLoading || isModelLoading || disabled}
              className="text-sm text-sand-600 hover:text-sand-900 px-3 py-1.5 rounded-md hover:bg-sand-100 transition-colors disabled:opacity-50"
            >
              Clear
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
