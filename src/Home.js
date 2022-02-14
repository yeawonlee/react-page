import "devextreme/dist/css/dx.common.css";
import "devextreme/dist/css/dx.light.css";
import "./App.css";
import React, { useState } from "react";
import { Button } from "devextreme-react/button";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Toolbar from "devextreme-react/toolbar";
import Drawer from "devextreme-react/drawer";
import HTMLReactParser from "html-react-parser";

import NavigationList from "./NavigationList";

import Header from "./Header";
import Members from "./Members";
import Map from "./Map";

const Home = () => {
  const [opened, setOpened] = useState(true);
  const [openedStateMode, setOpenedStateMode] = useState("shrink");
  const [position, setPosition] = useState("left");

  const text =
    "<h2><b>Drawer Demo</b></h2><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Penatibus et magnis dis parturient. Eget dolor morbi non arcu risus. Tristique magna sit amet purus gravida quis blandit. Auctor urna nunc id cursus metus aliquam eleifend mi in. Tellus orci ac auctor augue mauris augue neque gravida. Nullam vehicula ipsum a arcu. Nullam ac tortor vitae purus faucibus ornare suspendisse sed nisi. Cursus in hac habitasse platea dictumst. Egestas dui id ornare arcu. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper dignissim.</p><p>Mauris rhoncus aenean vel elit scelerisque mauris pellentesque pulvinar. Neque volutpat ac tincidunt vitae semper quis lectus. Sed sed risus pretium quam vulputate dignissim suspendisse in. Urna nec tincidunt praesent semper feugiat nibh sed pulvinar. Ultricies lacus sed turpis tincidunt id aliquet risus feugiat. Amet cursus sit amet dictum sit amet justo donec enim. Vestibulum rhoncus est pellentesque elit ullamcorper. Id aliquet risus feugiat in ante metus dictum at.</p><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Penatibus et magnis dis parturient. Eget dolor morbi non arcu risus. Tristique magna sit amet purus gravida quis blandit. Auctor urna nunc id cursus metus aliquam eleifend mi in. Tellus orci ac auctor augue mauris augue neque gravida. Nullam vehicula ipsum a arcu. Nullam ac tortor vitae purus faucibus ornare suspendisse sed nisi. Cursus in hac habitasse platea dictumst. Egestas dui id ornare arcu. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper dignissim.</p><p>Mauris rhoncus aenean vel elit scelerisque mauris pellentesque pulvinar. Neque volutpat ac tincidunt vitae semper quis lectus. Sed sed risus pretium quam vulputate dignissim suspendisse in. Urna nec tincidunt praesent semper feugiat nibh sed pulvinar. Ultricies lacus sed turpis tincidunt id aliquet risus feugiat. Amet cursus sit amet dictum sit amet justo donec enim. Vestibulum rhoncus est pellentesque elit ullamcorper. Id aliquet risus feugiat in ante metus dictum at.</p>";

  const toolbarItems = [
    {
      widget: "dxButton",
      location: "before",
      options: {
        icon: "menu",
        onClick: () => setOpened(!opened),
      },
    },
  ];

  const onOutsideClick = () => {
    setOpened(false);
  };

  return (
    <div className="App">
      <Header title="Home!"></Header>

      <Toolbar items={toolbarItems} />

      <Drawer
        opened={opened}
        openedStateMode={openedStateMode}
        position={position}
        component={NavigationList}
        closeOnOutsideClick={onOutsideClick}
        height="100%"
      >
        <div id="content" className="dx-theme-background-color">
          {HTMLReactParser(text)}
        </div>
        {/*
        <div id="view">
            <Routes>
              <Route exact path="/" element={<Home />}></Route>
              <Route exact path="/maps" element={<Map />}></Route>
              <Route exact path="/members" element={<Members />}></Route>
            </Routes>
        </div>
        */}
      </Drawer>

      {/*
      <main>
        <section>
          <div className="buttons-demo">
            <div className="buttons">
              <div>
                <div className="buttons-column">
                  <div>
                    <Button>
                      {/*<Link>: 프로젝트 내에서 페이지를 전환하는 경우* / }
                      <Link to="/members">Members</Link>
                    </Button>
                  </div>
                </div>
                <div className="buttons-column">
                  <div>
                    <Button>
                      <Link to="/maps">Map</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        </main>*/}
    </div>
  );
};

export default Home;
