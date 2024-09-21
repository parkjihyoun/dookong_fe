import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ManMain.css'; // 외부 CSS 파일 불러오기
import dookongImg from '../assets/dookong.png'; // 이미지 경로 import
import plantImg from '../assets/plant.png';
import manpointImg from '../assets/manpoint.png';
import arrowImg from '../assets/arrow.png';

function ManMain() {
  const [manClicked, setManClicked] = useState(false); // useState 이름 변경
  
  // useNavigate는 컴포넌트의 최상위에서 호출해야 합니다.
  const manNavigate = useNavigate(); // useNavigate 이름 변경

  const handleManImageClick = () => { // handleImageClick 이름 변경
    setManClicked(true);

    setTimeout(() => {
      setManClicked(false);
    }, 200); // 200 밀리초 후에 다시 원래 상태로
    
  };

  return (
    <div className="man-container">
      <div className="man-main-content">
        <div className="man-hi">
          <div className="man-hi-text">
            <h1>지구를 지키자 !</h1>
            <h2>dookong</h2>
          </div>
          <div className="man-hi-img">
            <img src={dookongImg} alt="Dookong" />
          </div>
        </div>

        <div className="manpoints-section">
          <div className="mankong-section">
            <img src={plantImg} alt="Plant" />
          </div>
            <p className="manpoints">관리자 페이지</p>
        </div>
        <div className="manpoints-section2">
        <img 
            src={manpointImg} 
            alt="manpoint" 
            className={manClicked ? 'clicked' : ''} // 클릭 상태에 따라 클래스 적용
            onClick={handleManImageClick} // 클릭 이벤트 핸들러 추가
          />
          </div>
          <div className="manpoints-section3">
            <img src={arrowImg} alt='arrow'></img>
            <h1>포인트 관리</h1>
          </div>
      </div>
    </div>
  );
}

export default ManMain;
