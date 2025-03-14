// src/App.js
import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Details from './components/Details';
import Stats from './components/Stats';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/details/:index" element={<Details />} />
        <Route path="/stats" element={<Stats />} />
      </Routes>
    </Router>
  );
}

export default App;
