import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ModalLog.css';

function Modal() {
  const navigate = useNavigate();

  const handleLoginRedirect = () => {
    navigate('/login');
  };

  return (
    <div className="modalLog">
      <div className="modalLog-content">
        <h2>🚨 로그인이 필요합니다 ! 🚨</h2>
        <p>이 페이지는 로그인이 필요한 서비스입니다.</p>
        <button onClick={handleLoginRedirect}>로그인 하러가기</button>
      </div>
    </div>
  );
}

export default Modal;