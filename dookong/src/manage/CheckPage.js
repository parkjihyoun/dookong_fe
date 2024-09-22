import React, { useState, useEffect } from 'react';
import './CheckPage.css';
import { useNavigate } from 'react-router-dom';

import back from '../assets/back.png';
import kong from '../assets/kong.png';
import nonekong from '../assets/nonekong.png';

const CheckPage = () => {
  const [selectedItem, setSelectedItem] = useState(null); // To handle selected item for the modal
  const [popupVisible, setPopupVisible] = useState(false); // Control modal visibility
  const [confirmationVisible, setConfirmationVisible] = useState(false); // Control confirmation popup visibility
  const [showAll, setShowAll] = useState(true);
  const [items, setItems] = useState([]); // 초기 값 비어있는 배열로 설정
  const navigate = useNavigate();

  // 컴포넌트 마운트 시, 모든 recycling 리스트를 가져옴
  useEffect(() => {
    const fetchRecyclingList = async () => {
      try {
        const response = await fetch('/api/recycling/all');
        if (!response.ok) {
          throw new Error('Failed to fetch recycling data');
        }
        const data = await response.json();
        // API에서 가져온 데이터를 items 상태에 저장
        const formattedItems = data.map((item) => ({
          id: item.recyclingId,
          name: item.member.username,
          date: item.localDateTime,
          status: item.recyclingStatus, // 상태를 직접 저장
          beforePictureUrl: item.beforePictureUrl,
          afterPictureUrl: item.afterPictureUrl,
        }));
        setItems(formattedItems);
      } catch (error) {
        console.error('Error fetching recycling data:', error);
      }
    };

    fetchRecyclingList();
  }, []);

  // Handle item click and open modal
  const handleItemClick = (item) => {
    setSelectedItem(item); // Store the selected item
    setPopupVisible(true); // Show the modal
  };

  // Close the modal
  const closeModal = () => {
    setPopupVisible(false);
    setSelectedItem(null); // Reset the selected item after closing
  };

  const toggleShowAll = () => {
    setShowAll((prev) => !prev);
  };

  // Open confirmation popup for "지급하기"
  const handleGivePoints = () => {
    setConfirmationVisible(true); // Show the confirmation popup
  };

  // Handle the confirmation popup for points
  const confirmGivePoints = async () => {
    try {
      const response = await fetch(`/api/recycling/approve/${selectedItem.id}`, {
        method: 'POST',
      });
      if (!response.ok) {
        throw new Error('Failed to approve recycling');
      }
      const updatedItems = items.map((item) =>
        item.id === selectedItem.id ? { ...item, status: 'APPROVED' } : item
      );
      setItems(updatedItems); // Update the items state
      setConfirmationVisible(false); // Close the confirmation popup
      closeModal(); // Close the main modal
    } catch (error) {
      console.error('Error approving recycling:', error);
    }
  };

  // Handle the rejection of an item
  const handleReject = async () => {
    try {
      const response = await fetch(`/api/recycling/reject/${selectedItem.id}`, {
        method: 'POST',
      });
      if (!response.ok) {
        throw new Error('Failed to reject recycling');
      }
      const updatedItems = items.map((item) =>
        item.id === selectedItem.id ? { ...item, status: 'REJECTED' } : item
      );
      setItems(updatedItems); // Update the items state
      closeModal(); // Close the main modal
    } catch (error) {
      console.error('Error rejecting recycling:', error);
    }
  };

  // Close the confirmation popup
  const closeConfirmationPopup = () => {
    setConfirmationVisible(false);
  };

  return (
    <div className="container">
      <header>
        <div className="header-back" onClick={() => navigate('/ManMain')}>
          <img src={back} alt="back" />
        </div>
        <div className="header-title">포인트관리</div>
        <div className="header-point" onClick={() => navigate('/addItem')}>
          <img src={kong} alt="kong" />
        </div>
      </header>

      <div className="buttons">
        <button className={`unchecked ${!showAll ? 'active' : ''}`} onClick={() => setShowAll(false)}>
          미확인
        </button>
        <button className={`alllist ${showAll ? 'active' : ''}`} onClick={() => setShowAll(true)}>
          전체내역
        </button>
      </div>

      <div className="list">
        {items
          .filter((item) => showAll || item.status === 'PENDING') // 거절된 항목은 미확인 리스트에서 제외
          .map((item) => (
            <div
              key={item.id}
              className={`list-item ${item.status === 'APPROVED' ? 'approved' : item.status === 'REJECTED' ? 'rejected' : 'pending'}`} // 상태에 따른 클래스 설정
              onClick={() => handleItemClick(item)} // Click to open modal
            >
              <span className="name">{item.name}</span>
              <span className="date">{new Date(item.date).toLocaleString()}</span>
              <div className="noneicon">
                <img src={item.status === 'APPROVED' ? kong : nonekong} alt="kong" />
              </div>
            </div>
          ))}
      </div>

      {/* Render modal when an item is selected */}
      {popupVisible && selectedItem && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="photo-confirmation-container" onClick={(e) => e.stopPropagation()}>
            <h2>포인트관리</h2>
            <div>
              <h4 className="photo-confirmation-title">{selectedItem.name}</h4>
              <p className="photo-confirmation-timestamp">{new Date(selectedItem.date).toLocaleString()}</p>
              <div className="photo-confirmation-images">
                <img src={selectedItem.beforePictureUrl} alt="분리수거 전" />
                <img src={selectedItem.afterPictureUrl} alt="분리수거 후" />
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
              <button className="photo-confirmation-button" onClick={handleGivePoints}>
                지급하기
              </button>
              <button className="photo-confirmation-button reject" onClick={handleReject}>
                거절하기
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Final confirmation popup for "지급하기" */}
      {confirmationVisible && (
        <div className="modal-overlay" onClick={closeConfirmationPopup}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>포인트 지급 확인</h2>
            <p>포인트를 지급하시겠습니까?</p>
            <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', marginTop: '20px' }}>
              <button className="modal-button" onClick={confirmGivePoints}>
                확인
              </button>
              <button className="modal-button" onClick={closeConfirmationPopup}>
                취소
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CheckPage;
