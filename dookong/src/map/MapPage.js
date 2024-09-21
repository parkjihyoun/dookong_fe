import React, { useEffect, useState } from 'react';
import searchIcon from '../assets/search.png';
import { Link } from 'react-router-dom';
import back from '../assets/back.png';
import kong from '../assets/kong.png';
import './MapPage.css';
import cameraImg from '../assets/camera.png';

function KakaoMap() {
  const [map, setMap] = useState(null);
  const [places, setPlaces] = useState(null);
  const [markers, setMarkers] = useState([]); // 마커를 관리할 상태
  const [isApiReady, setIsApiReady] = useState(false); // API 준비 여부 상태 추가

  useEffect(() => {
    // Kakao 지도 API 스크립트 로드
    const loadKakaoMapScript = () => {
      return new Promise((resolve, reject) => {
        if (window.kakao && window.kakao.maps) {
          resolve(); // Kakao API가 이미 로드된 경우
        } else {
          const script = document.createElement('script');
          script.src = "https://dapi.kakao.com/v2/maps/sdk.js?appkey=50b4341c102d1a94a471d3f4d2d6736d&libraries=services";
          script.async = true;

          script.onload = () => {
            if (window.kakao && window.kakao.maps.services) {
              console.log("Kakao Maps API와 서비스 라이브러리가 성공적으로 로드되었습니다.");
              resolve();
            } else {
              reject(new Error("Kakao Maps API 로드 실패: 서비스 라이브러리가 누락되었습니다."));
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
        level: 3
      };
      const map = new window.kakao.maps.Map(container, options);
      setMap(map);

      // Kakao Places 객체 생성
      const places = new window.kakao.maps.services.Places();
      setPlaces(places);
      setIsApiReady(true); // API가 준비되었음을 상태로 설정
    };

    // 스크립트가 완전히 로드된 후에만 지도와 Places 객체 생성
    loadKakaoMapScript()
      .then(() => createMap())
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      <SearchBar map={map} places={places} markers={markers} setMarkers={setMarkers} isApiReady={isApiReady} />
      <div id="map" style={{ width: '100%', height: '500px' }}></div>
    </div>
  );
}

function SearchBar({ map, places, markers, setMarkers, isApiReady }) {
  const [query, setQuery] = useState('');

  // 기존 마커를 제거하는 함수
  const clearMarkers = () => {
    markers.forEach(marker => marker.setMap(null)); // 지도에서 마커 제거
    setMarkers([]); // 마커 상태 초기화
  };

  // Kakao Places API를 사용한 검색 함수
  const handleSearch = (searchQuery) => {
    if (!isApiReady || !places || !map) {
      alert('API가 아직 준비되지 않았습니다. 잠시 후 다시 시도하세요.');
      return;
    }

    clearMarkers(); // 기존 마커 제거

    // 장소 검색 실행
    places.keywordSearch(searchQuery, (result, status) => {
      console.log('검색 상태:', status);  // 상태 출력

      if (status === window.kakao.maps.services.Status.OK) {
        const bounds = new window.kakao.maps.LatLngBounds();

        // 검색 결과에 대한 마커 및 범위 설정
        const newMarkers = result.map(place => {
          const coords = new window.kakao.maps.LatLng(place.y, place.x);
          bounds.extend(coords);

          // 마커 생성
          const marker = new window.kakao.maps.Marker({
            map: map,
            position: coords
          });

          return marker;
        });

        setMarkers(newMarkers); // 새로 생성된 마커 저장
        map.setBounds(bounds); // 검색된 장소를 모두 보여주도록 지도 범위 설정
      } else if (status === window.kakao.maps.services.Status.ZERO_RESULT) {
        // 검색 결과가 없을 때 처리
        alert("검색 결과가 없습니다.");
        map.setCenter(new window.kakao.maps.LatLng(35.888553, 128.610584)); // 검색 실패 시 기본 좌표로 이동
      } else {
        console.error('검색 중 오류가 발생했습니다:', status);
      }
    });
  };

  // 엔터키를 눌렀을 때 검색 실행
  const onKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch(query); // 엔터키 입력 시 검색
    }
  };

  return (
    <div className="search-container">
      <input
        type="text"
        className="search-input"
        value={query}
        onChange={e => setQuery(e.target.value)}
        placeholder="위치를 검색하세요."
        onKeyDown={onKeyDown} // onKeyDown 이벤트로 엔터키 처리
      />
      <button className="search-button" onClick={() => handleSearch(query)}>
        <img src={searchIcon} alt="Search" />
      </button>
    </div>
  );
}

const Header = () => (
  <header>
    <Link to="/my" className="header-back">
      <img src={back} alt="back" />
    </Link>
    <div className="header-title">지도</div>
    <Link to="/point" className="header-point">
      <img src={kong} alt="kong" />
    </Link>
  </header>
);

function MapPage() {
  return (
    <div className="map-container">
      <Header />
      <div className="map-page">
        <KakaoMap />
      </div>
      <footer className="footer-icons">
        <Link to="/trashcheck">
          <img src={cameraImg} alt="Camera" />
        </Link>
      </footer>
    </div>
  );
}

export default MapPage;
