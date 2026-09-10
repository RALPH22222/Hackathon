import { useState } from 'react';
import Login from './pages/auth/login';
import SignUp from './pages/auth/signup';
import Home from './pages/Home';

export default function App() {
  const [currentPage, setCurrentPage] = useState<'login' | 'signup' | 'home'>('login');
  const [userRole, setUserRole] = useState<'student' | 'adviser'>('student');

  if (currentPage === 'home') {
    return (
      <Home
        userRole={userRole}
        onLogout={() => setCurrentPage('login')}
      />
    );
  }

  if (currentPage === 'signup') {
    return <SignUp onNavigateToLogin={() => setCurrentPage('login')} />;
  }

  return (
    <Login
      initialRole={userRole}
      onLoginSuccess={(role) => {
        setUserRole(role);
        setCurrentPage('home');
      }}
      onNavigateToSignup={() => setCurrentPage('signup')}
    />
  );
}
