// @ts-ignore
// @ts-nocheck

import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { getData } from '../../apis/api';

import PoiItem from './PoiItem'
import DistrictPoiDataContext from '../../contexts/DistrictPoiDataContext';

// PlacesPage로부터 전달받은 handleSelectedPoiState를 PoiItem까지 prop drilling 합니다.

const PoiList = ({handleSelectedPoiState}) => {

  return (
    <DistrictPoiDataContext.Consumer>
      {poiData =>
        poiData.map(item => (
         <PoiItem key={item.id} poiData={item} handleSelectedPoiState={handleSelectedPoiState} />
        ))
      }
    </DistrictPoiDataContext.Consumer>
  );
};

export default PoiList;
