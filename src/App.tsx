import { useState } from 'react';
import Login from './pages/auth/login';
import Home from './pages/Home';

export default function App() {
  const [currentPage, setCurrentPage] = useState<'login' | 'home'>('login');

  return (
    <div>
      {currentPage === 'login' ? (
        <Login onLoginSuccess={() => setCurrentPage('home')} />
      ) : (
        <Home />
      )}
    </div>
  );
}