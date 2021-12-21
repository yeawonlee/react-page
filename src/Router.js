import React, { Component } from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './Home';
import Members from './Members'
import Map from './Map';

class Router extends Component {
  render() {
      return(
          <BrowserRouter>
              <Routes>
                  <Route exact path='/' element={<Home/>}></Route>
                  <Route path='/members' element={<Members/>}></Route>
                  <Route path='/maps' element={<Map/>}></Route>
              </Routes>
          </BrowserRouter>
      );
  }
}

export default Router;
