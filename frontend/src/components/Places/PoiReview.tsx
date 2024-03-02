// @ts-ignore
// @ts-nocheck

import React from  'react';
  
import { useState, useEffect, useContext } from 'react';
import * as Api from "../../apis/api";

import UserStateContext from "../../contexts/UserStateContext";
import DispatchContext from "../../contexts/DispatchContext";


const ReviewInputForm = (props) => {

  const dispatch = useContext(DispatchContext);
  const userState = useContext(UserStateContext);

  // API 요청에 사용되는 endpoint를 지정해줍니다.
  const endpoint = '/reviews';

  // 사용자가 선택한 행정구역 정보를 담고 있는 district 상태값을 라우팅 파라미터인 params로써 API 요청에 반영합니다.
  const params = `/${props.selectedPoiId}`;

  const HandleSubmit = async (event) =>{
  
    // onSubmit과 함께 기본적으로 작동하는 브라우저 새로고침을 차단해줍니다.
    event.preventDefault();

    // 사용자가 입력한 리뷰값을 data 변수에 대입합니다.
    const data = {
      "user_id" : userState.user.id,
      "username" : userState.user.username,
      "poi_id" : props.selectedPoiId,
      "text" : event.target.input.value,
    }

    // 화면에 내용을 표시해야하는 GET 요청이 아니라 POST 요청이므로 굳이 useEffect를 사용할 필요 없이 event handler를 통해서 직접 실행합니다.
    try{

      const res = await Api.postData(data, endpoint, params);

      if(!res.data.errorMessage){
        alert(`리뷰를 성공적으로 추가했습니다.`);

        // 추가된 리뷰를 리뷰 목록에 표시해주는 방법

        // 프론트엔드에서 POST/PUT/DELETE를 요청하면, 백엔드에서 다음과 같이 처리해 응답으로써 보내줄 수 있습니다.
        // 1. 프론트엔드에 성공 실패 여부만 알려주는 경우
        // 2. 프론트엔드에 CRUD 작업을 요청한 내용을 그대로 응답으로 돌려주는 경우
        // 3. 프론트엔드에 CRUD 작업 이후 변경된 객체나 배열을 보내주는 경우

        // 여기서는 1번에 가까우며, 두가지 방법이 있습니다.
        // 1. GET 요청으로 새로 갱신된 fetch를 다시 해와서 데이터를 보여주는 방법 (추가적인 쿼리가 필요하므로 자원이 낭비됨)
        // 2. 사용자가 POST/PUT/DELETE를 수행한 데이터 및 요소를 프론트엔드 차원에서만 부분 렌더링으로 추가해주거나 제외해주는 방법

        // 여기서는 props를 새로고침 해보도록 하겠습니다.
        props.refresh();
        return;
      }
      if(res.data.errorMessage){
        alert(`리뷰를 추가하는 도중 오류가 발생했습니다: ${res.data.errorMessage}`);
        return;
      }
    } catch (err) {
        alert(`리뷰를 추가하는 도중 오류가 발생했습니다: ${err}`);
      return;
    }
  };

  return(
    <div className="flex my-4">
      <form className="flex flex-row justify-between w-full" onSubmit={HandleSubmit} type="submit">
        <input className="flex-1 w-full bg-slate-100 rounded-lg p-3" type="text" name="input"></input>
        <button className="flex-none bg-green-400 rounded-lg ml-4 p-4">작성</button>
      </form>
    </div>
  )
}


