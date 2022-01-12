import "devextreme/dist/css/dx.common.css";
import "devextreme/dist/css/dx.light.css";
import "./App.css";
import React, { Component } from "react";
import { Button } from "devextreme-react/button";
import { Link } from "react-router-dom";
import Header from "./Header";

class Home extends Component {
  render() {
    return (
      <div className="App">
        <Header title="Home!"></Header>
        <main>
          <section>
            <div className="buttons-demo">
              <div className="buttons">
                <div>
                  <div className="buttons-column">
                    <div>
                      <Button>
                        {/* <Link>: 프로젝트 내에서 페이지를 전환하는 경우*/}
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
        </main>
      </div>
    );
  }
}

export default Home;
