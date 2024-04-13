import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import AddWordsForm from './components/AddWordsForm'; 
import TestPage from './components/TestPage'; 
import SummaryPage from './components/SummaryPage'; 
import HomePage from './components/HomePage';
import 'bootstrap/dist/css/bootstrap.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/add-words" element={<AddWordsForm />} />
        <Route path="/test" element={<TestPage />} />
        <Route path="/summary" element={<SummaryPage />} />
      </Routes>
    </Router>
  );
}

export default App;
