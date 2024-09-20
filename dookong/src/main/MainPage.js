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

  const goToQaPage = () => {
    navigate('/qa');
  };

  const goToMapPage = () => {
    navigate('/map');
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
      <div style={{ margin: '20px' }}>
        <button onClick={goToQaPage} style={buttonStyle}>
          고객센터
        </button>
      </div>
      <div style={{ margin: '20px' }}>
        <button onClick={goToMapPage} style={buttonStyle}>
          지도
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
