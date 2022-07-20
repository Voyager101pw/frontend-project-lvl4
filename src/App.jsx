import React from 'react';
import {
  BrowserRouter, Routes, Route, Navigate,
} from 'react-router-dom';
import filter from 'leo-profanity';

import Chat from './pages/Chat.jsx';
import Login from './pages/Login.jsx';
import NotFound from './pages/NotFound.jsx';
import Navigation from './components/Navigation.jsx';

import useAuth from './hooks/useAuth.jsx';
import Sign from './pages/SignUp.jsx';

filter.loadDictionary('ru');

function ChatPage() {
  const { loggedIn } = useAuth();
  return loggedIn ? <Chat /> : <Navigate to="/login" />;
}

function LoginPage() {
  const { loggedIn } = useAuth();
  return loggedIn ? <Navigate to="/" /> : <Login />;
}

function SignUpPage() {
  const { loggedIn } = useAuth();
  return loggedIn ? <Navigate to="/" /> : <Sign />;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Navigation />}>
          <Route path="/" element={<ChatPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
