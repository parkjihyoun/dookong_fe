import React, { useEffect, useState } from 'react';
import { FaSearch, FaCamera, FaSyncAlt } from 'react-icons/fa';
import './MapPage.css';

// Kakao Maps API 스크립트를 동적으로 로드하는 함수
const loadKakaoMapScript = () => {
  return new Promise((resolve, reject) => {
    const existingScript = document.getElementById('kakao-map-script');
    console.log("Kakao Maps API 스크립트 로드 시작");

    if (!existingScript) {
      const script = document.createElement('script');
      script.id = 'kakao-map-script';
      script.src = "https://dapi.kakao.com/v2/maps/sdk.js?appkey=50b4341c102d1a94a471d3f4d2d6736d&autoload=false";
      script.async = true;

      script.onload = () => {
        console.log("Kakao Maps API 스크립트 로드 완료");
        if (window.kakao && window.kakao.maps) {
          window.kakao.maps.load(() => {
            console.log("Kakao Maps API 준비 완료");
            resolve();
          });
        } else {
          reject(new Error("Kakao Maps API 로드 실패"));
        }
      };

      script.onerror = () => {
        reject(new Error("Kakao Maps API 스크립트 로드 오류"));
      };

      document.head.appendChild(script);
    } else {
      console.log("Kakao Maps API 스크립트가 이미 로드됨");
      if (window.kakao && window.kakao.maps) {
        window.kakao.maps.load(() => {
          console.log("Kakao Maps API 준비 완료");
          resolve();
        });
      } else {
        reject(new Error("Kakao Maps API 로드 실패"));
      }
    }
  });
};

const KakaoMap = () => {
  const [map, setMap] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadMap = async () => {
      try {
        // Kakao Maps API 스크립트 로드
        await loadKakaoMapScript();

        // DOM 요소가 완전히 렌더링되었는지 확인
        const container = document.getElementById('map');
        console.log("지도 컨테이너:", container); // DOM 요소 존재 여부 확인
        if (!container) {
          throw new Error("지도를 표시할 컨테이너가 존재하지 않습니다.");
        }

        // 타이밍 문제 해결을 위한 테스트
        setTimeout(() => {
          const options = {
            center: new window.kakao.maps.LatLng(35.888553, 128.610584), // 경북대학교 좌표
            level: 3 // 확대 레벨
          };
          const kakaoMap = new window.kakao.maps.Map(container, options);
          console.log("지도 생성 성공");
          setMap(kakaoMap);

          // 마커 추가
          addMarkers(kakaoMap);
        }, 500); // DOM 렌더링 지연 시간 확인
      } catch (err) {
        console.error(err);
        setError(err.message);
      }
    };

    loadMap();
  }, []);

  const addMarkers = (kakaoMap) => {
    const markerPositions = [
      new window.kakao.maps.LatLng(35.888553, 128.610584),
      new window.kakao.maps.LatLng(35.889553, 128.611584),
      new window.kakao.maps.LatLng(35.887553, 128.609584)
    ];

    markerPositions.forEach(position => {
      const marker = new window.kakao.maps.Marker({
        position
      });
      marker.setMap(kakaoMap);
    });
  };

  const refreshMap = () => {
    if (map) {
      const center = new window.kakao.maps.LatLng(35.888553, 128.610584);
      map.setCenter(center);
      addMarkers(map);
    }
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <div id="map" style={{ width: '100%', height: '400px' }}></div>
      <button className="refresh-button" onClick={refreshMap}>
        <FaSyncAlt /> 새로고침
      </button>
    </>
  );
};

const MapPage = () => {
  return (
    <div className="map-page">
      <header className="map-header">
        <button className="back-button">
          &larr;
        </button>
        <h2>지도</h2>
      </header>

      <div className="search-bar">
        <FaSearch className="search-icon" />
        <input type="text" placeholder="위치를 검색하세요." className="search-input" />
      </div>

      <div className="map-container">
        <KakaoMap />
        <button className="camera-button">
          <FaCamera />
        </button>
      </div>
    </div>
  );
};

export default MapPage;
