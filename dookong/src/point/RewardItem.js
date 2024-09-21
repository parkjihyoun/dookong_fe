import React from 'react';
import './RewardItem.css';
import GroupSrc from "../assets/kong1.svg";  // 이미지 경로 고정

const RewardItem = ({ imageSrc, name, description, requiredPoints }) => {
  return (
    <div className="frame">
      <div className="group-274">
        <div className="group-273">
          <div className="kong-2">
            <img className="group" src={GroupSrc} alt="Group Icon" />
          </div>
          <div className="title">
            {name} {/* 제목 표시 */}
          </div>
          <div className="required-points">
            {requiredPoints} 콩 {/* 몇 콩인지 표시 */}
          </div>
        </div>
        <div className="description">{description}</div>
      </div>
      <img className="item-image" src={imageSrc} alt="Item" />
    </div>
  );
};

export default RewardItem;
