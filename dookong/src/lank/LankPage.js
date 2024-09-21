import React from "react";
import "./LankPage.css";
import profileImg from "../assets/profile.png";
import kong from "../assets/kong.png";
import medal2 from "../assets/medal2.png";
import medal1 from "../assets/medal1.png";
import medal3 from "../assets/medal3.png";
import vector0 from "../assets/vector.svg";
import { Link } from "react-router-dom";  

export const LankPage = ({ className, ...props }) => {
  const topRankings = [
    { rank: 1, name: "네콩이", points: 1270, img: profileImg, medal: medal1 },
    { rank: 2, name: "콩콩콩", points: 1150, img: profileImg, medal: medal2 },
    { rank: 3, name: "두콩이", points: 1140, img: profileImg, medal: medal3 },
  ];

  const rankings = [
    { rank: 4, name: "강두콩", points: 1120 },
    { rank: 5, name: "완두콩", points: 1116 },
    { rank: 6, name: "만두콩", points: 1100 },
    { rank: 7, name: "오콩이", points: 1080 },
  ];

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