import React from 'react';
import './RewardItem.css';
import GroupSrc from "../assets/kong1.svg";  
const RewardItem = ({ imageSrc, title, description }) => {
  return (
    <div className="frame">
      <div className="group-274">
        <div className="group-273">
          <div className="kong-2">

            <img className="group" src={GroupSrc} alt="Group Icon" />

          </div>
          <div className="title">{title}</div>
        </div>
        <div className="description">{description}</div>
      </div>
      <img className="item-image" src={imageSrc} alt="Item" />
    </div>
  );
};

export default RewardItem;
