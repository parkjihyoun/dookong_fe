import React, { useState, useEffect } from 'react';
import './AllPoint.css';

function AllPoint({ showModal, onClose }) {
  const [pointsData, setPointsData] = useState({ earned: [], used: [] });

  // API를 통해 로그인된 유저의 포인트 사용 내역 가져오기
  useEffect(() => {
    const fetchPointsData = async () => {
      try {
        // localStorage에서 memberId 가져오기
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));
        const memberId = userInfo?.memberId;

        if (!memberId) {
          console.error("Member ID가 존재하지 않습니다.");
          return;
        }

        const response = await fetch(`/api/points/all/${memberId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch points data');
        }

        const data = await response.json();

        // 적립 내역과 사용 내역을 구분하여 pointsData에 저장
        const earned = data.filter((item) => item.pointValue > 0);
        const used = data.filter((item) => item.pointValue < 0);

        setPointsData({
          earned,
          used,
        });
      } catch (error) {
        console.error('Error fetching points data:', error);
      }
    };

    fetchPointsData();
  }, []);

  const handleCloseModal = (e) => {
    if (e.target.className === 'modal-overlay') {
      onClose();
    }
  };

  if (!showModal) return null;

  return (
    <div className="modal-overlay" onClick={handleCloseModal}>
      <div className="modal-content">
        <h1 style={{ fontSize: '2em', marginBottom: '20px' }}>전체 내역</h1>

        <h2>포인트 적립내역</h2>
        <div className="points-section">
          <div className="pointplus">
            {pointsData.earned.length > 0 ? (
              pointsData.earned.map((item, index) => (
                <div key={index}>
                  <span>{new Date(item.date).toLocaleDateString()}</span>
                  <span>+{item.pointValue} 콩</span>
                  <span>{item.description}</span>
                </div>
              ))
            ) : (
              <p>포인트 적립 내역이 없습니다.</p>
            )}
          </div>
        </div>

        <h2>포인트 사용내역</h2>
        <div className="points-section">
          <div className="pointminus">
            {pointsData.used.length > 0 ? (
              pointsData.used.map((item, index) => (
                <div key={index}>
                  <span>{new Date(item.date).toLocaleDateString()}</span>
                  <span>{item.pointValue} 콩</span>
                  <span>{item.description}</span>
                </div>
              ))
            ) : (
              <p>포인트 사용 내역이 없습니다.</p>
            )}
          </div>
        </div>

        <button className="modal-close-btn" onClick={onClose}>
          닫기
        </button>
      </div>
    </div>
  );
}

export default AllPoint;
