import "devextreme/dist/css/dx.common.css";
import "devextreme/dist/css/dx.light.css";
import "./App.css";
import React, { useState } from "react";

import List from "devextreme-react/list.js";
import { TreeView } from "devextreme-react";
import { Routes, Route, Link } from "react-router-dom";

const navigation = [
  { id: 1, text: "Member Service" },
  { id: 2, text: "Map Control" },
  {
    id: 3,
    text: "UI Component Test",
    expanded: true,
    items: [
      {
        id: "3_1",
        text: "Grid Test",
      },
      {
        id: "3_2",
        text: "Pivot Grid Test",
      },
      {
        id: "3_3",
        text: "Chart Test",
      },
      {
        id: "3-4",
        text: "Editor (text, memo, richtext)",
      },
      {
        id: "3-5",
        text: "WYSIWYG editor (html, markdown)",
      },
    ],
  },
];

const NavigationList = () => {
  const [selectedNode, setSelectedNode] = useState(navigation[0]);

  const selectItem = (e) => {
    setSelectedNode(e.itemData);
    /**
     * 선택했을 때, 해당 페이지를 가져와 보여주기
     */
    console.log(`e.text : ${e.itemData.text}`);
    if (e.itemData.id === 1) {
      // Router로 화면에 Member List 페이지
    }
  };

  const renderItem = (data) => {
    console.log(`data: ${data}`);

    return (
      <div>
        <Link to={"/"}>
          <div className="dx-list-item-icon-container">
            <i className={`dx-icon dx-list-icon-${data.icon}`}></i>
          </div>
        </Link>
      </div>
    );
  };

  return (
    <div className="list" style={{ width: "260px" }}>
      {/*
      <List
        dataSource={navigation}
        hoverStateEnabled={false}
        activeStateEnabled={false}
        focusStateEnabled={false}
        className="panel-list dx-theme-accent-as-background-color"
      />
      */}
      <TreeView
        items={navigation}
        /*onItemClick={selectItem}*/
        searchEnabled={true}
        searchMode="contains"
        selectionMode="single"
        selectByClick={true}
        onItemSelectionChanged={selectItem}
        /*itemRender={renderItem}*/
      />
    </div>
  );
};

export default NavigationList;
