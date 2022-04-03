import React, { useState } from "react";
import "devextreme/dist/css/dx.common.css";
import "devextreme/dist/css/dx.light.css";
//import "./App.css";

import ODataStore from "devextreme/data/odata/store";

import DataGrid, {
  Column,
  ColumnChooser,
  ColumnFixing,
  Grouping,
  GroupPanel,
  Pager,
  Paging,
  SearchPanel,
  RowDragging,
} from "devextreme-react/data-grid";

import DiscountCell from "./GridTest_DiscountCell";

const pageSizes = [10, 25, 50, 100];

const dataSourceOptions = {
  store: new ODataStore({
    url: "https://js.devexpress.com/Demos/SalesViewer/odata/DaySaleDtoes",
    key: "Id",
    beforeSend(request) {
      request.params.startDate = "2020-05-10";
      request.params.endDate = "2020-05-15";
    },
  }),
};

const GridTest = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [tasks, setTasks] = useState();

  const onContentReady = (e) => {
    if (!collapsed) {
      e.component.expandRow(["EnviroCare"]);
      setCollapsed(true);
    }
  };

  /**
   * [Local Reordering] : DataGrid를 사용하면 행을 끌어다 놓을 수 있습니다
   * https://js.devexpress.com/Demos/WidgetsGallery/Demo/DataGrid/LocalReordering/React/Light/
   */

  const onReorder = (e) => {
    const visibleRows = e.component.getVisibleRows();
    const newTasks = [...tasks];  // error. 수정해야 함
    const toIndex = newTasks.indexOf(visibleRows[e.toIndex].data);
    const fromIndex = newTasks.indexOf(e.itemData);

    newTasks.splice(fromIndex, 1);
    newTasks.splice(toIndex, 0, e.itemData);

    setTasks(newTasks);
  }

  return (
    <>
      <h1>Grid Test</h1>

      <DataGrid
        dataSource={dataSourceOptions}
        onContentReady={onContentReady}
        showBorders={true}
        allowColumnReordering={true}
        allowColumnResizing={true} // 사용자가 열 크기 조정 허용
        rowAlternationEnabled={true}  // 찾아보기
        columnAutoWidth={true} // 모든 열의 너비가 내용에 맞게 조정. 내용이 더 넓은 경우 가로 스크롤 발생
        columnMinWidth={50} // 열 최소 너비
      >
        <RowDragging
            allowReordering={true}
            onReorder={onReorder}
        />

        <ColumnChooser enabled={true} />  {/* ColumnChooser 사용 */}
        <ColumnFixing enabled={true} /> {/* 고정 컬럼 사용 */}
        <GroupPanel visible={true} />
        <SearchPanel visible={true} highlightCaseSensitive={true} />
        <Grouping autoExpandAll={false} />

        <Column dataField="Product" groupIndex={0} />
        <Column
          dataField="Amount"
          caption="Sale Amount"
          dataType="number"
          format="currency"
          alignment="right"
          fixed={true}
        />
        <Column
          dataField="Discount"
          caption="Discount %"
          dataType="number"
          format="percent"
          alignment="right"
          alignGrouping={false}
          cellRender={DiscountCell}
          cssClass="bullet"
        />
        <Column dataField="SaleDate" dataType="date" />
        <Column dataField="Region" dataType="string" visible={false}/>  {/* hidden column. ColumnChooser에서 */}
        <Column dataField="Sector" dataType="string" />
        <Column dataField="Channel" dataType="string" />
        <Column dataField="Customer" dataType="string" width={150} />
        <Column dataField="Channel" dataType="string" />
        <Column dataField="Channel" dataType="string" />
        <Column dataField="Channel" dataType="string" />
        <Column dataField="Channel" dataType="string" />
        <Column dataField="Channel" dataType="string" />
        <Column dataField="Channel" dataType="string" />
        <Column dataField="Channel" dataType="string" />
        <Column dataField="Channel" dataType="string" />

        <Pager allowedPageSizes={pageSizes} showPageSizeSelector={true} />
        <Paging defaultPageSize={10} />
      </DataGrid>
    </>
  );
};

export default GridTest;
