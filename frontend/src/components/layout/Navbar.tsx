// @ts-ignore
// @ts-nocheck

import React from 'react';
import { useState, useContext, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

import UserStateContext from "../../contexts/UserStateContext";
import DispatchContext from "../../contexts/DispatchContext";

function Navbar() {

  const dispatch = useContext(DispatchContext);
  const userState = useContext(UserStateContext);

  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedin] = useState(false);

  useEffect(() => {
    if(userState.user){
      setIsLoggedin(true);
    }
    if(!userState.user){
      setIsLoggedin(false);
    }
  }, [userState])

  // NavLink 컴포넌트를 사용해서, 활성화된 메뉴에는 특정 class를 부여해 CSS style을 적용해줍니다.
  const activeStyle = 'mx-6 underline decoration-4 underline-offset-8';
  const inactiveStyle = 'mx-6'

  const LoggedInMenu = () => {
    return (
      <div>
        <NavLink 
          to="/" 
          id="logout-menu-btn" 
          className="mx-6 text-slate-500"
          onClick={handleClick}
        >
          Log Out
        </NavLink>
        <NavLink 
          to="/mypage" 
          id="mypage-menu-btn" 
          className={({ isActive, isPending }) => isPending ? inactiveStyle : isActive ? activeStyle : "mx-6"}
        >
          My Page
        </NavLink>

      </div>
    );
  }
    
  const LoggedOutMenu = () => {
    return (
      <div>
        <NavLink 
          to="/login" 
          id="login-menu-btn" 
          className={({ isActive, isPending }) => isPending ? inactiveStyle : isActive ? activeStyle : "mx-6"}
        >
          Sign In
        </NavLink>
        <NavLink 
          to="/signup" 
          id="signup-menu-btn" 
          className={({ isActive, isPending }) => isPending ? inactiveStyle : isActive ? activeStyle : "mx-6"}
        >
          Join Now
        </NavLink>
      </div>
    );
  }

  // 로그아웃 버튼을 클릭할 때 실행됩니다.
  const handleClick = () => {
    // sessionStorage에 저장되어있던 JWT Token을 삭제합니다.
    sessionStorage.removeItem("userToken");
    
    // dispatch 함수를 사용해 userState를 로그아웃 상태로 바꿔줍니다.
    dispatch({ type: "LOGOUT" });

    alert('You have successfully logged out.');

    navigate("/", { replace: true });
  }

  return (
    <div className="flex flex-row w-[85%] h-12 items-center">

      <div className="flex flex-row w-full justify-between items-center px-2 font-bold text-md">
        <div>
          <NavLink 
            to="/places" 
            id="places-menu-btn" 
            className={({ isActive, isPending }) => isPending ? inactiveStyle : isActive ? activeStyle : "mx-6"}
          >
            Places
          </NavLink>
          <NavLink 
            to="/events" 
            id="events-menu-btn" 
            className={({ isActive, isPending }) => isPending ? inactiveStyle : isActive ? activeStyle : "mx-6"}
          >
            Events
          </NavLink>
          <NavLink 
            to="/meetups" 
            id="meetups-menu-btn" 
            className={({ isActive, isPending }) => isPending ? inactiveStyle : isActive ? activeStyle : "mx-6"}
          >
            Meetups
          </NavLink>
          <NavLink 
            to="/insights" 
            id="insights-menu-btn" 
            className={({ isActive, isPending }) => isPending ? inactiveStyle : isActive ? activeStyle : "mx-6"}
          >
            Insights
          </NavLink>
          <NavLink 
            to="/moments" 
            id="moments-menu-btn" 
            className={({ isActive, isPending }) => isPending ? inactiveStyle : isActive ? activeStyle : "mx-6"}
          >
            Moments
          </NavLink>
        </div>
        <div>
          { isLoggedIn ? <LoggedInMenu /> : <LoggedOutMenu /> }
        </div>  
      </div>
      
    </div>
  )
}

export default Navbar;