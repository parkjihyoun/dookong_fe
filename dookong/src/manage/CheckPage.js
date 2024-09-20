import React, { useState } from 'react';
import './CheckPage.css';
import { useNavigate } from 'react-router-dom';

import back from '../assets/back.png';
import kong from '../assets/kong.png';
import nonekong from '../assets/nonekong.png';

const CheckPage = () => {
  const [popupVisible, setPopupVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
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

  const handleItemClick = (item) => {
    setSelectedItem(item);
    setPopupVisible(true);
  };

  const handleGivePoints = () => {
    const updatedItems = items.map((item) =>
      item.id === selectedItem.id ? { ...item, completed: true } : item
    );
    setItems(updatedItems);
    setPopupVisible(false);
  };

  const handleClosePopup = () => {
    setPopupVisible(false);
  };

  const toggleShowAll = () => {
    setShowAll((prev) => !prev);
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
        <button className={`unchecked ${!showAll ? 'active' : ''}`} onClick={() => { setShowAll(false); }}>
          미확인
        </button>
        <button className={`alllist ${showAll ? 'active' : ''}`} onClick={() => { setShowAll(true); }}>
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
              onClick={() => handleItemClick(item)}
            >
              <span className="name">{item.name}</span>
              <span className="date">{item.date}</span>
              <div className="noneicon">
                <img
                  src={item.completed ? kong : nonekong}
                  alt="kong"
                />
              </div>
            </div>
          ))}
      </div>

      {popupVisible && (
        <>
          <div id="modal-overlay" className="modal-overlay" onClick={handleClosePopup}></div>
          <div id="edit-modal" className="modal">
            <div className="modal-content">
              <h2>포인트 지급</h2>
              <p>포인트를 지급하시겠습니까?</p>
              <div style={{ display: 'flex', gap: '10px', width: '100%' }}>
                <button className="modal-button cancel" onClick={handleClosePopup}>
                  닫기
                </button>
                <button className="modal-button save" onClick={handleGivePoints}>
                  포인트 지급
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CheckPage;
