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
        {/* Existing author route */}
        <Route path="/author/:authorId" element={<AuthorProfile />} />
        {/* Optional: commenter profiles by name (e.g., /commenter/Commenter%201) */}
        <Route path="/commenter/:name" element={<AuthorProfile />} />
      </Routes>
    </Router>
  );
};

export default App;
