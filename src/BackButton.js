import "devextreme/dist/css/dx.common.css";
import "devextreme/dist/css/dx.light.css";
import "./App.css";
import React from "react";
import { Button } from "devextreme-react/button";

const BackButton = () => {
  const onClick = () => {
    window.location.replace("/");
    //window.location.href ="/";
  };

  return (
    <footer>
      <Button id="icon-back" icon="back" onClick={onClick}></Button>
    </footer>
  );
};

export default BackButton;