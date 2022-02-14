import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./Home";
import Members from "./Members";
import Map from "./Map";

/**
 * BrowserRouter
 * - react-router-dom을 적용하고 싶은 컴포넌트의 최상위 컴포넌트를 감싸주는 wrapper 컴포넌트
 * - 여기서는 최상위 컴포넌트가 Home이니까 <BrowserRouter>로 감싸준다
 */

// 라우팅: 다른 주소에 다른 화면을 보여주는 것
const Router = () => {
  return (
    /* 페이지를 새로고침하지 않고도 주소를 변경하고, 현재 주소에 관련된 정보를 props로 쉽게 조회하거나 사용할 수 있도록 해 줌 */
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home />}></Route>
        <Route path="/maps" element={<Map />}></Route>
        <Route path="/members" element={<Members />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;