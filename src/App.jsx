import React, { useMemo, useState } from 'react';
import {
  BrowserRouter, Routes, Route, Navigate,
} from 'react-router-dom';

import Chat from './pages/Chat.jsx';
import Login from './pages/Login.jsx';
import NotFound from './pages/NotFound.jsx';
import Navigation from './components/Navigation.jsx';

import useAuth from './hooks/useAuth.jsx';
import AuthContext from './contexts/index.jsx';

function AuthProvider({ children }) {
  const [loggedIn, setloggedIn] = useState(false);
  const logIn = () => {
    setloggedIn(true);
  };
  const logOut = () => {
    localStorage.removeItem('userId');
    setloggedIn(false);
  };
  const value = useMemo(() => ({ loggedIn, logIn, logOut }), [loggedIn]);
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

function PrivatePage() {
  const auth = useAuth();
  return auth.loggedIn ? <Chat /> : <Navigate to="/login" />;
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Navigation />}>
            <Route path="/" element={<PrivatePage />} />
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
