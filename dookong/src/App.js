import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LankPage from './lank/LankPage';
import PointPage from './point/PointPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/lank" element={<LankPage />} />
        <Route path="/point" element={<PointPage />} />
      </Routes>
    </Router>
  );
}

export default App;