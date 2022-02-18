import React, { useEffect, useState } from "react";
import "./Members.css";
import axios from "axios";

import DataGrid, {
  Scrolling,
  Pager,
  Paging,
  Column,
  Editing,
} from "devextreme-react/data-grid";
import { CheckBox } from "devextreme-react/check-box";

//import { Outlet } from "react-router-dom";

/*
 * Record Paging (https://js.devexpress.com/Demos/WidgetsGallery/Demo/DataGrid/RecordPaging/React/Light/)
 * Row Editing and Editing Events (https://js.devexpress.com/Demos/WidgetsGallery/Demo/DataGrid/RowEditingAndEditingEvents/React/Light/)
 */

const allowedPageSizes = [5, 10, "all"];

const Members = () => {
  /**
   * useState
   * - 가장 기본적인 Hook, 함수형 컴포넌트에서 가변적인 상태를 지닐 수 있게 해 줌
   * - 함수형 컴포넌트에서 상태를 관리해야 한다면, useState 사용
   */
  const [showPageSizeSelector, setShowPageSizeSelector] = useState(true);
  const [showInfo, setShowInfo] = useState(true);
  const [showNavButtons, setShowNavButtons] = useState(true);
  const [data, setData] = useState([]);

  const onRowInserting = (e) => {
    postMember(e);
  };

  const onRowUpdating = (e) => {
    putMember(e);
  };

  const onRowRemoving = (e) => {
    deleteMember(e);
  };

  /**
   * useEffect (p. 194 ~, p. 371, 372)
   * - 리액트 컴포넌트가 렌더링 될 때마다 특정 작업을 수행하도록 설정할 수 있는 Hook
   * - componentDidMount + componentDidUpdate 형태
   * - 마운트될 때만 실행하고 싶을 때: useEffect(() => {}, []); // 두 번째 파라미터로 빈 배열
   * - 기본적으로 렌더링되고 난 직후마다 실행되며, 두 번째 파라미터 배열에 무엇을 넣는지에 따라 실행되는 조건이 달라짐
   * - 컴포넌트가 언마운트되기 전이나 업데이트되기 직전에 어떠한 작업을 수행하고 싶다면, useEffect에서 뒷정리(cleanup) 함수를 반환해 줘야 함
   * - 비동기적으로 동작한다.
   * - 주의할 점: useEffect에 등록하는 함수에 async 붙이면 X. ∵ useEffect에서 반환해야 하는 값은 뒷정리 함수.
   * -
   */
  useEffect(() => {
    getMembers();
  }, []);

  // axios GET / POST / PUT / DELETE

  /**
   * 비동기(async) : (요청과 응답이 동시 X →) 안 기다림
   * 동기(sync) : (요청과 응답이 동시에 →) 기다림
   * async/await : `async` - Promise를 동기적으로 다룰 수 있게 해 줌. 기다리도록 한다.
   */

  // (GET) 전체 회원 조회
  const getMembers = async () => {
    try {
      const response = await axios.get(
        "https://www.yeawonlee.com/spring-mvc/api/members"
      );
      setData(response.data);
    } catch (e) {
      console.error(e);
    }
  };

  // (POST) 회원 등록
  const postMember = async (e) => {
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
      const response = await axios.post(
        "https://www.yeawonlee.com/spring-mvc/api/members", // 배포
        {
          idx: e.data.idx,
          id: e.data.id,
          password: e.data.password,
          name: e.data.name,
          email: e.data.email,
        }
      );

      setData(response.data);
      console.log(response.data);
      getMembers();
    } catch (e) {
      console.error(e);
    }
  };

  // (PUT) 회원 정보 수정
  const putMember = async (e) => {
    //onRowUpdating 매개변수 key: 행의 키
    //onRowUpdating 매개변수 newData: 행의 업데이트된 데이터
    console.log(`put test key: ${e.key}`); // put test key: 27(선택한 키 값)
    console.log(`put test new data: ${e.newData}`); // put test new data: [object Object]

    try {
      //const response = await axios.put(`/spring-mvc/api/members/${e.key}`, // 개발
      const response = await axios.put(
        `https://www.yeawonlee.com/spring-mvc/api/members/${e.key}`, // 배포
        {
          idx: e.oldData.idx,
          id: e.newData.id != null ? e.newData.id : e.oldData.id,
          password:
            e.newData.password != null
              ? e.newData.password
              : e.oldData.password,
          name: e.newData.name != null ? e.newData.name : e.oldData.name,
          email: e.newData.email != null ? e.newData.email : e.oldData.email,
        }
      );
      setData(response.data);
      //console.log(`data(state): ${this.state.data.data}`);
      getMembers();
    } catch (e) {
      console.error(e);
    }
  };

  // (DLETE) 회원 삭제
  const deleteMember = async (e) => {
    //onRowRemoving의 매개변수 key: 행의 키
    console.log(`delete test key: ${e.key}`); // delete test key: 27(선택한 키 값)
    try {
      const response = await axios.delete(
        `https://www.yeawonlee.com/spring-mvc/api/members/${e.key}`
      );
      setData(response.data);
      getMembers();
    } catch (e) {
      console.error(e);
    }
  };

  /////////////////////////////////////////////////////////////////////////////////////////

  // page, nav button ...

  const showPageSizeSelectorChange = (value) => {
    setShowPageSizeSelector(value);
  };

  const showInfoChange = (value) => {
    setShowInfo(value);
  };

  const showNavButtonsChange = (value) => {
    setShowNavButtons(value);
  };

  const customizeColumns = (columns) => {
    columns[0].width = 70;
  };

  return (
    <div className="App">
      {/*<Outlet/>*/}

      {/*<Header title="Member list"></Header>*/}
      <main>
        <section>
          <div>
            <h1>Member list</h1>
            <div className="options">
              <div className="caption">Options</div>
              <div className="option-container">
                <div className="option">
                  <CheckBox
                    id="showPageSizes"
                    text="Show Page Size Selector"
                    value={showPageSizeSelector}
                    onValueChange={showPageSizeSelectorChange}
                  ></CheckBox>
                </div>

                <div className="option">
                  <CheckBox
                    id="showInfo"
                    text="Show Info Text"
                    value={showInfo}
                    onValueChange={showInfoChange}
                  ></CheckBox>
                </div>

                <div className="option">
                  <CheckBox
                    id="showNavButtons"
                    text="Show Navigation Buttons"
                    value={showNavButtons}
                    onValueChange={showNavButtonsChange}
                  ></CheckBox>
                </div>
              </div>
            </div>

            <React.Fragment>
              <DataGrid
                id="gridContainer"
                dataSource={data}
                RemoteOperations={true}
                keyExpr="idx"
                showBorders={true}
                hoverStateEnabled={true}
                customizeColumns={customizeColumns}
                onRowInserting={onRowInserting}
                onRowUpdating={onRowUpdating}
                onRowRemoving={onRowRemoving}
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
                  showPageSizeSelector={showPageSizeSelector}
                  showInfo={showInfo}
                  showNavigationButtons={showNavButtons}
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
    </div>
  );
};

export default Members;
