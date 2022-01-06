import React, { Component } from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './Home';
import Members from './Members'
import Map from './Map';
import MembersData from './MembersData';

// 라우팅: 다른 주소에 다른 화면을 보여주는 것
class Router extends Component {
  render() {
      return(
          /* 페이지를 새로고침하지 않고도 주소르 변경하고, 현재 주소에 관련된 정보를 props로 쉽게 조회하거나 사용할 수 있도록 해 줌 */
          <BrowserRouter>
              <Routes>
                  <Route exact path='/' element={<Home/>}></Route>
                  <Route path='/maps' element={<Map/>}></Route>
                  <Route path='/members' element={<Members/>}></Route>
                  <Route path='/members-data' element={<MembersData/>}></Route>
              </Routes>
          </BrowserRouter>
      );
  }
}

export default Router;
