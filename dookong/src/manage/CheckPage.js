import React, { useState } from 'react';
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
  const navigate = useNavigate();

  const listItems = [
    { id: 1, name: '두콩이', date: '2024.09.22 13:25:58', completed: false },
    { id: 2, name: '세콩이', date: '2024.09.22 13:15:52', completed: false },
    { id: 3, name: '네콩이', date: '2024.09.22 13:13:45', completed: false },
    { id: 4, name: '오콩이', date: '2024.09.22 13:04:25', completed: false },
    { id: 5, name: '육콩이', date: '2024.09.22 13:04:25', completed: false },
    { id: 6, name: '칠콩이', date: '2024.09.22 13:04:25', completed: false },
    { id: 7, name: '만두콩', date: '2024.09.22 13:04:25', completed: false },
    { id: 8, name: '콩콩이', date: '2024.09.22 13:04:25', completed: false }
  ];

  const [items, setItems] = useState(listItems);

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
  const confirmGivePoints = () => {
    const updatedItems = items.map((item) =>
      item.id === selectedItem.id ? { ...item, completed: true } : item
    );
    setItems(updatedItems);
    setConfirmationVisible(false); // Close the confirmation popup
    closeModal(); // Close the main modal
  };

  // Close the confirmation popup
  const closeConfirmationPopup = () => {
    setConfirmationVisible(false);
  };

  // Handle rejection by closing the modal and navigating back to the check page
  const handleReject = () => {
    closeModal(); // Close the modal
    navigate('/checkpage'); // Navigate back to the CheckPage
  };

  return (
    <div className="container">
      <header>
        <div className="header-back" onClick={() => navigate('/my')}>
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
          .filter((item) => (showAll ? true : !item.completed))
          .map((item) => (
            <div
              key={item.id}
              className={`list-item ${item.completed ? 'completed' : ''}`}
              onClick={() => handleItemClick(item)} // Click to open modal
            >
              <span className="name">{item.name}</span>
              <span className="date">{item.date}</span>
              <div className="noneicon">
                <img src={item.completed ? kong : nonekong} alt="kong" />
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
                <img src="some_image_url" alt="분리수거 전" /> {/* Replace with actual image */}
                <img src="some_image_url" alt="분리수거 후" /> {/* Replace with actual image */}
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
