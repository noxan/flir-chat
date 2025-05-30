import { Suspense, lazy, useState } from 'react'
import './index.css'
import { ErrorBoundary } from './components/ErrorBoundary'
import { LoadingScreen } from './components/LoadingScreen'
import { WebGPUWarning } from './components/WebGPUWarning'
import { useWebGPU } from './hooks/useWebGPU'

// Lazy load the FlowerChat component which contains all the Flower Intelligence logic
const FlowerChat = lazy(() =>
  import('./components/FlowerChat').then((module) => ({
    default: module.FlowerChat,
  })),
)

export function App() {
  const { isSupported, reason, isLoading } = useWebGPU()
  const [warningDismissed, setWarningDismissed] = useState(false)

  const showWarning = !isLoading && !isSupported && !warningDismissed

  return (
    <div className="h-screen flex flex-col bg-sand-50 relative">
      <ErrorBoundary>
        {showWarning && (
          <div className="p-4">
            <WebGPUWarning
              reason={reason || undefined}
              onDismiss={() => setWarningDismissed(true)}
            />
          </div>
        )}
        <Suspense fallback={<LoadingScreen />}>
          <FlowerChat />
        </Suspense>
      </ErrorBoundary>
    </div>
  )
}
