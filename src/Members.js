import React, { Component } from "react";
import './Members.css';
import Header from './Header';

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
                            </React.Fragment>

                        </div>
                    </section>
                </main>
            </div>
        );
    }
}

export default Members;