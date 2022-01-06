import 'devextreme/dist/css/dx.common.css';
import 'devextreme/dist/css/dx.light.css';
import './App.css';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';

class Home extends Component {
  render() {
    return(
      <div className="App">
        <Header title="Home!"></Header>
        <main>
          <section>
            {/* <Link>: 프로젝트 내에서 페이지를 전환하는 경우*/}
            <Link to="/members">Members</Link>
          </section>

          {/* Spring 서버에서 REST API 호출하여 JSON data 받아오기 테스트 */}
          <section>
            <Link to="/members-data">Members (테스트)</Link>
          </section>

          <section>
            <Link to="/maps">Map</Link>
          </section>
        </main>
      </div>
    );
  }
}

export default Home;
