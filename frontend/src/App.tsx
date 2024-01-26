// @ts-ignore
// @ts-nocheck

import React from 'react';
import { useEffect, useState, useReducer } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./index.css";

import * as Api from "./apis/api";

import userStateReducer from "./hooks/userStateReducer";

// 웹앱의 전체 레이아웃을 정의하고 있는 페이지입니다.
import LayoutPage from "./pages/LayoutPage";

import PlacesPage from "./pages/PlacesPage";
/*
import EventsPage from "./pages/EventsPage";
import MeetupsPage from "./pages/MeetupsPage";
import InsightsPage from "./pages/InsightsPage";
import MomentsPage from "./pages/MomentsPage";
import MyPage from "./pages/MyPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
*/

function App() {
  
  /** 현재 유저 정보를 userState 상태값으로 정의하고 여기에 useReducer를 사용합니다. */
  const [userState, dispatch] = useReducer(userStateReducer, {
    user: null,
  });

  /** 유저 정보를 데이터베이스에서 받아옵니다. */
  const fetchUserInfo = async () => {
    try {
      // 프론트엔드에서 보내주는 헤더에 있는 JWT 값으로 사용자를 판별합니다.
      const endpoint = "/users/mypage";
      const res = await Api.getData(endpoint);
      if (res.status === 200) {
        // dispatch 함수를 이용해 로그인 성공 신호와 사용자 정보를 상태값으로 저장합니다.
        dispatch({
          type: "LOGIN_SUCCESS",
          payload: res.data
        });
      }
    } catch (error) {
      console.log(error.res.data);
    }
  };

  useEffect(() => {
    console.log("App mounted, retrieving user token...");
    const token = sessionStorage.getItem("userToken");
    if (token) {
      fetchUserInfo();
    }
  }, []);

  return (
    <div>
      <BrowserRouter>
        <Routes>

          {/* 먼저 웹앱의 전체 레이아웃을 표시해야 하므로 루트 경로에다가 LayoutPage를 지정해주고, */}
          <Route path="/" element={<LayoutPage />}>

            {/* 접속 후 첫 화면에서 메인 기능을 Outlet 영역에 표시해 주기 위해서, Subroute로써 루트 경로에다가 메인 기능 페이지를 다시 한번 지정해줍니다. */}
            {/* 이렇게 해주면 사용자가 루트 경로로 접속을 할 때, LayoutPage와 함께 Outlet 영역에다가 메인 기능 페이지를 한번에 같이 불러올 수 있습니다.*/}
            <Route path="/" element={<PlacesPage />}></Route>

            <Route path="/places" element={<PlacesPage />}></Route>

            {/*
            <Route path="/events" element={<EventsPage />}></Route>
            <Route path="/meetups" element={<MeetupsPage />}></Route>
            <Route path="/insights" element={<InsightsPage />}></Route>
            <Route path="/moments" element={<MomentsPage />}></Route>
            <Route path="/mypage" element={<MyPage />}></Route>
            <Route path="/login" element={<LoginPage />}></Route>
            <Route path="/signup" element={<SignupPage />}></Route>
            */}

          </Route>

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;