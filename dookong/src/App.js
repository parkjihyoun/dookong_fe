import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LankPage from './lank/LankPage';
import PointPage from './point/PointPage';
import LoginPage from './login/LoginPage';

import MyPage from './my/MyPage';

import ModalLog from './components/ModalLog'; // Modal 컴포넌트 추가


function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false); // 로그인 여부 상태

  useEffect(() => {
    // 로컬 스토리지에서 로그인 상태를 확인
    const loggedIn = localStorage.getItem('isAuthenticated');
    if (loggedIn === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = () => {
    setIsAuthenticated(true);
    localStorage.setItem('isAuthenticated', 'true'); // 로그인 상태를 로컬 스토리지에 저장
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('isAuthenticated'); // 로그아웃 시 로컬 스토리지에서 삭제
  };

  return (
    <Router>
      <Routes>

        <Route path="/my" element={isAuthenticated ? <MyPage onLogout={handleLogout} /> : <ModalLog />}  />
        <Route 
          path="/lank" 
          element={isAuthenticated ? <LankPage onLogout={handleLogout} /> : <ModalLog />} 
        />
        <Route 
          path="/point" 
          element={isAuthenticated ? <PointPage onLogout={handleLogout} /> : <ModalLog />} 
        />
        <Route 
          path="/login" 
          element={<LoginPage onLogin={handleLogin} />} 
        />
        {/* 로그인 페이지로 이동 */}
        <Route path="*" element={<Navigate to={isAuthenticated ? '/lank' : '/login'} />} />

      </Routes>
    </Router>
  );
}

export default App;