const PoiReview = (props) => {

  const dispatch = useContext(DispatchContext);
  const userState = useContext(UserStateContext);

  // 사용자가 선택한 특정 POI에 작성된 리뷰 목록을 백엔드로부터 받아와서 상태값으로써 저장합니다.
  const [poiReviewData, setPoiReviewData] = useState();

  // 백엔드로부터 데이터를 받아오고 있는지를 체크하는 상태값입니다.
  const [isFetching, setIsFetching] = useState(true);

  // 백엔드로부터 데이터를 받아오다가 오류가 발생했는지를 체크하는 상태값입니다.
  const [error, setError] = useState("");

  const fetchPoiReviewData = async () => {
    try{
      // API 요청에 사용되는 endpoint를 지정해줍니다.
      const endpoint = '/reviews';
      
      // 사용자가 선택한 특정 POI의 id값을 라우팅 파라미터인 params로써 API 요청에 반영합니다.
      const params = `/${props.selectedPoiId}`;
      
      setIsFetching(true);
      const res = await Api.getData(endpoint, params);
      setPoiReviewData(res.data);
    } catch (err) {
      // 만약에 에러가 발생하게 되면 데이터 로딩 상황을 알려주는 placeholder 아래에 에러 메세지가 추가됩니다.
      setError(`${err.name} : ${err.message}`);
      alert(`An error has occured while fetching reviews: ${err}`);
      return;
    }
    finally {
      setIsFetching(false);
    }
  }

  useEffect(() => {
    fetchPoiReviewData();
  }, [error, props.selectedPoiId]);

  if (isFetching || !poiReviewData) {
    return (
      <div className="flex flex-col w-full h-full justify-center items-center">
        <p className="font-bold text-lg">Fetching reviews, please wait...</p>
        <p className="font-bold text-lg">{error}</p>
      </div>
    );
  }

  // 리뷰 삭제 버튼을 눌렀을 때 작동합니다.
  async function handleClick (event) {
    event.preventDefault();
    const reviewId = event.target.id;
    console.log(reviewId)

    alert(`리뷰를 정말로 삭제하시겠습니까?`);
   
    try{
      const endpoint = "/reviews"
      const params = `/${reviewId}`
      const res = await Api.deleteData(endpoint, params);
      console.log(res)

      if(!res.status == 204){
        alert(`리뷰를 삭제하는 도중 오류가 발생했습니다.: ${res.data}`);
      }

      if(res.status == 204){
        alert(`리뷰를 성공적으로 삭제했습니다.`);
        
        // 삭제된 리뷰를 리뷰 목록에서 제거하는 방법
        
        // 프론트엔드에서 POST/PUT/DELETE를 요청하면, 백엔드에서 다음과 같이 처리해 응답으로써 보내줄 수 있습니다.
        // 1. 프론트엔드에 성공 실패 여부만 알려주는 경우
        // 2. 프론트엔드에 CRUD 작업을 요청한 내용을 그대로 응답으로 돌려주는 경우
        // 3. 프론트엔드에 CRUD 작업 이후 변경된 객체나 배열을 보내주는 경우

        // 여기서는 1번에 가까우며, 두가지 방법이 있습니다.
        // 1. GET 요청으로 새로 갱신된 fetch를 다시 해와서 데이터를 보여주는 방법 (추가적인 쿼리가 필요하므로 자원이 낭비됨)
        // 2. 사용자가 POST/PUT/DELETE를 수행한 데이터 및 요소를 프론트엔드 차원에서만 부분 렌더링으로 추가해주거나 제외해주는 방법

        // 여기서는 props를 새로고침 해보도록 하겠습니다.
        props.refresh();
      }
    } catch (err) {
      // 만약에 에러가 발생하게 되면 데이터 로딩 상황을 알려주는 placeholder 아래에 에러 메세지가 추가됩니다.
      setError(`${err.name} : ${err.message}`);
      alert(`데이터를 가져오는 도중 에러가 발생했습니다: ${err}`);
      return;
    }
  }

  return(
    <div>
      <div className="flex flex-col bg-slate-100 rounded-xl overflow-y-scroll h-[30vh] p-2">
        {poiReviewData.map(item => (
          <div key={item.id} className="flex flex-col my-2">
            <div className="flex flex-row justify-between">
              <span>{item.username}</span>
              {/* 현재 로그인한 사용자의 id와 리뷰를 작성한 사용자의 id가 일치하는 경우에만 삭제 버튼을 표시합니다. */}
              {/* [TO-DO][REFACTOR] 로그인 시 백엔드에서는 사용자의 고유 _id를 다른 사용자 정보들과 함께 담아 프론트엔드에 넘겨주고, 
                                    프론트엔드는 그걸 받아서 사용자 계정 정보를 담고있는 전역 상태값 userState에 저장해서 사용자의 고유 _id를 사용하는 지금 방식 대신,
                                    사용자의 고유 _id를 파악할 필요가 있을때마다, 백엔드로 JWT 토큰을 보내고 그걸 백엔드에서 받아 사용자의 고유 _id를 반환하는 방식의
                                    별도의 API를 구축하고 사용하는 것을 보안 측면에서 고려해볼 수 있습니다.*/}
              {item.user_id == userState.user.id
                ? <button key={item.id} id={item.id} onClick={handleClick} className="font-bold">
                    ×
                  </button> 
                : <span></span>
              }
            </div>
            <p className="">{item.text}</p>
          </div>
        ))}

      </div>
    <ReviewInputForm refresh={fetchPoiReviewData} selectedPoiId={props.selectedPoiId} />
    </div>
  )
}

export default PoiReview;
