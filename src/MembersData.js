import React, { Component } from "react";
import "./Members.css";
import Header from "./Header";
import BackButton from "./BackButton";
import axios from "axios";

class MembersData extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: []
    };
  }

  // (GET) 전체 회원 조회
  getMembers = async () => {
    try {
      const data = await axios.get("/spring-mvc/api/members").then(({data}) => data);
      this.setState({ data: data });
    } catch (e) {
      console.error(e);
    }
  };

  // (GET) 특정 회원 조회
  getMember = async () => {
    try {
      const response = await axios.get('/spring-mvc/api/members/3');
      this.setState({ data: response.data });
    } catch (e) {
      console.error(e);
    }
  };

  // (POST) 회원 등록
  postMember = async () => {
    try {
      const response = await axios.post("/spring-mvc/api/members", {
        id: "aaa",
        password: "1111",
        name: "리액트",
        email: "aaa@naver.com"
      });
      this.getMembers();
    } catch (e) {
      console.error(e);
    }
  };

  // (PUT) 회원 정보 수정
  putMember = async (idx) => {
    try {
      const response = await axios.put("/spring-mvc/api/members/37", {
        idx: 37,
        id: "aaa",
        password: "1111",
        name: "React",
        email: "aaa@naver.com"
      });
      this.getMembers();
    } catch (e) {
      console.error(e);
    }
  };

  // (DLETE) 회원 삭제
  deleteMember = async (idx) => {
    try {
      const response = await axios.delete("/spring-mvc/api/members/31");
      this.getMembers();
    } catch (e) {
      console.error(e);
    }
  };

  componentDidMount() {
    this.getMembers();
  }

  render() {
    return (
      <div className="App">
        <Header title="Member list"></Header>
        <main>
          <section>
            <div>
              <div>
                <button onClick={this.getMembers}>전체 회원 조회</button>
                <button onClick={this.getMember}>특정 회원 조회</button>
                <button onClick={this.postMember}>회원 등록</button>
                <button onClick={this.putMember}>회원 수정</button>
                <button onClick={this.deleteMember}>회원 삭제</button>
                <div>
                  {this.state.data && (
                    <textarea
                      rows={50}
                      cols={50}
                      value={JSON.stringify(this.state.data, null, 2)}
                      readOnly={true}
                    />
                  )}
                </div>
              </div>
            </div>
          </section>
        </main>
        <BackButton></BackButton>
      </div>
    );
  }
}

export default MembersData;
