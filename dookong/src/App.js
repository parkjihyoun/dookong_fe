import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LankPage from './lank/LankPage';
import PointPage from './point/PointPage';
import LoginPage from './login/LoginPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/lank" element={<LankPage />} />
        <Route path="/point" element={<PointPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </Router>
  );
}

export default App;