import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // useNavigate 훅 import
import './AllPoint.css';

function AllPoint({ showModal, onClose }) {
  const [pointsData, setPointsData] = useState({ earned: [], used: [] });
  const navigate = useNavigate(); // useNavigate 훅 사용

  // Simulating fetching data (You should replace this with your API call)
  useEffect(() => {
    const fetchPointsData = () => {
      const dummyData = {
        earned: [
          { date: '2024-09-01', points: 10, description: '분리수거 완료' },
          { date: '2024-09-05', points: 10, description: '분리수거 완료' },
          { date: '2024-09-06', points: 10, description: '분리수거 완료' },
          { date: '2024-09-05', points: 10, description: '분리수거 완료' },
          { date: '2024-09-09', points: 10, description: '분리수거 완료' },
        ],
        used: [
          { date: '2024-09-10', points: -800, rewardItem: 'cu상품권', description: '' },
          { date: '2024-09-12', points: -18000, rewardItem: '치킨상품권', description: '' },
        ],
      };

      dummyData.used = dummyData.used.map((item) => {
        if (item.rewardItem) {
          return {
            ...item,
            description: `${item.rewardItem} 구매`,
          };
        }
        return item;
      });

      setPointsData(dummyData);
    };

    fetchPointsData();
  }, []);

  const handleCloseModal = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
      navigate('/point'); // 모달이 닫힐 때 /point로 이동
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
            {pointsData.earned.map((item, index) => (
              <div key={index}>
                <span>{item.date}</span>
                <span>+{item.points} 콩</span>
                <span>{item.description}</span>
              </div>
            ))}
          </div>
        </div>

        <h2>포인트 사용내역</h2>
        <div className="points-section">
          <div className="pointminus">
            {pointsData.used.map((item, index) => (
              <div key={index}>
                <span>{item.date}</span>
                <span>{item.points} 콩</span>
                <span>{item.description}</span>
              </div>
            ))}
          </div>
        </div>

        <button className="modal-close-btn" onClick={() => {
          onClose();
          navigate('/point'); 
        }}>
          닫기
        </button>
      </div>
    </div>
  );
}

export default AllPoint;
