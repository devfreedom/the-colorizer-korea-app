// @ts-ignore
// @ts-nocheck

const PoiItem = (props) => {

  // 사용자가 선택한 POI의 고유번호를 부모 컴포넌트인 PoiPage의 selectedPoi 상태값으로 갱신해줍니다.
  function handleClick() {
    props.handleSelectedPoiState(props.poiData.index)
  }

  return (
    // [참고] 지도 위에 표시된 마커를 클릭하면, 해당 마커에 해당하는 POI를 목록의 최상단으로 올려줍니다. PoiMap.js를 참고하세요.
    <div id={props.poiData.index} className="flex flex-col">
      <div className="transition ease-in-out duration-300 hover:bg-slate-100 cursor-pointer p-4 " onClick={handleClick}>
        <h1 className="font-bold">{props.poiData.name}</h1>
        <p className="">{props.poiData.headline}</p>
        <p className="">{props.poiData.address}</p>
        <span className="">{props.poiData.category} / </span><span className="">{props.poiData.subcategory}</span> 
        <div className="flex flex-row justify-between items-center">
          <div>
            {props.poiData.rating !==0 &&
              <>
                <span className="mr-2">Rating:</span><span className="">{props.poiData.rating}</span>
              </>
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default PoiItem;
