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
  Popup,
  Form,
} from "devextreme-react/data-grid";
import { CheckBox } from "devextreme-react/check-box";
import { Item } from "devextreme-react/form";

/*
 * Record Paging (https://js.devexpress.com/Demos/WidgetsGallery/Demo/DataGrid/RecordPaging/React/Light/)
 * Row Selection (https://js.devexpress.com/Demos/WidgetsGallery/Demo/DataGrid/RowSelection/React/Light/)
 * Popup Editing (https://js.devexpress.com/Demos/WidgetsGallery/Demo/DataGrid/PopupEditing/React/Light/)
 */

const allowedPageSizes = [5, 10, "all"];

const isNotEmpty = (value) =>
  value !== undefined && value !== null && value !== "";

function handlerErrors(response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
}


class Members extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showPageSizeSelector: true,
      showInfo: true,
      showNavButtons: true,

      data: [],
    };
  }

  componentDidMount() {
    this.getMembers();
  }

  // (GET) 전체 회원 조회
  getMembers = async () => {
    try {
      const response = await axios.get("/spring-mvc/api/members");
      this.setState({ data: response.data });
    } catch (e) {
      console.error(e);
    }
  };

  // (GET) 특정 회원 조회
  getMember = async () => {
    try {
      const response = await axios.get("/spring-mvc/api/members/3");
      this.setState({ data: response.data });
    } catch (e) {
      console.error(e);
    }
  };

  // (POST) 회원 등록
  postMember = async () => {
    try {
      const response = await axios.post("/spring-mvc/api/members", {
        id: "ID",
        password: "2468",
        name: "예원",
        email: "lalala@naver.com",
      });
      this.setState({ data: response.data });
      this.getMembers();
    } catch (e) {
      console.error(e);
    }
  };

  // (PUT) 회원 정보 수정
  putMember = async () => {
    try {
      const response = await axios.put("/spring-mvc/api/members/36", {
        idx: 36,
        id: "ooo",
        password: "0000",
        name: "ooo",
        email: "ooo@naver.com",
      });
      this.setState({ data: response.data });
      this.getMembers();
    } catch (e) {
      console.error(e);
    }
  };

  // (DLETE) 회원 삭제
  deleteMember = async () => {
    try {
      const response = await axios.delete("/spring-mvc/api/members/38");
      this.setState({ data: response.data });
      this.getMembers();
    } catch (e) {
      console.error(e);
    }
  };

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
                >
                  <Column dataField="idx" caption="No" width={70} />
                  <Column dataField="id" />
                  <Column dataField="password" />
                  <Column dataField="name" />
                  <Column dataField="email" />
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
                    mode="popup"
                    allowAdding={true}
                    allowUpdating={true}
                    allowDeleting={true}
                  >
                    <Popup
                      title="Member Info"
                      showTitle={true}
                      width={700}
                      height={525}
                    />
                    <Form>
                      <Item itemType="group" colCount={1} colSpan={2}>
                        <Item dataField="No" />
                        <Item dataField="ID" />
                        <Item dataField="Password" />
                        <Item dataField="Name" />
                        <Item dataField="Email" />
                      </Item>
                    </Form>
                  </Editing>
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
