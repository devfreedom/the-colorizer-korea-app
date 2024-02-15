// @ts-ignore
// @ts-nocheck

import React from 'react';

import { useState, useEffect, useContext } from "react";

import PoiReview from "./PoiReview";

import * as Api from "../../apis/api";

const PoiDetails = ({ handleSelectedPoiState, selectedPoi }) => {
  function handleClick() {
    // PlacesPage에서의 selectedPoi 상태값을 소거해서, PlacesPage에서 POI 상세정보 컴포넌트 대신에 POI 목록 컴포넌트를 보여주도록 합니다.
    // POI 상세정보 창을 꺼버리는 기능으로써 작동합니다.
    handleSelectedPoiState();
  }

  // 사용자가 선택한 특정 POI의 상세정보를 백엔드로부터 받아 상태값으로써 저장합니다.
  const [selectedPoiData, setSelectedPoiData] = useState();

  // 백엔드로부터 데이터를 받아오고 있는지를 체크하는 상태값입니다.
  const [isFetching, setIsFetching] = useState();

  // 백엔드로부터 데이터를 받아오다가 오류가 발생했는지를 체크하는 상태값입니다.
  const [error, setError] = useState();

  // API 요청에 사용되는 endpoint를 지정해줍니다.
  const endpoint = "/api/places";

  // 사용자가 선택한 행정구역 정보를 담고 있는 district 상태값을 라우팅 파라미터인 params로써 API 요청에 반영합니다.
  const params = `/${selectedPoi}`;

  useEffect(() => {
    const fetchSelectedPoiData = async () => {
      try {
        setIsFetching(true);
        const res = await Api.getData(endpoint, params);
        setSelectedPoiData(res.data);
      } catch (err) {
        // 만약에 에러가 발생하게 되면 데이터 로딩 상황을 알려주는 placeholder 아래에 에러 메세지가 추가됩니다.
        setError(`${err.name} : ${err.message}`);
        alert(`An error has occured while fetching detailed POI information: ${error}`);
        return;
      } finally {
        setIsFetching(false);
      }
    };

    fetchSelectedPoiData();
  }, [error, selectedPoi]);

  if (isFetching || !selectedPoiData) {
    return (
      <div className="flex flex-col w-full h-full justify-center items-center">
        <p className="font-bold text-lg">Fetching information, please wait...</p>
        <p className="font-bold text-lg">{error}</p>
      </div>
    );
  }

/*
<h2 className="font-bold text-lg mt-3">Specialty</h2>
<div className="ml-2">
  <p><span className="mr-2">Weekdays:</span><span>{selectedPoiData.open_on_weekdays}</span></p>
  <p><span className="mr-2">Weekends:</span><span>{selectedPoiData.open_on_weekends}</span></p>
</div>
<h2 className="font-bold text-lg mt-3">Business Hours</h2>
<div className="ml-2">
  <p><span className="mr-2">Weekdays:</span><span>{selectedPoiData.open_on_weekdays}</span></p>
  <p><span className="mr-2">Weekends:</span><span>{selectedPoiData.open_on_weekends}</span></p>
</div>
<h2 className="font-bold text-lg mt-3">Transport</h2>
<div className="ml-2">
  <p><span className="mr-2">Nearby station:</span><span>{selectedPoiData.fan_count}</span></p>
</div>
<h2 className="font-bold text-lg mt-3">Contact</h2>
<div className="ml-2">
  <p><span className="mr-2">Brought to you by </span><span>{selectedPoiData.organization}</span></p>
  <p><span className="mr-2">Phone:</span><span>{selectedPoiData.phone}</span></p>
  <p><span className="mr-2">Email:</span><span>{selectedPoiData.email}</span></p>
</div>
<div className="ml-2 mt-3">
  <p><span className="mr-2 text-slate-500">Information last updated: </span><span>{selectedPoiData.last_update}</span></p>
</div>
*/

  return (
    <div className="flex flex-col">
      <div className="flex flex-row" onClick={handleClick}>
        <button className="pl-5 text-[3rem] font-bold text-3xl">⭠</button>
      </div>
      <div className="flex flex-col m-7">
        <h1 className="font-bold text-xl">{selectedPoiData.name}</h1>
        <div className="ml-2">
          <p><span className="mr-2">Address:</span><span>{selectedPoiData.address}</span></p>
          <p><span className="mr-2">Type:</span><span>{selectedPoiData.category}</span></p>
          {/*<p><span className="mr-2">Capacity:</span><span>{selectedPoiData.capacity}</span><span>명</span></p>*/}
        </div>
        <h2 className="font-bold text-lg my-3">Reviews</h2>
        <div className="">
          <PoiReview selectedPoiId={selectedPoiData.index} />
        </div>
      </div>
    </div>
  );
};

export default PoiDetails;
