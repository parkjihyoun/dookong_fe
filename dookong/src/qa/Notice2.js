import React from 'react';
import './Notice2.css'; // 스타일을 따로 정의하기 위해 Notice1.css 파일을 추가합니다.

const Notice2 = () => {
  return (
    <div className="notice-container">
      <h2 className="notice-title">서비스 점검 안내</h2>
      <p className="notice-content">
        dookong 서비스가 점검중입니다.
      </p>
    </div>
  );
}

export default Notice2;
