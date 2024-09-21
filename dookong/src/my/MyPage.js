import React, { useState, useEffect } from 'react';
import './MyPage.css';
import { Link, useNavigate } from 'react-router-dom'; // useNavigate 추가

import back from '../assets/back.png';
import kong from '../assets/kong.png';
import profileimg from '../assets/profileimg.png';
import logouticon from '../assets/logouticon.png';
import kongiconimg from '../assets/kongicon.png';
import rankiconimg from '../assets/3rd.png';

export const MyPage = () => {
  const [nickname, setNickname] = useState('두콩이');
  const [userId, setUserId] = useState('dookong1004');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newNickname, setNewNickname] = useState('');
  const [totalPoints, setTotalPoints] = useState(0); // 누적 포인트 상태
  const [monthlyPoints, setMonthlyPoints] = useState(0); // 이번 달 포인트 상태
  const [rank, setRank] = useState(0); // 사용자 순위 상태

  const navigate = useNavigate(); // useNavigate 훅 사용

  // 로컬 스토리지에서 사용자 정보 가져오기 및 API 호출
  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));

    if (userInfo) {
      setNickname(userInfo.username); // userInfo에서 사용자 이름 설정
      setUserId(userInfo.email); // userInfo에서 이메일 설정
      setTotalPoints(userInfo.totalPoints);
      const memberId = userInfo.memberId;

      // 이번 달 포인트 가져오기
      fetch(`/api/points/monthly/${memberId}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error('Failed to fetch monthly points');
          }
          return response.json();
        })
        .then((data) => {
          if (typeof data === 'number') {
            setMonthlyPoints(data); // 이번 달 포인트 설정
          } else {
            console.error('Unexpected data format:', data);
          }
        })
        .catch((error) => console.error('Error fetching monthly points:', error));

      // 사용자 순위 가져오기
      fetch(`/api/points/monthly-ranking/${memberId}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error('Failed to fetch ranking');
          }
          return response.json();
        })
        .then((data) => {
          if (typeof data === 'number') {
            setRank(data); // 순위 설정
          } else {
            console.error('Unexpected data format:', data);
          }
        })
        .catch((error) => console.error('Error fetching ranking:', error));
    }
  }, []);

  const openEditModal = () => {
    setIsModalOpen(true);
  };

  const closeEditModal = () => {
    setIsModalOpen(false);
  };

  const saveNickname = () => {
    if (newNickname) {
      setNickname(newNickname);
      const userInfo = JSON.parse(localStorage.getItem('userInfo'));
      userInfo.username = newNickname;
      localStorage.setItem('userInfo', JSON.stringify(userInfo)); // 로컬 스토리지에 업데이트된 사용자 정보 저장
      closeEditModal();
    } else {
      alert('별명을 입력해주세요!');
    }
  };

  const handleGivePoints = () => {
    // 포인트와 이용 횟수를 +10 및 +1씩 증가시킴
    setTotalPoints(totalPoints + 10);
    setMonthlyPoints(monthlyPoints + 10);
  };

  // 로그아웃 함수 추가
  const handleLogout = () => {
    // localStorage에서 사용자 정보 제거
    localStorage.removeItem('userInfo');
  
    // 로그아웃 후 홈 페이지로 리디렉션
    navigate('/login');
  };

  return (
    <div className="my-container">
      {/* 상단바 */}
      <div className="myheader">
        <Link to="/" className="header-back">
          <img src={back} alt="back" />
        </Link>
        <div className="header-title">마이페이지</div>
        <Link to="/my" className="header-point">
          <img src={kong} alt="kong" />
        </Link>
      </div>

      <div className="my-content">
        {/* 프로필 */}
        <div className="my-profile">
          <div className="my-icon">
            <img src={profileimg} alt="dookong" />
          </div>
          <div className="profile-info">
            <h1 id="profile-name">{nickname}</h1>
            <p id="profile-id">{userId}</p>
          </div>

          <button className="logouticon" onClick={handleLogout}>
            <img src={logouticon} alt="logouticon" />
          </button>
        </div>

        {/* 포인트 */}
        <div className="point">
          {/* 누적포인트 */}
          <div className="total-point">
            <div className="kongicon">
              <img src={kongiconimg} alt="kongicon" />
            </div>
            <div className="total-info">
              <p>내 누적 포인트</p>
              <h2>{totalPoints} 콩</h2>
            </div>
          </div>

          {/* 이달의 포인트 */}
          <div className="monthly-point">
            <div className="kongicon">
              <img src={kongiconimg} alt="kongicon" />
            </div>
            <div className="monthly-info">
              <p>이달의 포인트</p>
              <h2>{monthlyPoints} 콩</h2>
            </div>
          </div>

          {/* 내 포인트 보기 버튼 */}
          <button onClick={() => navigate('/point')}>
            내 포인트 보기
          </button>
        </div>

        {/* 랭킹 */}
        <div className="rank">
          <div className="rank-text">
            <div className="rankicon">
              <img src={rankiconimg} alt="rankicon" />
            </div>
            <div className="rank-info">
              <p>내 순위</p>
              <h2>{rank} 위</h2>
            </div>
          </div>

          {/* 내 랭킹 보기 버튼 */}
          <button onClick={() => navigate('/lank')}>
            내 랭킹 보기
          </button>
        </div>

        {isModalOpen && (
          <>
            <div id="modal-overlay" className="modal-overlay" style={{ display: 'block' }} onClick={closeEditModal}></div>
            <div id="edit-modal" className="modal">
              <div className="modal-content">
                <h2>별명 바꾸기</h2>
                <div>
                  <label htmlFor="current-nickname">기존 별명</label>
                  <input type="text" id="current-nickname" value={nickname} disabled />
                </div>
                <div>
                  <label htmlFor="nickname-input">새 별명</label>
                  <input
                    type="text"
                    id="nickname-input"
                    placeholder="새 별명 입력"
                    value={newNickname}
                    onChange={(e) => setNewNickname(e.target.value)}
                  />
                </div>
                <div style={{ display: 'flex', gap: '10px', width: '100%' }}>
                  <button className="modal-button cancel" onClick={closeEditModal}>
                    취소
                  </button>
                  <button className="modal-button save" onClick={saveNickname}>
                    저장
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default MyPage;
