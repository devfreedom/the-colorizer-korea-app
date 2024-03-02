// @ts-ignore
// @ts-nocheck

import { useState } from 'react';

import CurrentDistrictSelector from './CurrentDistrictSelector'
import CurrentPosition from './CurrentPosition'

function GeolocationToolbar({handleCurrentDistrictState, currentRegion, currentDistrict}) {

  // 현재 위치 좌표를 저장하는 상태값입니다.
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");

  // 자식 컴포넌트인 CurrentPosition으로 내려보낼 state handler입니다.
  function handleLatLngState(currentLatitude, currentLongitude) {
    setLatitude(currentLatitude);
    setLongitude(currentLongitude);
  }
  
  return (
    <div className="flex flex-row justify-between items-center h-8 px-8 mb-3 relative">
      <CurrentDistrictSelector handleCurrentDistrictState={handleCurrentDistrictState} currentRegion={currentRegion} currentDistrict={currentDistrict}/>
      <CurrentPosition handleLatLngState={handleLatLngState}/>
    </div>
  );
}

export default GeolocationToolbar;