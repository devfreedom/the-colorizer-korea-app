import { Outlet, useNavigate, useLocation } from 'react-router-dom';

import Header from "../components/Layout/Header";
import Navbar from "../components/Layout/Navbar";
import { useEffect } from 'react';

const LayoutPage = () => {

  const navigate = useNavigate();
  const location = useLocation();

  // [참고] 자동 숨김 주소창 등의 기능으로 인해 뷰포트가 고정되지 않는 모바일 환경에서, 뷰포트의 높이를 브라우저의 실제 innerHeight로 강제해주는 코드입니다.
  //       이 코드가 없으면 footer라던가 navbar 등의 컴포넌트가 하단에 있는 경우, 주소창이 보이거나 숨겨지면서 컴포넌트를 덮어버리게 됩니다.

  useEffect(() => {

    // 1. 모바일 브라우저 내부의 실제 innerHeight를 뷰포트의 높이로 정의해줍니다.
    const mobileDocumentHeight = () => {
      const doc = document.documentElement;
      doc.style.setProperty("--doc-height", `${window.innerHeight}px`);
    }

    // 2. 주소창이 자동으로 숨겨졌다가 표시되거나 하면서 모바일 브라우저 내부 영역에 리사이즈가 일어날때마다, 뷰포트의 높이도 그에 맞게 맞춰줍니다.
    window.addEventListener("resize", mobileDocumentHeight);
    mobileDocumentHeight();

  }, []);

  useEffect(() => {
    if (location.pathname === "/") navigate("/place");
  }, [location]);

  return (
    // 지금은 일단 React App 컴포넌트에다가 너비 100vw 높이 100vh의 CSS를 적용시켜 뷰포트로 잡아주었습니다.
    <div className="flex flex-col w-[100vw] h-[100vh]">
      <header className="flex-row">
        <Header />
      </header>

      {/* max height가 필요합니다. */}
      <main className="grow overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default LayoutPage;