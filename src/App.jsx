// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import AuthorProfile from './pages/AuthorProfile';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/author/:authorId" element={<AuthorProfile />} />
      </Routes>
    </Router>
  );
};

export default App;
