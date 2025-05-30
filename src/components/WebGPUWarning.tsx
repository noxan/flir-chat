import { AlertTriangle, X } from 'lucide-react'

interface WebGPUWarningProps {
  reason?: string
  onDismiss?: () => void
}

export function WebGPUWarning({ reason, onDismiss }: WebGPUWarningProps) {
  return (
    <div className="bg-amber-50 border-l-4 border-amber-400 p-4 mb-4 rounded-r-lg shadow-sm">
      <div className="flex items-start">
        <div className="flex-shrink-0">
          <AlertTriangle className="h-5 w-5 text-amber-400" />
        </div>
        <div className="ml-3 flex-1">
          <h3 className="text-sm font-medium text-amber-800">
            WebGPU Not Supported
          </h3>
          <div className="mt-2 text-sm text-amber-700">
            <p>
              Your browser doesn't support WebGPU, which is required for optimal
              performance.
              {reason && (
                <span className="block mt-1 text-xs text-amber-600">
                  Reason: {reason}
                </span>
              )}
            </p>
            <p className="mt-2">
              Please check the{' '}
              <a
                href="https://github.com/gpuweb/gpuweb/wiki/Implementation-Status#implementation-status"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-amber-800 underline hover:text-amber-900 transition-colors"
              >
                WebGPU implementation status
              </a>{' '}
              to see supported browsers and how to enable WebGPU.
            </p>
            <div className="mt-3 text-xs text-amber-600">
              <p>
                <strong>Supported browsers:</strong>
              </p>
              <ul className="list-disc list-inside mt-1 space-y-1">
                <li>
                  Chrome/Edge 113+ (Mac, Windows, ChromeOS), 121+ (Android)
                </li>
                <li>Firefox Nightly (planned for Firefox 141)</li>
                <li>
                  Safari Technology Preview (iOS 18+ beta, visionOS 2+ beta)
                </li>
                <li>
                  Chrome on Linux (behind flag:
                  chrome://flags/#enable-unsafe-webgpu)
                </li>
              </ul>
            </div>
          </div>
        </div>
        {onDismiss && (
          <div className="ml-auto pl-3">
            <div className="-mx-1.5 -my-1.5">
              <button
                type="button"
                onClick={onDismiss}
                className="inline-flex rounded-md bg-amber-50 p-1.5 text-amber-500 hover:bg-amber-100 focus:outline-none focus:ring-2 focus:ring-amber-600 focus:ring-offset-2 focus:ring-offset-amber-50 transition-colors"
              >
                <span className="sr-only">Dismiss</span>
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
