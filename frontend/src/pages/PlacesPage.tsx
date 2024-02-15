// @ts-ignore
// @ts-nocheck

import React from 'react';
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";

import PoiMap from "../components/Places/PoiMap";
import PoiList from "../components/Places/PoiList";
import PoiDetails from "../components/Places/PoiDetails";

import GeolocationToolbar from "../components/shared/GeolocationToolbar";

import CurrentDistrictContext from "../contexts/CurrentDistrictContext";
import CurrentPositionContext from "../contexts/CurrentPositionContext";
import DistrictPoiDataContext from "../contexts/DistrictPoiDataContext";

import * as Api from "../apis/api";

// [참고사항] Leaflet.js의 Map 크기는 상위 div의 크기에 따라 상대적으로 결정되며, Tailwind CSS와 호환되지 않습니다.
//          /src/index.css 파일에서 일반 CSS 코드를 추가하여 크기를 지정해주어야 합니다.

const PlacesPage = () => {
  // 특정 POI가 선택되었는지를 확인하는 상태값입니다.
  const [selectedPoi, setSelectedPoi] = useState();

  // 자식 컴포넌트인 PoiList가 부모 컴포넌트인 PlacesPage의 selectedPoi 상태값을 변경시킬 수 있도록 state handler를 사용합니다.
  // PoiList.js를 참고하세요.
  function handleSelectedPoiState(poi) {
    setSelectedPoi(poi);
  }

  // 자식 컴포넌트인 CurrentLocation 컴포넌트로부터 오는 현재 위치 좌표를 상태값으로 사용합니다.
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");

  function handleLatLngState(currentLatitude, currentLongitude) {
    setLatitude(currentLatitude);
    setLongitude(currentLongitude);
  }

  // 사용자가 선택한 지역은 자식 컴포넌트인 CurrentDistrictSelector를 통해서 처리됩니다.
  // 자식 컴포넌트인 CurrentDistrictSelector가 부모 컴포넌트인 PlacesPage의 currentDistrict 상태값을 변경시킬 수 있도록 state handler를 사용합니다.
  // CurrentDistrictSelector.tsx를 참고하세요.
  const [currentDistrict, setCurrentDistrict] = useState("jung");

  function currentDistrictStateHandler(selectedCurrentDistrict) {
    setCurrentDistrict(selectedCurrentDistrict);
  }

  // 사용자가 선택한 특정 지역의 POI 목록을 백엔드로부터 받아 상태값으로써 저장합니다.
  const [districtPoiData, setDistrictPoiData] = useState([]);

  // 백엔드로부터 데이터를 받아오고 있는지를 체크하는 상태값입니다.
  const [isFetching, setIsFetching] = useState();

  // 백엔드로부터 데이터를 받아오다가 오류가 발생했는지를 체크하는 상태값입니다.
  const [error, setError] = useState();

  // 사용자가 선택한 행정구역 정보를 담고 있는 currentDistrict 상태값을 라우팅 파라미터인 params로써 API 요청에 반영합니다.
  const params = `${currentDistrict}`;

  // API 요청에 사용되는 endpoint를 지정해줍니다.
  const endpoint = `/api/districts/${params}/places`;

  useEffect(() => {
    const fetchDistrictPoiData = async () => {
      try {
        setIsFetching(true);
        const res = await Api.getData(endpoint);
        setDistrictPoiData(res.data);
        setIsFetching(false);
      } catch (err) {
        // 만약에 에러가 발생하게 되면 데이터 로딩 상황을 알려주는 placeholder 아래에 에러 메세지가 추가됩니다.
        setError(`${err.name} : ${err.message}`);
        alert(`An error has occured while fetching data: ${error}`);
        return;
      }
    };

    fetchDistrictPoiData();
  }, [error, currentDistrict]);

  if (isFetching || !districtPoiData || districtPoiData == []) {
    return (
      <div className="flex flex-col w-full h-full justify-center items-center">
        <p className="font-bold text-lg">Fetching data, please wait...</p>
        <p className="font-bold text-lg">{error}</p>
      </div>
    );
  }

  return (
    <DistrictPoiDataContext.Provider value={districtPoiData}>
      <div id="poi-page-wrapper" className="flex flex-col overflow-y-auto">
        <div className="flex-row">
          <GeolocationToolbar />
        </div>
        <div id="poi-content-wrapper" className="grow overflow-y-auto flex flex-row">
          <div id="poi-list" className="w-[30vw] max-h-[calc(100vh-8rem)] overflow-y-scroll scroll-smooth">
            {selectedPoi ? (
              <PoiDetails handleSelectedPoiState={handleSelectedPoiState} selectedPoi={selectedPoi} />
            ) : (
              <PoiList handleSelectedPoiState={handleSelectedPoiState} />
            )}
          </div>
          <CurrentPositionContext.Provider value={[latitude, longitude]}>
            <div id="poi-map" className="flex-1 overflow-y-auto">
              <PoiMap />
            </div>
          </CurrentPositionContext.Provider>
        </div>
      </div>
    </DistrictPoiDataContext.Provider>
  );
};

export default PlacesPage;
