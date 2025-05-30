import React from 'react';

interface WebGPUWarningProps {
  reason?: string;
  onDismiss?: () => void;
}

export function WebGPUWarning({ reason, onDismiss }: WebGPUWarningProps) {
  return (
    <div className="bg-amber-50 border-l-4 border-amber-400 p-4 mb-4 rounded-r-lg shadow-sm">
      <div className="flex items-start">
        <div className="flex-shrink-0">
          <svg className="h-5 w-5 text-amber-400" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
        </div>
        <div className="ml-3 flex-1">
          <h3 className="text-sm font-medium text-amber-800">
            WebGPU Not Supported
          </h3>
          <div className="mt-2 text-sm text-amber-700">
            <p>
              Your browser doesn't support WebGPU, which is required for optimal performance.
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
              </a>
              {' '}to see supported browsers and how to enable WebGPU.
            </p>
            <div className="mt-3 text-xs text-amber-600">
              <p><strong>Supported browsers:</strong></p>
              <ul className="list-disc list-inside mt-1 space-y-1">
                <li>Chrome/Edge 113+ (Mac, Windows, ChromeOS), 121+ (Android)</li>
                <li>Firefox Nightly (planned for Firefox 141)</li>
                <li>Safari Technology Preview (iOS 18+ beta, visionOS 2+ beta)</li>
                <li>Chrome on Linux (behind flag: chrome://flags/#enable-unsafe-webgpu)</li>
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
                <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
