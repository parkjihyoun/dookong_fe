import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ManMain.css'; // 외부 CSS 파일 불러오기
import dookongImg from '../assets/dookong.png'; // 이미지 경로 import
import plantImg from '../assets/plant.png';
import cameraImg from '../assets/camera.png';

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

          <h1>완두콩 모으러 가기</h1>
      </div>
    </div>
  );
}

export default ManMain;
