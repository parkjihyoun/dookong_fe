import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ModalCheck.css';

function ModalCheck() {
  const navigate = useNavigate();
  const [beforeImage, setBeforeImage] = useState(null);
  const [afterImage, setAfterImage] = useState(null);

  const handleImageUpload = (event, setImage) => {
    const file = event.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file)); // Create a temporary URL for the image
    }
  };

  const handleSubmit = () => {
    if (!beforeImage || !afterImage) {
      alert("분리수거 전후 사진을 등록해주세요.");
    } else {
      alert("사진이 성공적으로 등록되었습니다.");
      navigate('/some-other-page'); // 제출후에 맵페이지로 가야돼
    }
  };

  const handleCancel = () => {
    setBeforeImage(null);
    setAfterImage(null);
    navigate(-1); //이전페이지로
  };

  return (
    <div className="modalCheck">
      <div className="modalCheck-content">
        <h2>사진 등록하기</h2>

        <div className="image-section">
          <p>🗑️ 분리수거 전 🗑️</p>
          {beforeImage ? (
            <img src={beforeImage} alt="분리수거 전" className="image-preview" />
          ) : (
            <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, setBeforeImage)} />
          )}
        </div>

        <div className="image-section">
          <p>🪴 분리수거 후 🪴</p>
          {afterImage ? (
            <img src={afterImage} alt="분리수거 후" className="image-preview" />
          ) : (
            <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, setAfterImage)} />
          )}
        </div>

        <div className="modalCheck-buttons">
          <div className="modalCheck-button submit-button" onClick={handleSubmit}>
            등록하기
          </div>
          <div className="modalCheck-button cancel-button" onClick={handleCancel}>
            취소
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModalCheck;
