import React, { useState, useEffect } from 'react'; // useEffect 추가
import { Link, useNavigate } from 'react-router-dom'; // useNavigate 추가
import './MainPage.css';
import dookongImg from '../assets/dookong.png'; // 이미지 경로 import
import plantImg from '../assets/plant.png';
import cameraImg from '../assets/camera.png';
import personImg from '../assets/person.png';
import questionImg from '../assets/question.png';
import gpsImg from '../assets/gps.png';
import coinImg from '../assets/coin.png';
import stairImg from '../assets/stair.png';

function MainPage() {
  const [points, setPoints] = useState(0); // Default to 0 points initially
  const [memberId, setMemberId] = useState(null);

  // 1000 포인트당 1 그루의 나무를 살렸다고 계산
  const treesSaved = Math.floor(points / 1000);

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
  };

  useEffect(() => {
    // localStorage에서 memberId 가져오기
    const storedUserInfo = JSON.parse(localStorage.getItem('userInfo'));

    if (storedUserInfo && storedUserInfo.memberId) {
      setMemberId(storedUserInfo.memberId); // memberId 상태 설정
    } else {
      // memberId가 없으면 로그인 페이지로 리디렉션
      navigate('/login');
    }
  }, [navigate]);

  useEffect(() => {
    if (memberId) {
      // Fetch the user's points
      const fetchUserPoints = async () => {
        try {
          const response = await fetch(`/api/members/${memberId}`);
          const data = await response.json();
          setPoints(data.totalPoint); // Set the points from the fetched data
        } catch (error) {
          console.error('Error fetching user points:', error);
        }
      };

      fetchUserPoints(); // Call the function to fetch user points
    }
  }, [memberId]);

  return (
    <div className="main-container">
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
            <p className="points">{points}</p>
            <span className="kong">콩</span>
          </div>
        </div>

        <div className="tree-section">
          <span className="tree1">당신은 지금까지 </span>
          <span className="tree2">{treesSaved}</span>
          <span className="tree3">그루의 나무를 살렸어요!</span>
        </div>

        <div className="camera-section">
          <Link to="/trashcheck" className="camera-link">
            <img src={cameraImg} alt="Camera" className="camera-icon" />
          </Link>
          <h1>완두콩 모으러 가기</h1>
        </div>

        <footer>
          <div className="main-footer-icons">
            <img onClick={goToMyPage} src={personImg} alt="personImg" />
            <img onClick={goToPointPage} src={coinImg} alt="coinImg" />
            <img onClick={goToMapPage} src={gpsImg} alt="gpsImg" />
            <img onClick={goToLankPage} src={stairImg} alt="stairImg" />
            <img onClick={goToQaPage} src={questionImg} alt="questionImg" />
          </div>
        </footer>
      </div>
    </div>
  );
}

export default MainPage;