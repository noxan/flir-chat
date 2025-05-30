import { TopBar } from './TopBar'

export function LoadingScreen() {
  return (
    <div className="h-screen flex flex-col bg-sand-50 relative">
      {/* Header placeholder */}
      <TopBar disabled />

      {/* Loading content */}
      <div className="flex-1 flex items-center justify-center pt-20 pb-24">
        <div className="text-center max-w-md mx-auto px-6">
          {/* Animated flower icon */}
          <div className="relative mb-8">
            <div className="w-20 h-20 mx-auto relative">
              {/* Flower petals */}
              <div
                className="absolute inset-0 animate-spin"
                style={{ animationDuration: '3s' }}
              >
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-6 h-6 bg-gradient-to-br from-pink-300 to-pink-500 rounded-full opacity-80" />
                <div className="absolute top-2 right-2 w-5 h-5 bg-gradient-to-br from-purple-300 to-purple-500 rounded-full opacity-70" />
                <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-6 h-6 bg-gradient-to-br from-blue-300 to-blue-500 rounded-full opacity-80" />
                <div className="absolute bottom-2 right-2 w-5 h-5 bg-gradient-to-br from-green-300 to-green-500 rounded-full opacity-70" />
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-6 h-6 bg-gradient-to-br from-yellow-300 to-yellow-500 rounded-full opacity-80" />
                <div className="absolute bottom-2 left-2 w-5 h-5 bg-gradient-to-br from-red-300 to-red-500 rounded-full opacity-70" />
                <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-6 h-6 bg-gradient-to-br from-indigo-300 to-indigo-500 rounded-full opacity-80" />
                <div className="absolute top-2 left-2 w-5 h-5 bg-gradient-to-br from-orange-300 to-orange-500 rounded-full opacity-70" />
              </div>
              {/* Center */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-gradient-to-br from-sand-300 to-sand-500 rounded-full" />
            </div>
          </div>

          {/* Loading text */}
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-sand-900">
              Initializing Flower Intelligence
            </h2>
            <p className="text-sand-600 leading-relaxed">
              Loading AI models and preparing your local chat environment...
            </p>

            {/* Progress dots */}
            <div className="flex justify-center space-x-2 pt-4">
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

          {/* Features preview */}
          <div className="mt-12 space-y-3 text-left">
            <div className="flex items-center gap-3 text-sand-700">
              <div className="w-2 h-2 bg-green-500 rounded-full" />
              <span className="text-sm">Privacy-first local AI processing</span>
            </div>
            <div className="flex items-center gap-3 text-sand-700">
              <div className="w-2 h-2 bg-green-500 rounded-full" />
              <span className="text-sm">Real-time streaming responses</span>
            </div>
            <div className="flex items-center gap-3 text-sand-700">
              <div className="w-2 h-2 bg-green-500 rounded-full" />
              <span className="text-sm">Multiple AI model options</span>
            </div>
            <div className="flex items-center gap-3 text-sand-700">
              <div className="w-2 h-2 bg-green-500 rounded-full" />
              <span className="text-sm">Persistent chat history</span>
            </div>
          </div>
        </div>
      </div>

      {/* Input placeholder */}
      <div className="fixed bottom-0 left-0 right-0 z-10 border-t border-sand-200/50 backdrop-blur-md">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex gap-3">
            <div className="flex-1 bg-sand-200 animate-pulse rounded-md h-10" />
            <div className="bg-sand-300 animate-pulse rounded-md h-10 w-16" />
          </div>
        </div>
      </div>
    </div>
  )
}
