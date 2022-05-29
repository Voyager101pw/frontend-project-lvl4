import React, { useMemo, useState } from 'react';
import {
  BrowserRouter, Routes, Route,
} from 'react-router-dom';

import Home from './Home.jsx';
import Login from './Login/Login.jsx';
import NotFound from './NotFound.jsx';
import Nav from './Nav.jsx';

import AuthContext from '../contexts/index.jsx';

function AuthProvider({ children }) {
  const [loggedIn, setloggedIn] = useState(false);
  const logIn = () => setloggedIn(true);
  const logOut = () => {
    localStorage.removeItem('token');
    setloggedIn(false);
  };

  const value = useMemo(() => ({ loggedIn, logIn, logOut }), []);
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Nav />}>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
