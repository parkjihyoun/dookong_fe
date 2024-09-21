import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './MainPage.css'; // 외부 CSS 파일 불러오기
import dookongImg from '../assets/dookong.png'; // 이미지 경로 import
import plantImg from '../assets/plant.png';
import cameraImg from '../assets/camera.png';
import personImg from '../assets/person.png';
import questionImg from '../assets/question.png';
import gpsImg from '../assets/gps.png';
import coinImg from '../assets/coin.png';
import stairImg from '../assets/stair.png';

function MainPage() {
  const [clicked, setClicked] = useState(false);

  // useNavigate는 컴포넌트의 최상위에서 호출해야 합니다.
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

    const handleImageClick = () => {
      setClicked(true);

      setTimeout(() => {
        setClicked(false);
      }, 200); // 200 밀리초 후에 다시 원래 상태로

    };

    return (
      <div className="container">
        <div className="main-content">
          <div className="hi">
            <div className="hi-text">
              <h1>지구를 지키자 !</h1>
              <h2>dookong</h2>
            </div>
            <div className="hi-img">
              <img src={dookongImg} alt="Dookong" />
            </div>
          </div>

          <div className="points-section">
            <div className="kong-section">
              <img src={plantImg} alt="Plant" />
              <h3>누적 포인트</h3>
            </div>
            <div className="kong-info">
              <p className="points">4,750</p>
              <span className="kong">콩</span>
            </div>
          </div>

          <div className="tree-section">
            <span className="tree1">당신은 지금까지 </span>
            <span className="tree2">1</span>
            <span className="tree3">그루의 나무를 살렸어요!</span>
          </div>

          <div className="camera-section">
            <img
              src={cameraImg}
              alt="Camera"
              className={clicked ? 'clicked' : ''}
              onClick={handleImageClick}
            />
            <h1>완두콩 모으러 가기</h1>
          </div>

          <footer>
            <div className="footer-icons">
              <img onClick={goToMyPage} src={personImg} alt="personImg" />
              <img onClick={goToQaPage} src={questionImg} alt="questionImg" />
              <img onClick={goToPointPage} src={coinImg} alt="coinImg" />
              <img onClick={goToLankPage} src={stairImg} alt="stairImg" />
            </div>
          </footer>
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
}
export default MainPage;

