import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import back from '../assets/back.png';
import kong from '../assets/kong.png';
import cameraImg from '../assets/camera.png';
import './MapPage.css';

function KakaoMap() {
  const [map, setMap] = useState(null);
  const [markers, setMarkers] = useState([]); // 마커를 관리할 상태
  const [isApiReady, setIsApiReady] = useState(false); // API 준비 여부 상태 추가

  useEffect(() => {
    const loadKakaoMapScript = () => {
      return new Promise((resolve, reject) => {
        if (window.kakao && window.kakao.maps) {
          resolve();
        } else {
          const script = document.createElement('script');
          script.src = "https://dapi.kakao.com/v2/maps/sdk.js?appkey=50b4341c102d1a94a471d3f4d2d6736d&libraries=services";
          script.async = true;

          script.onload = () => {
            if (window.kakao && window.kakao.maps.services) {
              resolve();
            } else {
              reject(new Error("Kakao Maps API 로드 실패"));
            }
          };

          script.onerror = () => reject(new Error("Kakao Maps API 로드 실패"));
          document.head.appendChild(script);
        }
      });
    };

    const createMap = () => {
      const container = document.getElementById('map');
      const options = {
        center: new window.kakao.maps.LatLng(35.888553, 128.610584), // 경북대학교 좌표
        level: 3,
      };
      const map = new window.kakao.maps.Map(container, options);
      setMap(map);

      // 분리수거통 위치 가져오기
      fetch('/api/recycle-bins')
        .then((response) => response.json())
        .then((data) => {
          if (data.length === 0) {
            console.warn("No recycle bin data found.");
            return;
          }

          // 기존 마커 제거
          markers.forEach(marker => marker.setMap(null));
          setMarkers([]);

          const newMarkers = data.map((bin) => {
            const coords = new window.kakao.maps.LatLng(bin.latitude, bin.longitude);

            // 마커 생성
            const marker = new window.kakao.maps.Marker({
              position: coords,
              title: `쓰레기통 ID: ${bin.recycleBinId}`, // 마커 타이틀로 ID 표시
            });

            marker.setMap(map); // 마커를 지도에 추가
            return marker;
          });

          // 마커 상태 업데이트
          setMarkers(newMarkers);
        })
        .catch((err) => console.error('Failed to load recycle bins:', err));
    };

    loadKakaoMapScript()
      .then(() => createMap())
      .catch((err) => console.error(err));
  }, []);

  return <div id="map" style={{ width: '100%', height: '500px' }}></div>;
}

const Header = () => (
  <div className="mapheader">
    <Link to="/" className="header-back">
      <img src={back} alt="back" />
    </Link>
    <div className="header-title">지도</div>
    <Link to="/my" className="header-point">
      <img src={kong} alt="kong" />
    </Link>
  </div>
);

const CameraButton = () => (
  <Link to="/trashcheck" className="camera-link">
    <img src={cameraImg} alt="Camera" className="camera-icon" />
  </Link>
);

function MapPage() {
  return (
    <div className="map-container">
      <Header />
      <div className="map-page">
        <CameraButton />
        <KakaoMap />
      </div>
    </div>
  );
}

export default MapPage;
