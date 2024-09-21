import React from 'react';
import './ImgCheck.css';

const ImgCheck = ({ imageUrl, title, timestamp, openPopup }) => {
  return (
    <div className="photo-confirmation-container">
      <h2>포인트관리</h2>
      <div>
        <h4 className="photo-confirmation-title">{title}</h4>
        <p className="photo-confirmation-timestamp">{new Date(timestamp).toLocaleString()}</p>
        <div className="photo-confirmation-images">
          <img src={imageUrl} alt="분리수거 전" />
          <img src={imageUrl} alt="분리수거 후" />
        </div>
      </div>
      <button className="photo-confirmation-button" onClick={openPopup}>
        지급하기
      </button>
    </div>
  );
};

export default ImgCheck;
