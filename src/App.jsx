import React from 'react';
import {
  Routes, Route,
} from 'react-router-dom';

import Home from './components/Home.jsx';
import Login from './components/Login.jsx';
import NotFound from './components/NotFound.jsx';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
