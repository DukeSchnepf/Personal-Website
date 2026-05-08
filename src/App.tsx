import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Suspense, useState, useEffect, useRef, useCallback } from 'react';
import { CSSStarField } from './components/effects/CSSStarField';
import { LoadingScreen, LoadingScreenRef } from './components/features/LoadingScreen';
import { HomePage } from './pages/HomePage';
import { NotFound } from './pages/NotFound';
import { Navigation } from './components/layout/Navigation';
import { Footer } from './components/layout/Footer';
import './styles/global.css';

function AppContent() {
  const [isLoading, setIsLoading] = useState(true);
  const [showLoadingScreen, setShowLoadingScreen] = useState(true);
  const loadingScreenRef = useRef<LoadingScreenRef>(null);

  // Lock scroll during loading screen
  useEffect(() => {
    document.body.style.overflow = isLoading ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isLoading]);

  // Disable browser scroll restoration so refresh starts at top
  useEffect(() => {
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);
  }, []);

  const handleLoadingComplete = useCallback(async () => {
    window.scrollTo(0, 0);
    if (loadingScreenRef.current) {
      await loadingScreenRef.current.triggerExit();
    }
    setShowLoadingScreen(false);
    setIsLoading(false);
  }, []);

  return (
    <main className="min-h-screen text-white relative">
      {/* Starfield - always visible behind everything */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <CSSStarField experienceStarted={!isLoading} />
      </div>

      {/* Loading Screen */}
      {showLoadingScreen && (
        <LoadingScreen ref={loadingScreenRef} onComplete={handleLoadingComplete} />
      )}

      {/* Main content */}
      <div className={`relative z-10 ${isLoading ? 'invisible' : 'visible'}`}>
        <Navigation />

        <Suspense
          fallback={
            <div className="flex h-screen items-center justify-center text-white">
              Loading…
            </div>
          }
        >
          <Routes>
            <Route path="/" element={<HomePage showContent={!isLoading} />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>

        <Footer />
      </div>
    </main>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
