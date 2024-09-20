import React from 'react';
import './StoreCategory.css';

const StoreCategory = ({ label, isSelected, onClick }) => {
  return (
    <div className="group-tab" onClick={onClick}>
      <div className={`rectangle-tab ${isSelected ? "selected" : "unselected"}`}>
        <div className={isSelected ? "selected" : "unselected"}>{label}</div>
      </div>
    </div>
  );
};

export default StoreCategory;
