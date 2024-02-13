// @ts-ignore
// @ts-nocheck

import React from 'react';

import { useState } from 'react';

const CurrentDistrictSelector = ({handleCurrentDistrictState}) => {

  const [selectedDistrict, setSelectedDistrict] = useState('seoul');

  const [selectedSubdistrict, setSelectedSubdistrict] = useState('gangnam');

  const handleChangeDistrict = (event) => {  
    // [주의] useState는 비동기적입니다. 따라서 setState는 즉시 반환하게 됩니다. 상태값인 selectedDistrict는 다음 재렌더링때 바뀌게 됩니다.
    //       따라서 그 전에 이렇게 별도의 변수로 먼저 저장해주면 사용자가 선택한 바로 그 순간의 값을 있는 그대로 전달해줄 수 있습니다.
    
    const selectedDistrictValue = event.target.value;

    // 상위 행정구역을 currentDistrict 상태값으로 지정합니다.
    setSelectedDistrict(selectedDistrictValue);
  }

  const handleChangeSubdistrict = (event) => {
    // [주의] useState는 비동기적입니다. 따라서 setState는 즉시 반환하게 됩니다. 상태값인 selectedSubdistrict는 다음 재렌더링때 바뀌게 됩니다.
    //       따라서 그 전에 이렇게 별도의 변수로 먼저 저장해주면 사용자가 선택한 바로 그 순간의 값을 있는 그대로 전달해줄 수 있습니다.
    
    const selectedSubdistrictValue = event.target.value;
    // 부모 컴포넌트인 GeolocationToolbar로부터 전달받은 handleCurrentDistrictState 함수를 사용해서,
    // 부모 컴포넌트의 currentDistrict 상태값을 현재 선택된 하위 행정구역으로 갱신합니다.
    handleCurrentDistrictState(selectedSubdistrictValue);
  }

  // Warning: Use the `defaultValue` or `value` props on <select> instead of setting `selected` on <option>.
  return (
    <div className="flex flex-row items-center">
      <label className="mr-3">Explore where?</label>
        <select className="mr-3 rounded-lg p-1" name="district-selector" onChange={handleChangeDistrict} value={selectedDistrict}>
          <option value="seoul">Seoul</option>
          <option value="gyeonggi">Gyeonggi</option>
          <option value="incheon">Incheon</option>
          <option value="gangwon" disabled>Gangwon</option>
          <option value="chungbuk" disabled>Chungbuk</option>
          <option value="chungnam" disabled>Chungnam</option>
          <option value="jeonbuk" disabled>Jeonbuk</option>
          <option value="jeonnam" disabled>Jeonnam</option>
          <option value="gyeongbuk" disabled>Gyeongbuk</option>
          <option value="gyeongnam" disabled>Gyeongnam</option>
          <option value="jeju" disabled>Jeju</option>
        </select>
      
      {selectedDistrict == 'seoul' &&
        <select className="rounded-lg p-1" name="subdistrict-selector-seoul" onChange={handleChangeSubdistrict}>
          <option>District</option>
            <optgroup label="Seoul-si">
              <option value="gangnam">Gangnam-gu</option>
              <option value="gangdong">Gangdong-gu</option>
              <option value="gangbuk">Gangbuk-gu</option>
              <option value="gangseo">Gangseo-gu</option>
              <option value="gwanak">Gwanak-gu</option>
              <option value="gwangjin">Gwangjin-gu</option>
              <option value="guro">Guro-gu</option>
              <option value="geumcheon">Geumcheon-gu</option>
              <option value="nowon">Nowon-gu</option>
              <option value="dobong">Dobong-gu</option>
              <option value="dongdaemun">Dongdaemun-gu</option>
              <option value="dongjak">Dongjak-gu</option>
              <option value="mapo">Mapo-gu</option>
              <option value="seodaemun">Seodaemun-gu</option>
              <option value="seocho">Seocho-gu</option>
              <option value="seongdong">Seongdong-gu</option>
              <option value="seongbuk">Seongbuk-gu</option>
              <option value="songpa">Songpa-gu</option>
              <option value="yangcheon">Yangcheon-gu</option>
              <option value="yeongdeungpo">Yeongdeungpo-gu</option>
              <option value="yongsan">Yongsan-gu</option>
              <option value="eunpyeong">Eunpyeong-gu</option>
              <option value="jongno">Jongno-gu</option>
              <option value="jung">Jung-gu</option>
              <option value="jungnang">Jungnang-gu</option>
            </optgroup>
        </select>
      }

      {selectedDistrict == 'gyeonggi' &&
        <select className="rounded-lg p-1" name="subdistrict-selector-gyeonggi" onChange={handleChangeSubdistrict}>
          <option>City</option>
            <optgroup label="Gyeonggi-do">
              <option value="goyang">Goyang-si</option>
              <option value="gwacheon">Gwacheon-si</option>
              <option value="gwangmyeong">Gwangmyeong-si</option>
              <option value="gwangju">Gwangju-si</option>
              <option value="guri">Guri-si</option>
              <option value="gunpo">Gunpo-si</option>
              <option value="gimpo">Gimpo-si</option>
              <option value="namyangju">Namyangju-si</option>
              <option value="dongducheon">Dongducheon-si</option>
              <option value="bucheon">Bucheon-si</option>
              <option value="seongnam">Seongnam-si</option>
              <option value="suwon">Suwon-si</option>
              <option value="siheung">Siheung-si</option>
              <option value="ansan">Ansan-si</option>
              <option value="anseong">Anseong-si</option>
              <option value="anyang">Anyang-si</option>
              <option value="yangju">Yangju-si</option>
              <option value="yeoju">Yeoju-si</option>
              <option value="osan">Osan-si</option>
              <option value="yongin">Yongin-si</option>
              <option value="uiwang">Uiwang-si</option>
              <option value="uijeongbu">Uijeongbu-si</option>
              <option value="icheon">Icheon-si</option>
              <option value="paju">Paju-si</option>
              <option value="pyeongtaek">Pyeongtaek-si</option>
              <option value="pocheon">Pocheon-si</option>
              <option value="hanam">Hanam-si</option>
              <option value="hwaseong">Hwaseong-si</option>
            </optgroup>
        </select>
      }

      {selectedDistrict == 'incheon' &&
        <select className="rounded-lg p-1" name="subdistrict-selector-incheon" onChange={handleChangeSubdistrict}>
          <option disabled>District</option>
            <optgroup label="Incheon-si">
              <option value="ganghwa">Gangwha-gun</option>
              <option value="gyeyang">Gyeyang-gu</option>
              <option value="namdong">Namdong-gu</option>
              <option value="dong">Dong-gu</option>
              <option value="michuhol">Michuhol-gu</option>
              <option value="bupyeong">Bupyeong-gu</option>
              <option value="seo">Seo-gu</option>
              <option value="yeonsu">Yeonsu-gu</option>
              <option value="ongjin">Ongjin-gun</option>
              <option value="jung">Jung-gu</option>
            </optgroup>
        </select>
      }

    </div>
  )
}

export default CurrentDistrictSelector;
