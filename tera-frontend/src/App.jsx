import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Sprout } from 'lucide-react';

const Home = lazy(() => import('./pages/Home'));
const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));
const Dashboard = lazy(() => import('./pages/Dashboard'));

function PageLoader() {
  return (
    <div className="min-h-screen bg-paper flex flex-col items-center justify-center p-6 text-ink paper-grain">
      <div className="w-14 h-14 rounded-2xl bg-moss-900 text-paper flex items-center justify-center mb-4 border-2 border-ink shadow-[4px_4px_0px_0px_#171715] animate-pulse">
        <Sprout className="w-7 h-7 text-ochre-400" />
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

function App() {
  return (
    <Router>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          {/* Redirect root URL to /home */}
          <Route path="/" element={<Navigate to="/home" replace />} />
          
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/home" element={<Home />} />
          {/* Catch-all redirect */}
          <Route path="*" element={<Navigate to="/home" replace />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
