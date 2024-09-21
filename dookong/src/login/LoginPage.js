import React, { useState } from 'react';
import './LoginPage.css';
import { useNavigate } from 'react-router-dom';
import dookong from '../assets/dookong.png';

export const LoginPage = ({ onLogin }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [signupUsername, setSignupUsername] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [signupName, setSignupName] = useState('');
  const [loginError, setLoginError] = useState('');
  const navigate = useNavigate();

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  // 로그인 처리
  const handleLogin = (e) => {
    e.preventDefault();

    const savedUsername = localStorage.getItem('username');
    const savedPassword = localStorage.getItem('password');

    // 입력한 아이디와 비밀번호가 로컬 스토리지에 저장된 값과 일치하는지 확인
    if (username === savedUsername && password === savedPassword) {
      onLogin(); // 로그인 성공
      navigate('/'); // 메인 페이지로 이동
    } else {
      setLoginError('아이디 또는 비밀번호가 일치하지 않습니다.');
    }
  };

  // 회원가입 처리
  const handleSignup = (e) => {
    e.preventDefault();
    
    // 로컬 스토리지에 아이디, 비밀번호, 이름 저장
    localStorage.setItem('username', signupUsername); //아이디
    localStorage.setItem('password', signupPassword); //비번
    localStorage.setItem('name', signupName); // 이름

    // 회원가입 완료 후 모달 닫기
    closeModal();
    alert('회원가입이 완료되었습니다! 이제 로그인하세요.');
  };

  return (
    <div className="login-page">
      <h3>지구를 지키자 !</h3>
      <h1>dookong</h1>
      <img src={dookong} alt="Dookong Character" className="dookong-image" />

      <div className="input-container">
        <input 
          type="text" 
          placeholder="이메일을 입력하세요" 
          className="login-input" 
          value={username} 
          onChange={(e) => setUsername(e.target.value)} 
        />
        <input 
          type="password" 
          placeholder="비밀번호를 입력하세요" 
          className="login-input" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
        />
      </div>

      <button className="login-button" onClick={handleLogin}>로그인</button>
      {loginError && <p className="error-message">{loginError}</p>}
      <p className="join" onClick={openModal}>회원가입</p>

      {/* 회원가입 모달 */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>🪴 회원가입 🪴</h2>
            <form onSubmit={handleSignup}>
              <input 
                type="text" 
                placeholder="이름(별명)을 입력하세요 ☺️" 
                className="modal-input" 
                value={signupName} 
                onChange={(e) => setSignupName(e.target.value)} 
              />
              <input 
                type="text" 
                placeholder="이메일을 입력하세요" 
                className="modal-input" 
                value={signupUsername}
                onChange={(e) => setSignupUsername(e.target.value)}
              />
              <input 
                type="password" 
                placeholder="비밀번호를 입력하세요" 
                className="modal-input" 
                value={signupPassword}
                onChange={(e) => setSignupPassword(e.target.value)}
              />
              
              <button className="modal-button" type="submit">회원가입</button>
              <button className="modal-button" type="button" onClick={closeModal}>닫기</button>
            </form>
            
          </div>
        </div>
      )}
    </div>
  );
};

export default LoginPage;

