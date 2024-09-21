import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';


import LoginPage from './login/LoginPage';
import MainPage from './main/MainPage';
import MyPage from './my/MyPage';
import PointPage from './point/PointPage';
import MapPage from './map/MapPage';
import LankPage from './lank/LankPage';
import QaPage from './qa/QaPage';


import ModalLog from './components/ModalLog'; 
import ModalCheck from './components/ModalCheck';

import ImgCheck from './manage/ImgCheck';
import CheckPage from './manage/CheckPage';
import AllPoint from './components/AllPoint';

import Notice1 from './qa/Notice1';
import Notice2 from './qa/Notice2';
import Mail from './qa/Mail';

import ManMain from './manage/ManMain';
import CheckPage from './manage/CheckPage';
import ImgCheck from './manage/ImgCheck';
import AddItem from './manage/addItem';


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

      <Route path="/checkimg" element={<ImgCheck />} />
      <Route path="/allpoint" element={<AllPoint showModal={true} onClose={() => {}} />} />

       <Route path="/ManMain" element={<ManMain />} />
       <Route path="/addItem" element = {<AddItem/>} />
       <Route path="/trashcheck" element = {<ModalCheck/>} />

        <Route path="/CheckPage" element={isAuthenticated ? <CheckPage onLogout={handleLogout} /> : <ModalLog />}  />
        <Route path="/Notice1" element={isAuthenticated ? <Notice1 onLogout={handleLogout} /> : <ModalLog />}  />
        <Route path="/Notice2" element={isAuthenticated ? <Notice2 onLogout={handleLogout} /> : <ModalLog />}  />
        <Route path="/Mail" element={isAuthenticated ? <Mail onLogout={handleLogout} /> : <ModalLog />}  />

        {/*기본 페이지*/}
        <Route path="/" element={isAuthenticated ? <MainPage /> : <Navigate to="/login" />} />

        <Route path="/my" element={isAuthenticated ? <MyPage onLogout={handleLogout} /> : <ModalLog />}  />
        <Route path="/qa" element={isAuthenticated ? <QaPage onLogout={handleLogout} /> : <ModalLog />}  />
        <Route path="/map" element={isAuthenticated ? <MapPage onLogout={handleLogout} /> : <ModalLog />}  />
        <Route path="/lank" element={isAuthenticated ? <LankPage onLogout={handleLogout} /> : <ModalLog />} />
        <Route path="/point" element={isAuthenticated ? <PointPage onLogout={handleLogout} /> : <ModalLog />} />
        <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />

        {/* 로그인 페이지로 이동 */}
        <Route path="*" element={<Navigate to={isAuthenticated ? '/' : '/login'} />} />


      </Routes>
    </Router>
  );
}

export default App;
