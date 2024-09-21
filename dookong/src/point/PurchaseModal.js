import React, { useState } from 'react';
import './PurchaseModal.css';

const PurchaseModal = ({ isOpen, onClose, onConfirm, reward, totalPoints }) => {
  const [errorMessage, setErrorMessage] = useState('');

  if (!isOpen) return null;

  const handlePurchase = () => {
    if (totalPoints < reward.requiredPoints) {
      setErrorMessage('콩이 부족해요!');
    } else {
      console.log('구매하려는 상품 ID:', reward.id); // 로그로 확인
      onConfirm(); // 구매 로직 실행
      setErrorMessage('');
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>💰 구매 💰</h2>
        <p>{reward.name} 을(를) <br /> <b>{reward.requiredPoints}</b> 포인트로 구매하시겠습니까?</p>
        {errorMessage && <p className="error-message">{errorMessage}</p>} {/* 에러 메시지 출력 */}
        <div className="modal-actions">
          <button className="confirm-button" onClick={handlePurchase}>구매</button>
          <button className="cancel-button" onClick={onClose}>취소</button>
        </div>
      </div>
    </div>
  );
};

export default PurchaseModal;
