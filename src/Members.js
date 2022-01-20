import React, { Component } from "react";
import "./Members.css";
import Header from "./Header";
import BackButton from "./BackButton";
import axios from "axios";

import DataGrid, {
  Scrolling,
  Pager,
  Paging,
  Column,
  Editing,
} from "devextreme-react/data-grid";
import { CheckBox } from "devextreme-react/check-box";

/*
 * Record Paging (https://js.devexpress.com/Demos/WidgetsGallery/Demo/DataGrid/RecordPaging/React/Light/)
 * Row Editing and Editing Events (https://js.devexpress.com/Demos/WidgetsGallery/Demo/DataGrid/RowEditingAndEditingEvents/React/Light/)
 */

const allowedPageSizes = [5, 10, "all"];

class Members extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showPageSizeSelector: true,
      showInfo: true,
      showNavButtons: true,

      data: [],
    };

    this.onRowInserting = (e) => {
      this.postMember(e);
    };

    this.onRowUpdating = (e) => {
      this.putMember(e);
    };

    this.onRowRemoving = (e) => {
      this.deleteMember(e);
    };
  }

  componentDidMount() {
    this.getMembers();
  }

  // axios GET / POST / PUT / DELETE

  // (GET) 전체 회원 조회
  getMembers = async () => {
    try {
      const response = await axios.get(
        "https://www.yeawonlee.com/spring-mvc/api/members"
      );
      this.setState({ data: response.data });
    } catch (e) {
      console.error(e);
    }
  };

  // (POST) 회원 등록
  postMember = async (e) => {
    //onRowInserting 매개변수 data: 삽입해야 하는 행의 데이터
    console.log(`post test data: ${e.data}`); // post test data: [object Object]

    // ↓ 이거는 다 잘 출력됨
    console.log(`e.data.idx: ${e.data.idx}`);
    console.log(`e.data.id: ${e.data.id}`);
    console.log(`e.data.password: ${e.data.password}`);
    console.log(`e.data.name: ${e.data.name}`);
    console.log(`e.data.email: ${e.data.email}`);

    try {
      //const response = await axios.post("/spring-mvc/api/members",  // 개발
      const response = await axios.post("https://www.yeawonlee.com/spring-mvc/api/members",    // 배포
        {
          idx: e.data.idx,
          id: e.data.id,
          password: e.data.password,
          name: e.data.name,
          email: e.data.email,
        }
        /*,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }*/
      );

      this.setState({ data: response.data });
      console.log(response.data);
      this.getMembers();
    } catch (e) {
      // 여기서 에러가 나는 듯. Network Error
      console.error(e);
    }
  };

  // (PUT) 회원 정보 수정
  putMember = async (e) => {
    //onRowUpdating 매개변수 key: 행의 키
    //onRowUpdating 매개변수 newData: 행의 업데이트된 데이터
    console.log(`put test key: ${e.key}`); // put test key: 27(선택한 키 값)
    console.log(`put test new data: ${e.newData}`); // put test new data: [object Object]

    try {
      //const response = await axios.put(`/spring-mvc/api/members/${e.key}`, // 개발
      const response = await axios.put(`https://www.yeawonlee.com/spring-mvc/api/members/${e.key}`,   // 배포
        {
          idx: e.oldData.idx,
          id: (e.newData.id != null) ? e.newData.id : e.oldData.id,
          password: (e.newData.password != null) ? e.newData.password : e.oldData.password,
          name: (e.newData.name != null) ? e.newData.name : e.oldData.name,
          email: (e.newData.email != null) ? e.newData.email : e.oldData.email
        }
      );
      this.setState({ data: response.data });
      console.log(`data(state): ${this.state.data.data}`);
      this.getMembers();
    } catch (e) {
      console.error(e);
    }
  };

  // (DLETE) 회원 삭제
  deleteMember = async (e) => {
    //onRowRemoving의 매개변수 key: 행의 키
    console.log(`delete test key: ${e.key}`); // delete test key: 27(선택한 키 값)
    try {
      const response = await axios.delete(
        `https://www.yeawonlee.com/spring-mvc/api/members/${e.key}`
      );
      this.setState({ data: response.data });
      this.getMembers();
    } catch (e) {
      console.error(e);
    }
  };

  /////////////////////////////////////////////////////////////////////////////////////////

  // page, nav button ...

  showPageSizeSelectorChange = (value) => {
    this.setState({
      ...this.state,
      showPageSizeSelector: value,
    });
  };

  showInfoChange = (value) => {
    this.setState({
      ...this.state,
      showInfo: value,
    });
  };

  showNavButtonsChange = (value) => {
    this.setState({
      ...this.state,
      showNavButtons: value,
    });
  };

  customizeColumns(columns) {
    columns[0].width = 70;
  }

  /////////////////////////////////////////////////////////////////////////////////

  render() {
    return (
      <div className="App">
        <Header title="Member list"></Header>
        <main>
          <section>
            <div>
              <div className="options">
                <div className="caption">Options</div>
                <div className="option-container">
                  <div className="option">
                    <CheckBox
                      id="showPageSizes"
                      text="Show Page Size Selector"
                      value={this.state.showPageSizeSelector}
                      onValueChange={this.showPageSizeSelectorChange}
                    ></CheckBox>
                  </div>

                  <div className="option">
                    <CheckBox
                      id="showInfo"
                      text="Show Info Text"
                      value={this.state.showInfo}
                      onValueChange={this.showInfoChange}
                    ></CheckBox>
                  </div>

                  <div className="option">
                    <CheckBox
                      id="showNavButtons"
                      text="Show Navigation Buttons"
                      value={this.state.showNavButtons}
                      onValueChange={this.showNavButtonsChange}
                    ></CheckBox>
                  </div>
                </div>
              </div>

              <React.Fragment>
                <DataGrid
                  id="gridContainer"
                  dataSource={this.state.data}
                  RemoteOperations={true}
                  keyExpr="idx"
                  showBorders={true}
                  hoverStateEnabled={true}
                  customizeColumns={this.customizeColumns}
                  onRowInserting={this.onRowInserting}
                  onRowUpdating={this.onRowUpdating}
                  onRowRemoving={this.onRowRemoving}
                >
                  <Column
                    dataField="idx"
                    dataType="number"
                    caption="No"
                    width={70}
                  />
                  <Column dataField="id" dataType="string" />
                  <Column dataField="password" dataType="string" />
                  <Column dataField="name" dataType="string" />
                  <Column dataField="email" dataType="string" />

                  <Scrolling rowRenderingMode="virtual"></Scrolling>
                  <Paging> defualtPageSize={10}</Paging>

                  <Pager
                    visible={true}
                    allowedPageSizes={allowedPageSizes}
                    showPageSizeSelector={this.state.showPageSizeSelector}
                    showInfo={this.state.showInfo}
                    showNavigationButtons={this.state.showNavButtons}
                  ></Pager>

                  <Editing
                    mode="row"
                    allowAdding={true}
                    allowUpdating={true}
                    allowDeleting={true}
                  ></Editing>
                </DataGrid>
              </React.Fragment>
            </div>
          </section>
        </main>
        <BackButton></BackButton>
      </div>
    );
  }
}

export default Members;
