import React, { useState } from 'react';
import './LoginPage.css';
import { useNavigate } from 'react-router-dom';
import dookong from '../assets/dookong.png';

export const LoginPage = ({ onLogin }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [username, setUsername] = useState(''); // 로그인 ID (email)
  const [password, setPassword] = useState('');
  const [signupUsername, setSignupUsername] = useState(''); // 별명
  const [signupEmail, setSignupEmail] = useState(''); // 이메일 (ID)
  const [signupPassword, setSignupPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const navigate = useNavigate();

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  // 로그인 처리
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/members/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: username, password })
      });
      const data = await response.json();
      if (response.ok) {
        localStorage.setItem('userInfo', JSON.stringify(data)); // 로컬 스토리지에 사용자 정보 저장
        onLogin(); // 로그인 상태 변경
        if (username === 'admin@example.com') {
          navigate('/manmain'); // Redirect to /manmain if admin
        } else {
          navigate('/'); // Redirect to main page if regular user
        }
      } else {
        setLoginError('아이디 또는 비밀번호가 일치하지 않습니다.');
      }
    } catch (error) {
      console.error('로그인 실패:', error);
    }
  };

  // 회원가입 처리
  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/members/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: signupUsername,
          email: signupEmail,
          password: signupPassword
        })
      });
      if (response.ok) {
        closeModal(); // 회원가입 모달 닫기
        alert('회원가입이 완료되었습니다! 이제 로그인하세요.');
      } else {
        alert('회원가입 실패, 다시 시도해주세요.');
      }
    } catch (error) {
      console.error('회원가입 처리 중 에러 발생:', error);
    }
  };

  return (
    <div className="login-page">
      <h3>지구를 지키자 !</h3>
      <h1>dookong</h1>
      <img src={dookong} alt="Dookong Character" className="dookong-image" />

      <div className="input-container">
        <input
          type="text"
          placeholder="아이디를 입력하세요"
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
                placeholder="이름(별명)을 입력하세요"
                className="modal-input"
                value={signupUsername}
                onChange={(e) => setSignupUsername(e.target.value)}
              />
              <input
                type="text"
                placeholder="메일을 입력하세요"
                className="modal-input"
                value={signupEmail}
                onChange={(e) => setSignupEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="비밀번호를 입력하세요"
                className="modal-input"
                value={signupPassword}
                onChange={(e) => setSignupPassword(e.target.value)}
              />

              <button className="modal-ok-button" type="submit">회원가입</button>
            </form>
            <button className="modal-close-button" onClick={closeModal}>닫기</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoginPage;
