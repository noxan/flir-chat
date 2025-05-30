import { Component, type ErrorInfo, type ReactNode } from 'react'

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
  error?: Error
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error loading Flower Intelligence:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="h-screen flex flex-col bg-sand-50 relative">
          {/* Header */}
          <div className="fixed top-0 left-0 right-0 z-10 border-b border-sand-200/50 backdrop-blur-md">
            <div className="flex items-center justify-between px-6 py-4">
              <div className="flex items-center gap-3">
                <h1 className="text-xl font-semibold text-sand-900">
                  Flir Chat
                </h1>
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
            </div>
          </div>

          {/* Error content */}
          <div className="flex-1 flex items-center justify-center pt-20 pb-24">
            <div className="text-center max-w-md mx-auto px-6">
              {/* Error icon */}
              <div className="w-20 h-20 mx-auto mb-8 rounded-full bg-red-100 flex items-center justify-center">
                <span className="text-4xl">⚠️</span>
              </div>

              {/* Error text */}
              <div className="space-y-4">
                <h2 className="text-2xl font-semibold text-sand-900">
                  Failed to Load AI Engine
                </h2>
                <p className="text-sand-600 leading-relaxed">
                  There was an error loading the Flower Intelligence module.
                  This might be due to network issues or browser compatibility.
                </p>

                {/* Error details */}
                {this.state.error && (
                  <details className="mt-6 text-left">
                    <summary className="cursor-pointer text-sand-700 hover:text-sand-900 font-medium">
                      Technical Details
                    </summary>
                    <pre className="mt-2 p-3 bg-sand-100 rounded text-xs text-sand-800 overflow-auto">
                      {this.state.error.message}
                    </pre>
                  </details>
                )}

                {/* Retry button */}
                <button
                  type="button"
                  onClick={() => window.location.reload()}
                  className="mt-6 bg-sand-900 hover:bg-sand-800 text-white px-6 py-2 rounded-md font-medium transition-colors"
                >
                  Retry
                </button>
              </div>

              {/* Troubleshooting tips */}
              <div className="mt-12 space-y-3 text-left">
                <h3 className="font-medium text-sand-900 mb-4">
                  Troubleshooting Tips:
                </h3>
                <div className="flex items-start gap-3 text-sand-700">
                  <div className="w-2 h-2 bg-sand-400 rounded-full mt-2 flex-shrink-0" />
                  <span className="text-sm">
                    Check your internet connection
                  </span>
                </div>
                <div className="flex items-start gap-3 text-sand-700">
                  <div className="w-2 h-2 bg-sand-400 rounded-full mt-2 flex-shrink-0" />
                  <span className="text-sm">Try refreshing the page</span>
                </div>
                <div className="flex items-start gap-3 text-sand-700">
                  <div className="w-2 h-2 bg-sand-400 rounded-full mt-2 flex-shrink-0" />
                  <span className="text-sm">
                    Ensure you're using a modern browser
                  </span>
                </div>
                <div className="flex items-start gap-3 text-sand-700">
                  <div className="w-2 h-2 bg-sand-400 rounded-full mt-2 flex-shrink-0" />
                  <span className="text-sm">
                    Disable browser extensions if needed
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}
