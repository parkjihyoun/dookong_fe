import React from 'react';
import { useNavigate } from 'react-router-dom';

function MainPage() {
  const navigate = useNavigate();

  const goToLankPage = () => {
    navigate('/lank');
  };

  const goToPointPage = () => {
    navigate('/point');
  };

  const goToMyPage = () => {
    navigate('/my');
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Main Page</h1>
      <div style={{ margin: '20px' }}>
        <button onClick={goToLankPage} style={buttonStyle}>
          랭킹
        </button>
      </div>
      <div style={{ margin: '20px' }}>
        <button onClick={goToPointPage} style={buttonStyle}>
          포인트
        </button>
      </div>
      <div style={{ margin: '20px' }}>
        <button onClick={goToMyPage} style={buttonStyle}>
          마이페이지
        </button>
      </div>
    </div>
  );
}

const buttonStyle = {
  padding: '10px 20px',
  fontSize: '16px',
  cursor: 'pointer',
};

export default MainPage;
