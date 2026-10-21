/**
 * Application Root Component
 * Configures React Router, Global Context Providers, Lazy Route Chunks, and Route Guards
 */
import { lazy, Suspense, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/layout/ProtectedRoute';
import TerasChatbot from './components/common/TerasChatbot';
import { TerasMark } from './components/common/TerasLogo';

const Home = lazy(() => import('./pages/Home'));
const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));
const Dashboard = lazy(() => import('./pages/Dashboard'));

/**
 * Automatically resets scroll position to the top on every route change
 * Prevents pages like /login and /register from opening clamped at the bottom
 */
function ScrollToTop() {
  const { pathname, search } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, [pathname, search]);

  return null;
}

function PageLoader() {
  return (
    <div className="min-h-screen bg-paper flex flex-col items-center justify-center p-6 text-ink paper-grain">
      <div className="mb-4 animate-pulse">
        <TerasMark size={52} />
      </div>
      <div className="font-display text-2xl tracking-tight">
        Teras<span className="font-editorial-italic text-moss-700">Tani</span>
      </div>
      <div className="font-mono text-[10px] uppercase tracking-widest text-graphite/70 mt-1 font-bold">
        Memuat Ekosistem Agrikultur Presisi...
      </div>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <ScrollToTop />
        <Suspense fallback={<PageLoader />}>
          <Routes>
            {/* Default entrypoint redirects to /home */}
            <Route path="/" element={<Navigate to="/home" replace />} />
            
            {/* Public authentication routes */}
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            {/* Protected authenticated routes */}
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } 
            />
            
            {/* Catch-all fallback */}
            <Route path="*" element={<Navigate to="/home" replace />} />
          </Routes>
        </Suspense>
        <TerasChatbot />
      </Router>
    </AuthProvider>
  );
}
