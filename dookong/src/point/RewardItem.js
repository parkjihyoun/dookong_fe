import React from 'react';
import './RewardItem.css';

const RewardItem = ({ imageSrc, groupSrc, title, description }) => {
  return (
    <div className="frame">
      <div className="group-274">
        <div className="group-273">
          <div className="kong-2">

            <img className="group" src={groupSrc} alt="Group Icon" />
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
