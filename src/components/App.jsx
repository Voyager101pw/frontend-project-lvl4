import React from 'react';
import {
  Routes, Route,
} from 'react-router-dom';

import Home from './Home.jsx';
import Login from './Login/Login.jsx';
import NotFound from './NotFound.jsx';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
