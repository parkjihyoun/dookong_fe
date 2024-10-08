import React from 'react';
import './Notice1.css';

const Notice1 = () => {
  return (
    <div className="notice-container">
      <h2 className="notice-title">dookong 이용 안내</h2>
      <p className="notice-content">
        고객님께 안내드립니다. dookong 서비스를 이용하실 때 아래의 사항을 참고해 주시기 바랍니다.
      </p>
      <ul className="notice-list">
        <li>서비스 이용 시 불편사항이 있을 경우 문의하기를 이용해주세요.</li>
        <li>안전한 서비스 이용을 위해 비밀번호는 주기적으로 변경하시기 바랍니다.</li>
      </ul>
    </div>
  );
}

export default Notice1;
