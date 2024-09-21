import React, { useEffect, useState } from "react";
import "./LankPage.css";
import profileImg from "../assets/profile.png";
import kong from "../assets/kong.png";
import medal2 from "../assets/medal2.png";
import medal1 from "../assets/medal1.png";
import medal3 from "../assets/medal3.png";
import vector0 from "../assets/vector.svg";
import { Link } from "react-router-dom";

export const LankPage = ({ className, ...props }) => {
  const [topRankings, setTopRankings] = useState([]);
  const [rankings, setRankings] = useState([]);

  // API에서 랭킹 데이터를 가져오는 함수
  useEffect(() => {
    const fetchRankings = async () => {
      try {
        const response = await fetch('/api/points/all-ranking');
        const data = await response.json();

        // 상위 3명의 데이터를 topRankings에 설정
        const topThree = data.slice(0, 3).map((member, index) => ({
          rank: index + 1,
          name: member.username,
          points: member.totalPoint,
          img: profileImg,
          medal: index === 0 ? medal1 : index === 1 ? medal2 : medal3, // 1~3등 메달
        }));
        setTopRankings(topThree);

        // 나머지 랭킹 데이터를 rankings에 설정
        const remainingRankings = data.slice(3).map((member, index) => ({
          rank: index + 4, // 4등부터 시작
          name: member.username,
          points: member.totalPoint,
        }));
        setRankings(remainingRankings);
      } catch (error) {
        console.error("Failed to fetch rankings:", error);
      }
    };

    fetchRankings();
  }, []);

  return (
    <div className={`lankpage ${className}`}>
      <div className="ranking-header">
        <Link to="/my">
          <img src={vector0} alt="vector" className="vector-icon" />
        </Link>
        <h2>랭킹</h2>
        <Link to="/point">
          <img src={kong} alt="kong" className="point-icon" />
        </Link>
      </div>

      <div className="top-rankings">
        {topRankings.map(({ rank, name, points, img, medal }, index) => (
          <div key={index} className={`rank-item rank-${rank}`}>
            <div className="rank-name">{name}</div>
            <img className="profile-img" src={img} alt={name} />
            <div className="rank-points">{points} 콩</div>
            <img className="rank-medal" src={medal} alt={`medal-${rank}`} />
          </div>
        ))}
      </div>

      <div className="rankings-list">
        {rankings.map(({ rank, name, points }, index) => (
          <div key={index} className="ranking-item">
            <span className="rank-number">{rank}</span>
            <span className="rank-name">{name}</span>
            <span className="rank-points">{points} 콩</span>
          </div>
        ))}
      </div>

      <div className="pointpage">
        <Link to="/point" className="div1">포인트 쓰러가기</Link>
      </div>
    </div>
  );
};

export default LankPage;
