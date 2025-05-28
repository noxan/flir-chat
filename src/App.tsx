import { Suspense, lazy } from 'react';
import "./index.css";
import { LoadingScreen } from './components/LoadingScreen';
import { ErrorBoundary } from './components/ErrorBoundary';

// Lazy load the FlowerChat component which contains all the Flower Intelligence logic
const FlowerChat = lazy(() => import('./components/FlowerChat').then(module => ({ default: module.FlowerChat })));

export function App() {
  return (
    <div className="h-screen flex flex-col bg-sand-50 relative">
      <ErrorBoundary>
        <Suspense fallback={<LoadingScreen />}>
          <FlowerChat />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}
