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
  const token = localStorage.getItem('userId') ?? false;
  const isAuth = Boolean(token);

  const [loggedIn, setloggedIn] = useState(isAuth);

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

function ChatPage() {
  const { loggedIn } = useAuth();
  return loggedIn ? <Chat /> : <Navigate to="/login" />;
}

function LoginPage() {
  const { loggedIn } = useAuth();
  return loggedIn ? <Navigate to="/" /> : <Login />;
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Navigation />}>
            <Route path="/" element={<ChatPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
