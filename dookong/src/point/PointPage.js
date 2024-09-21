import React, { useState, useEffect } from 'react';
import './PointPage.css';
import RewardItem from './RewardItem';
import StoreCategory from './StoreCategory';
import { Link, useNavigate } from 'react-router-dom';
import groupIcon from '../assets/kong2.png';
import backVector from '../assets/vector.svg';
import kong from '../assets/kong.png';

const categories = ['전체', '🔥HOT', '편의점', '간식', '화장품'];

const PointPage = ({ className = '', ...props }) => {
  const [selectedCategory, setSelectedCategory] = useState('전체');
  const [points, setPoints] = useState(0); // Default to 0 points initially
  const [rewards, setRewards] = useState({
    전체: [],
    '🔥HOT': [],
    '편의점': [],
    '간식': [],
    '화장품': [],
  });

  const [memberId, setMemberId] = useState(null);
  const navigate = useNavigate(); // 리디렉션을 위한 navigate

  useEffect(() => {
    // localStorage에서 memberId 가져오기
    const storedUserInfo = JSON.parse(localStorage.getItem('userInfo'));

    if (storedUserInfo && storedUserInfo.memberId) {
      setMemberId(storedUserInfo.memberId); // memberId 상태 설정
    } else {
      // memberId가 없으면 로그인 페이지로 리디렉션
      navigate('/login');
    }
  }, [navigate]);

  useEffect(() => {
    if (memberId) {
      // Fetch the user's points
      const fetchUserPoints = async () => {
        try {
          const response = await fetch(`/api/members/${memberId}`);
          const data = await response.json();
          setPoints(data.totalPoint); // Set the points from the fetched data
        } catch (error) {
          console.error('Error fetching user points:', error);
        }
      };

      // Fetch items for the store
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

      fetchUserPoints(); // Call the function to fetch user points
      fetchStoreItems(); // Fetch store items
    }
  }, [memberId]);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  const handleAddPoints = () => {
    setPoints((prevPoints) => prevPoints + 10);
  };

  const renderRewardItems = () => {
    const rewardsInCategory = rewards[selectedCategory] || [];
    if (rewardsInCategory.length === 0 && ['간식', '화장품'].includes(selectedCategory)) {
      return <div className="coming-soon">준비중입니다..</div>;
    }

    return rewardsInCategory.map((reward, index) => (
      <RewardItem
        key={index}
        imageSrc={reward.pictureUrl} // Use the image URL from the server
        title={`${reward.requiredPoints} 콩`}
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

        <div className="pointpage__actions">
          <div className="pointpage__button" onClick={handleAddPoints}>
            <div className="pointpage__button-text">적립하러가기</div>
          </div>
          <div className="pointpage__button-secondary">
            <div className="pointpage__button-text">전체 내역</div>
          </div>
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
    </div>
  );
};

export default PointPage;
