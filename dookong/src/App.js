import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LankPage from './lank/LankPage';
import PointPage from './point/PointPage';
import LoginPage from './login/LoginPage';
import ModalLog from './components/ModalLog'; // Modal 컴포넌트 추가

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false); // 로그인 여부 상태

  const handleLogin = () => {
    setIsAuthenticated(true); // 로그인 상태 업데이트
  };

  return (
    <Router>
      <Routes>
        <Route 
          path="/lank" 
          element={isAuthenticated ? <LankPage /> : <ModalLog />} 
        />
        <Route 
          path="/point" 
          element={isAuthenticated ? <PointPage /> : <ModalLog />} 
        />
        <Route 
          path="/login" 
          element={<LoginPage onLogin={handleLogin} />} 
        />
        {/* 로그인 페이지로 이동 */}
        {!isAuthenticated && <Route path="*" element={<Navigate to="/login" />} />}
      </Routes>
    </Router>
  );
}

export default App;