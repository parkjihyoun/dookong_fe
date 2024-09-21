import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ModalCheck.css';

function ModalCheck() {
  const navigate = useNavigate();
  const [beforeImage, setBeforeImage] = useState(null);
  const [afterImage, setAfterImage] = useState(null);

  // Function to get the memberId from localStorage
  const getMemberId = () => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    return userInfo ? userInfo.memberId : null;
  };

  const handleImageUpload = (event, setImage) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file); // 이미지 파일을 직접 상태로 저장
    }
  };

  const handleSubmit = () => {
    if (!beforeImage || !afterImage) {
      alert("분리수거 전후 사진을 등록해주세요.");
      return;
    }

    const memberId = getMemberId();
    if (!memberId) {
      alert("로그인이 필요합니다.");
      return;
    }

    // FormData 객체 생성
    const formData = new FormData();
    formData.append("recyclingData", JSON.stringify({
      memberId: memberId
    }));
    formData.append("beforeImage", beforeImage);
    formData.append("afterImage", afterImage);

    // API call to submit the form data
    fetch('/api/recycling/submit', {
      method: 'POST',
      body: formData, // FormData 객체 전달
    })
      .then((response) => {
        if (response.ok) {
          alert("사진이 성공적으로 등록되었습니다.");
          navigate('/some-other-page'); // 성공 시 다른 페이지로 이동
        } else {
          throw new Error('사진 등록에 실패했습니다.');
        }
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  const handleCancel = () => {
    setBeforeImage(null);
    setAfterImage(null);
    navigate(-1); // 이전 페이지로 이동
  };

  return (
    <div className="modalCheck">
      <div className="modalCheck-content">
        <h2>사진 등록하기</h2>

        <div className="image-section">
          <p>🗑️ 분리수거 전 🗑️</p>
          {beforeImage ? (
            <img src={URL.createObjectURL(beforeImage)} alt="분리수거 전" className="image-preview" />
          ) : (
            <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, setBeforeImage)} />
          )}
        </div>

        <div className="image-section">
          <p>🪴 분리수거 후 🪴</p>
          {afterImage ? (
            <img src={URL.createObjectURL(afterImage)} alt="분리수거 후" className="image-preview" />
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
