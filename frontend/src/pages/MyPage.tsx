// @ts-ignore
// @ts-nocheck

import { React, useEffect, useState, useContext, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";

import UserProfile from "../components/MyPage/UserProfile";
import ReviewList from "../components/MyPage/ReviewList";

import * as Api from "../apis/api";

import UserStateContext from "../contexts/UserStateContext";
import DispatchContext from "../contexts/DispatchContext";


function MyPage() {
  const dispatch = useContext(DispatchContext);
  const userState = useContext(UserStateContext);

  const mounted = useRef(null);
  const navigate = useNavigate();

  /** 프로필을 수정중인지 검사하는 상태값입니다.*/
  const [isEditing, setIsEditing] = useState(false);

  /** 체크인 횟수에 따른 등급 상태값입니다. */
  const [mileageLevel, setMileageLevel] = useState({
    title: "Kickstarted",
    icon: "🌱",
  });

  /** 리뷰 list를 저장하는 상태값입니다. */
  const [reviews, setReviews] = useState([]);

  /** 북마크 list를 저장하는 상태값입니다. */
  const [favoritePlaces, setFavoritePlaces] = useState([]);

  /** 유저가 작성한 리뷰 리스트를 가지고 오는 목업 API입니다.*/
  const fetchReviews = async () => {
    try {
      const endpoint = "/review";
      const res = await Api.getData(endpoint);
      setReviews(res.data);
    } catch (e) {
      console.log(e);
    }
  };

  /** 내가 찜한 POI 리스트를 가져오는 목업 API입니다. */
  const fetchFavoritePlaces = async () => {
    try {
      const endpoint = "/bookmark";
      const params = `/${userState.user.id}`;
      const res = await Api.getData(endpoint, params);
      setFavoritePlaces(res.data);
    } catch (e) {
      console.log(e);
    }
  };

  /** 유저 정보를 받아오는 목업 API입니다.*/
  const fetchUserInfo = async () => {
    try {
      // 프론트엔드에서 보내주는 헤더에 있는 JWT 값으로 사용자를 판별합니다.
      const endpoint = "/user/mypage";
      const res = await Api.getData(endpoint);
      if (res.status === 200) {
        dispatch({
          type: "LOGIN_SUCCESS",
          payload: res.data,
        });
      }
    } catch (e) {
      console.log(e.response.data);
    }
  };

  /** 유저 정보를 업데이트 하는 목업 API입니다.*/
  const fetchUserUpdate = async ({ nickname, description, address, profileImage }) => {
    try {
      const endpoint = "/user/update";
      const formData = new FormData();
      formData.append("nickname", nickname);
      formData.append("description", description);
      formData.append("address", address);
      formData.append("profileImage", profileImage);

      const res = await Api.putMulter(endpoint, formData);
      console.log(res);
      if (res.status === 200) {
        dispatch({
          type: "LOGIN_SUCCESS",
          payload: res.data,
        });
      }
    } catch (e) {
      console.log(e.response.data);
    }
  };

  /** 유저 프로필 수정 상태를 변경하는 함수입니다. */
  const handleChangeEdit = () => {
    setIsEdit(prev => !prev);
  };

  /** 리뷰 레벨을 계산하는 함수입니다. */
  const handleChangeReviewLevel = () => {
    const levelIndex = reviews.length < 5 ? reviews.length : 5;
    setReviewLevel(REVIEW_LEVEL[levelIndex]);
  };

  useEffect(() => {
    // 로그인 상태가 아니라면 useEffect 내부의 함수들을 실행하지 않습니다.
    // 이 코드가 없으면 로그인이 되지 않은 상태에서 useEffect 내부의 함수들이 실행되어 undefined 에러를 발생시킵니다.
    if (!userState.user) return;
    handleChangeReviewLevel();
  }, [reviews]);

  // 로그인이 되어있지 않아 UserStateContext에 user값이 없을 경우 로그인 화면으로 이동시킵니다.
  useEffect(() => {
    const token = sessionStorage.getItem("userToken");
    if (!token) {
      alert("로그인을 먼저 해주세요.");
      navigate("/login");
    } else {
      fetchUserInfo();
      fetchReviews();
      fetchFavoritePlaces();
    }
  }, []);

  return (
    <div className="flex flex-row overflow-y-auto min-h-full p-8 justify-between ">
      <div className="flex flex-col bg-slate-100 w-5/12 p-8 items-center rounded-xl">
        <UserProfile
          user={userState.user}
          isEdit={isEdit}
          fetchUserUpdate={fetchUserUpdate}
          handleChangeEdit={handleChangeEdit}
          setReviewLevel={setReviewLevel}
          reviewLevel={reviewLevel}
          reviewLength={reviews.length}
        />
      </div>
      <div className="flex flex-col w-6/12 rounded-xl">
        <div className="flex flex-col bg-slate-100 w-full h-full mt-10 p-8 rounded-xl">
          <p className="text-xl font-bold">My Reviews</p>
          <ReviewList list={reviews} />
        </div>
      </div>
    </div>
  );
}

export default MyPage;
