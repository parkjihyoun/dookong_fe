import React, { useState } from 'react';
import './PointPage.css';
import RewardItem from './RewardItem';
import StoreCategory from './StoreCategory';
import { Link } from 'react-router-dom';

import groupIcon from '../assets/kong2.png';
import backVector from '../assets/vector.svg';
import group1 from '../assets/kong1.svg';
import group2 from '../assets/kong1.svg';
import group3 from '../assets/kong1.svg';
import group4 from '../assets/kong1.svg';

import cuImage from '../assets/cu.png';
import naverImage from '../assets/naver.png';
import lotteImage from '../assets/lotte.png';
import gs25Image from '../assets/gs25.png';

const categories = ['전체', '🔥HOT', '편의점', '간식', '화장품'];

const initialRewards = {
  전체: [
    { imageSrc: cuImage, groupSrc: group1, title: "4,800 콩", description: "CU 모바일 상품권\n5천원권" },
    { imageSrc: naverImage, groupSrc: group2, title: "800 콩", description: "NAVER 모바일 쿠폰\n1천 포인트" },
    { imageSrc: lotteImage, groupSrc: group3, title: "28,000 콩", description: "롯데 모바일 상품권\n3만원권" },
    { imageSrc: gs25Image, groupSrc: group4, title: "9,800 콩", description: "GS25 모바일 상품권\n1만원권" },
  ],
  '편의점': [
    { imageSrc: cuImage, groupSrc: group1, title: "4,800 콩", description: "CU 모바일 상품권\n5천원권" },
    { imageSrc: naverImage, groupSrc: group2, title: "800 콩", description: "NAVER 모바일 쿠폰\n1천 포인트" },
    { imageSrc: gs25Image, groupSrc: group4, title: "9,800 콩", description: "GS25 모바일 상품권\n1만원권" },
  ],
  '🔥HOT': [
    { imageSrc: lotteImage, groupSrc: group3, title: "28,000 콩", description: "롯데 모바일 상품권\n3만원권" },
    { imageSrc: cuImage, groupSrc: group1, title: "4,800 콩", description: "CU 모바일 상품권\n5천원권" },
  ],
  '간식': [],
  '화장품': [],
};

const PointPage = ({ className = '', ...props }) => {
  const [selectedCategory, setSelectedCategory] = useState('전체');
  const [points, setPoints] = useState(4750); // Starting with 4750 points

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  const handleAddPoints = () => {
    setPoints(prevPoints => prevPoints + 10);
  };

  const renderRewardItems = () => {
    const rewards = initialRewards[selectedCategory] || [];
    if (rewards.length === 0 && ['간식', '화장품'].includes(selectedCategory)) {
      return (
        <div className="coming-soon">
          준비중입니다..
        </div>
      );
    }

    return rewards.map((reward, index) => (
      <RewardItem
        key={index}
        imageSrc={reward.imageSrc}
        groupSrc={reward.groupSrc}
        title={reward.title}
        description={reward.description}
      />
    ));
  };

  return (
    <div className={`pointpage ${className}`} {...props}>

      
      <div className="pointpage__header">
        <div className="pointpage__background"></div>
        <div className="pointpage__points-frame">
          <div className="pointpage__points">{points}</div>
          <div className="pointpage__unit">콩</div>
          <img className="pointpage__icon" src={groupIcon} alt="Group Icon" />
        </div>

        {/* 버튼 */}
        <div className="pointpage__actions">
          <div className="pointpage__button" onClick={handleAddPoints}>
            <div className="pointpage__button-text">적립하러가기</div>
          </div>
          <div className="pointpage__button-secondary">
            <div className="pointpage__button-text">전체 내역</div>
          </div>
        </div>

        {/* 알림 */}
        <div className="pointpage__info-text">
          포인트는 스토어에서 현금처럼 사용할 수 있습니다.
        </div>

        {/* 포인트 */}
        <div className="pointpage__header-frame">
          <div className="pointpage__header-title">포인트</div>
          <Link to="/">
          <img className="pointpage__back-vector" src={backVector} alt="Back Vector" />
          </Link>
        </div>
      </div>

      {/* 상점 */}
      <div className="pointpage__store-section">
        <div className="pointpage__store-title">🌱 두콩이네 상점 🌱</div>
        <div className="pointpage__rewards-grid">
          {renderRewardItems()}
        </div>
        <div className="pointpage__categories">
          {categories.map((category, index) => (
            <StoreCategory
              key={index}
              label={category}
              isSelected={selectedCategory === category}
              onClick={() => handleCategoryClick(category)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PointPage;
