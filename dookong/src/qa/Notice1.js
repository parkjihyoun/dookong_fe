import React from 'react';
import './Notice1.css'; // 스타일을 따로 정의하기 위해 Notice1.css 파일을 추가합니다.

const Notice1 = () => {
  return (
    <div className="notice-container">
      <h2 className="notice-title">dookong 이용 안내</h2>
      <p className="notice-content">
        고객님께 안내드립니다. dookong 서비스를 이용하실 때 아래의 사항을 참고해 주시기 바랍니다.
      </p>
      <ul className="notice-list">
        <li>서비스 이용 시 불편사항이 있을 경우 문의하기를 이용해주세요.</li>
        <li>계정 관리는 꼭 본인 확인을 통해 진행해주세요.</li>
        <li>안전한 서비스 이용을 위해 비밀번호는 주기적으로 변경하시기 바랍니다.</li>
      </ul>
    </div>
  );
}

export default Notice1;
