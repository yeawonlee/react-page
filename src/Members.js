import React, { Component } from "react";
import './Members.css';
import Header from './Header';
import BackButton from './BackButton';
import axios from "axios";

import DataGrid, { Scrolling, Pager, Paging, Column, Selection, Editing, Popup, Form } from 'devextreme-react/data-grid';
import { CheckBox } from "devextreme-react/check-box";
import { Item } from "devextreme-react/form";
import { members } from './data.js';

/*
* Record Paging (https://js.devexpress.com/Demos/WidgetsGallery/Demo/DataGrid/RecordPaging/React/Light/) 
* Row Selection (https://js.devexpress.com/Demos/WidgetsGallery/Demo/DataGrid/RowSelection/React/Light/)
* Popup Editing (https://js.devexpress.com/Demos/WidgetsGallery/Demo/DataGrid/PopupEditing/React/Light/)
*/

const allowedPageSizes = [5, 10, 'all'];

class Members extends Component {

    constructor(props) {
        super(props);

        this.state = {
            showPageSizeSelector: true,
            showInfo: true,
            showNavButtons: true,

            showMemberInfo: false,
            selectedRowID: '',
            selectedRowName: '',
            selectedRowEmail: '',
        };

        this.onSelectionChanged = this.onSelectionChanged.bind(this);
    }

    // (GET) 전체 회원 조회
    getMembers = async () => {
        try {
            const response = await axios.get("/spring-mvc/api/members");
            this.setState({data: response.data});

        } catch (e) {
            console.error(e);
        }
    };

    // (GET) 특정 회원 조회
    getMember = async () => {
        try {
            const response = await axios.get('/spring-mvc/api/members', {
              params: {
                // url/parameter
                idx: 2
              }
            })
            this.setState({data: response.data});

        } catch (e) {
            console.error(e);
        }
    };

    // (POST) 회원 등록
    postMember = async () => {
        try {
            const response = await axios.post('/api/members', {
              id: "idddd",
              password: "1111",
              name: "이름",
              email: "eemail@naver.com"
            })
            this.setState({data: response.data});
            
        } catch (e) {
            console.error(e);
        }
      };

    // (PUT) 회원 정보 수정
    putMember = async () => {
        try {
            const response = await axios.put('/spring-mvc/api/members', {
              idx: 1,
              id: "idid",
              password: "0000",
              name: "예원",
              email: "000@naver.com"
            })
            this.setState({data: response.data});
            
        } catch (e) {
            console.error(e);
        }
    };
    
    // (DLETE) 회원 삭제
    deleteMember = async () => {
        try {
            const response = await axios.delete('/spring-mvc/api/members', {
              params: {
                // url/parameter
                idx: 7
              }
            })
            this.setState({data: response.data});
            
        } catch (e) {
            console.error(e);
        }
    };

    componentDidMount () {

        this.getMembers()

        /*
        // user id(userId)가 props를 통해 넘어온다고 가정하면,
        const { userId } = this.props;
        Ajax.getMember(userId);
        */
    }


    showPageSizeSelectorChange = (value) => {
        this.setState({
            ...this.state,
            showPageSizeSelector: value
        });
    }

    showInfoChange = (value) => {
        this.setState({
            ...this.state,
            showInfo: value
        });
    }

    showNavButtonsChange = (value) => {
        this.setState({
            ...this.state,
            showNavButtons: value
        });
    }

    customizeColumns(columns) {
        columns[0].width = 70;
    }

    onSelectionChanged({ selectedRowsData }) {
        const data = selectedRowsData[0];
    
        this.setState({
          showMemberInfo: !!data,
          selectedRowID: data && data.ID,
          selectedRowName: data && data.Name,
          selectedRowEmail: data && data.Email,
        });
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
                                    dataSource={members}
                                    keyExpr="ID"
                                    showBorders={true}
                                    hoverStateEnabled={true}
                                    customizeColumns={this.customizeColumns}
                                    onSelectionChanged={this.onSelectionChanged}
                                >
                                    <Selection mode="single" />
                                    <Column dataField="No" caption="No" width={70} />
                                    <Column dataField="ID" />
                                    <Column dataField="Name" />
                                    <Column dataField="Email" />
                                    <Scrolling rowRenderingMode='virtual'></Scrolling>
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
                                        allowDeleting={true}>
                                        <Popup title="Member Info" showTitle={true} width={700} height={525}/>
                                        <Form>
                                            <Item itemType="group" colCount={1} colSpan={2}>
                                                <Item dataField="No"/>
                                                <Item dataField="ID"/>
                                                <Item dataField="Password"/>
                                                <Item dataField="Name"/>
                                                <Item dataField="Email"/>
                                            </Item>
                                        </Form>
                                    </Editing>
                                </DataGrid>

                                <hr/>

                                {
                                    this.state.showMemberInfo && <div id="member-info">
                                        <p className="member-notes">
                                            ID : {this.state.selectedRowID}<br/>
                                            Name : {this.state.selectedRowName}<br/> 
                                            Email : {this.state.selectedRowEmail}
                                        </p>
                                    </div>
                                }

                                {/*
                                {
                                    this.state.data && <div id="member-info">
                                        <p className="member-notes">
                                            {this.state.data}
                                        </p>
                                    </div>
                                
                                }
                                */}
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