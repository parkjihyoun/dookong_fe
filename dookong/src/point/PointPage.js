import React, { useState, useEffect } from 'react';
import './PointPage.css';
import RewardItem from './RewardItem';
import StoreCategory from './StoreCategory';
import PurchaseModal from './PurchaseModal'; 
import { Link, useNavigate } from 'react-router-dom';
import groupIcon from '../assets/kong2.png';
import backVector from '../assets/vector.svg';
import kong from '../assets/kong.png';

const categories = ['전체', '🔥HOT', '편의점', '간식', '화장품'];

const PointPage = ({ className = '', ...props }) => {
  const [selectedCategory, setSelectedCategory] = useState('전체');
  const [points, setPoints] = useState(0);
  const [rewards, setRewards] = useState({
    전체: [],
    '🔥HOT': [],
    '편의점': [],
    '간식': [],
    '화장품': [],
  });
  const [memberId, setMemberId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 상태
  const [selectedReward, setSelectedReward] = useState(null); // 선택한 상품 정보
  const navigate = useNavigate();

  useEffect(() => {
    const storedUserInfo = JSON.parse(localStorage.getItem('userInfo'));
    if (storedUserInfo && storedUserInfo.memberId) {
      setMemberId(storedUserInfo.memberId);
    } else {
      navigate('/login');
    }
  }, [navigate]);

  useEffect(() => {
    if (memberId) {
      const fetchUserPoints = async () => {
        try {
          const response = await fetch(`/api/members/${memberId}`);
          const data = await response.json();
          setPoints(data.totalPoint);
        } catch (error) {
          console.error('Error fetching user points:', error);
        }
      };

      const fetchStoreItems = async () => {
        try {
          const response = await fetch('/api/items/all');
          const data = await response.json();
          const categorizedRewards = {
            전체: data,
            '🔥HOT': data.filter(item => item.category === '🔥HOT'),
            '편의점': data.filter(item => item.category === '편의점'),
            '간식': data.filter(item => item.category === '간식'),
            '화장품': data.filter(item => item.category === '화장품'),
          };
          setRewards(categorizedRewards);
        } catch (error) {
          console.error('Error fetching items:', error);
        }
      };

      fetchUserPoints();
      fetchStoreItems();
    }
  }, [memberId]);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  const handleAddPoints = () => {
    setPoints((prevPoints) => prevPoints + 10);
  };

  const handleRewardClick = (reward) => {
    setSelectedReward(reward); // 클릭한 상품 정보 저장
    setIsModalOpen(true); // 모달 열기
  };

  const handleConfirmPurchase = () => {
    console.log(`${selectedReward.title} 구매 완료`);
    setIsModalOpen(false); // 모달 닫기
  };

  const renderRewardItems = () => {
    const rewardsInCategory = rewards[selectedCategory] || [];
    if (rewardsInCategory.length === 0 && ['간식', '화장품'].includes(selectedCategory)) {
      return <div className="coming-soon">준비중입니다..</div>;
    }

    return rewardsInCategory.map((reward) => (
      <div key={reward.id} onClick={() => handleRewardClick(reward)}>
        <RewardItem
          imageSrc={reward.pictureUrl}
          name={reward.name}
          description={reward.description}
          requiredPoints={reward.requiredPoints}
        />
      </div>
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

        <div className="pointpage__actions">
          <Link to="/map" className="tomapbutton">적립하러가기</Link>
          <Link to="/allpoint" className="toallpointbutton">전체 내역</Link>
        </div>

        <div className="pointpage__info-text">
          포인트는 스토어에서 현금처럼 사용할 수 있습니다.
        </div>

        <div className="pointpage__header-frame">
          <Link to="/">
            <img className="pointpage__back-vector" src={backVector} alt="Back Vector" />
          </Link>
          <div className="pointpage__header-title">포인트</div>
          <Link to="/my">
            <img className="pointpage__point-vector" src={kong} alt="Point Vector" />
          </Link>
        </div>
      </div>

      <div className="pointpage__store-section">
        <div className="pointpage__store-title">🌱 두콩이네 상점 🌱</div>
        <div className="pointpage__rewards-grid">{renderRewardItems()}</div>
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

      {/* 구매 모달 */}
      <PurchaseModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirmPurchase}
        reward={selectedReward}
      />
    </div>
  );
};

export default PointPage;
