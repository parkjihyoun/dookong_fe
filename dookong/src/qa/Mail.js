import React from 'react';
import './Mail.css'; // 스타일을 따로 정의하기 위해 Notice1.css 파일을 추가합니다.

const Mail = () => {
  return (
    <div className="notice-container">
      <h2 className="notice-title">관리자에게 문의하기</h2>
      <p className="notice-content">
        궁금하신 점이 있으시면 문의해주세요.<br /><br />
        <strong>email : dookong@gmail.com</strong>
      </p>
    </div>
  );
}

export default Mail;
