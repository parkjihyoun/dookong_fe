import React, { useState, useEffect } from 'react';
import './MyPage.css';

import back from '../assets/back.png';
import kong from '../assets/kong.png';
import profileimg from '../assets/profileimg.png';
import editimg from '../assets/edit.png';
import kongiconimg from '../assets/kongicon.png';
import rankiconimg from '../assets/3rd.png';
import counticonimg from '../assets/count.png';

export const MyPage = () => {
    const [nickname, setNickname] = useState('두콩이');
    const [userId, setUserId] = useState('dookong1004');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newNickname, setNewNickname] = useState('');
    const [totalPoints, setTotalPoints] = useState(4750); // 누적 포인트 상태
    const [monthlyPoints, setMonthlyPoints] = useState(1140); // 이번 달 포인트 상태
    const [usageCount, setUsageCount] = useState(475); // 이용 횟수 상태

    useEffect(() => {
      const storedUserId = localStorage.getItem('userid');
      if (storedUserId) {
        setUserId(storedUserId);
        setNickname(storedUserId);
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
        localStorage.setItem('userid', newNickname);
        closeEditModal();
      } else {
        alert('별명을 입력해주세요!');
      }
    };

    const handleGivePoints = () => {
      // 포인트와 이용 횟수를 +10 및 +1씩 증가시킴
      setTotalPoints(totalPoints + 10);
      setMonthlyPoints(monthlyPoints + 10);
      setUsageCount(usageCount + 1);
    };

    return (
      <div className="container">
        {/* 상단바 */}
        <header>
          <a href="../login.html" className="header-back">
            <img src={back} alt="back" />
          </a>
          <div className="header-title">마이페이지</div>
          <a href="../pointpage/pointpage.html" className="header-point">
            <img src={kong} alt="kong" />
          </a>
        </header>

        <div className="content">
          {/* 프로필 */}
          <div className="profile">
            <div className="icon">
              <img src={profileimg} alt="dookong" />
            </div>
            <div className="profile-info">
              <h1 id="profile-name">{nickname}</h1>
              <p id="profile-id">{userId}</p>
            </div>

            <button className="edit" onClick={openEditModal}>
              <img src={editimg} alt="edit" />
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
                <p>이번 달 포인트</p>
                <h2>{monthlyPoints} 콩</h2>
              </div>
            </div>

            <button onClick={() => (window.location.href = '../pointpage/pointpage.html')}>
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
                <h2>3 위</h2>
              </div>
            </div>
            <button onClick={() => (window.location.href = '../lankpage/lankpage.html')}>
              내 랭킹 보기
            </button>
          </div>

          {/* 이용횟수 */}
          <div className="count">
            <div className="counticon">
              <img src={counticonimg} alt="counticon" />
            </div>
            <div className="count-info">
              <p>이용 횟수</p>
              <h2>{usageCount}회</h2>
            </div>
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

        {/* 포인트 적립 버튼 */}
        <div className="bottom">
          <button onClick={handleGivePoints}>
            포인트 적립
          </button>
        </div>
      </div>
    );
  };

export default MyPage;
