import { useState } from 'react';
import Login from './pages/auth/login';
import SignUp from './pages/auth/signup';
import Home from './pages/Home';

export default function App() {
  const [currentPage, setCurrentPage] = useState<'login' | 'signup' | 'home'>('login');

  if (currentPage === 'home') {
    return <Home />;
  }

  if (currentPage === 'signup') {
    return <SignUp onNavigateToLogin={() => setCurrentPage('login')} />;
  }

  return (
    <Login
      onLoginSuccess={() => setCurrentPage('home')}
      onNavigateToSignup={() => setCurrentPage('signup')}
    />
  );
}
