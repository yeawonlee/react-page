import "devextreme/dist/css/dx.common.css";
import "devextreme/dist/css/dx.light.css";
import "./App.css";
import React from "react";
import { Routes, Route } from "react-router-dom";

import NavigationDrawer from "./NavigationDrawer";
import Home from "./Home";
import Members from "./Members";
import Map from "./Map";
import Footer from "./Footer";

const App = () => {
  return (
    <div className="App">
      <NavigationDrawer/>
      <Routes>
        <Route path="/" element={<Home title="Home Page"/>}></Route>
        <Route path="/maps" element={<Map />}></Route>
        <Route path="/members" element={<Members />}></Route>
      </Routes>
      <Footer />

      {/*
      <main>
        <section>
        </section>
      </main>
      */}
    </div>
  );
};

export default App;
