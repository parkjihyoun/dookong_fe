import React, { useState } from 'react';
import './LoginPage.css';
import dookong from '../assets/dookong.png';

export const LoginPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="login-page">
      <h3>지구를 지키자 !</h3>
      <h1>dookong</h1>
      <img src={dookong} alt="Dookong Character" className="dookong-image" />

      <div className="input-container">
        <input type="text" placeholder="아이디를 입력하세요" className="login-input" />
        <input type="password" placeholder="비밀번호를 입력하세요" className="login-input" />
      </div>

      <button className="login-button">로그인</button>
      <p className="join" onClick={openModal}>회원가입</p>
      <p className="forgot-password">비밀번호를 잊으셨나요?</p>

      {/* 회원가입 모달 */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>🪴 회원가입 🪴</h2>
            <form>
            <input type="text" placeholder="이름(별명)을 입력하세요 ☺️" className="modal-input" />
              <input type="text" placeholder="아이디를 입력하세요 " className="modal-input" />
              <input type="password" placeholder="비밀번호를 입력하세요" className="modal-input" />
              
              <button className="modal-button" type="submit">회원가입</button>
            </form>
            <button className="modal-close-button" onClick={closeModal}>닫기</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default LoginPage;