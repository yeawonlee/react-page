import React, { Fragment, useState } from "react";
import ColorBox from 'devextreme-react/color-box';
import NumberBox from 'devextreme-react/number-box';
import SelectBox from 'devextreme-react/select-box';
import Switch from 'devextreme-react/switch';
import TextBox from 'devextreme-react/text-box';
import './Editors.css';
import Logo from './Editors_Logo';

const noFlipTransform = 'scaleX(1)';
const transformations = [
  {
    key: 'Flip',
    items: [
      { name: '0 degrees', value: noFlipTransform },
      { name: '180 degrees', value: 'scaleX(-1)' },
    ],
  },
  {
    key: 'Rotate',
    items: [
      { name: '0 degrees', value: 'rotate(0)' },
      { name: '15 degrees', value: 'rotate(15deg)' },
      { name: '30 degrees', value: 'rotate(30deg)' },
      { name: '-15 degrees', value: 'rotate(-15deg)' },
      { name: '-30 degrees', value: 'rotate(-30deg)' },
    ],
  },
];

const Editors = () => {

    /*
    const [text, setText] = useState('UI Superhero');
    const [width, setWidth] = useState(370);
    const [height, setHeight] = useState(260);
    const [color, setColor] = useState('#f05b41');
    const [transform, setTransform] = useState(noFlipTransform);
    const [border, setBorder] = useState(false);
    */

    const [editorStates, setEditorStates] = useState({
        text: 'UI Superhero',
        width: 370,
        height: 260,
        color: '#f05b41',
        transform: noFlipTransform,
        border: false,
    });

    const handleTextChange = (e) => {
        //setText(e.value);
        setEditorStates({
            text: e.value,
        });
    }

    const handleColorChange = (e) => {
        //setColor(e.value);
        setEditorStates({
            color: e.value,
        });
    }

    const handleHeightChange = (e) => {
        //setWidth(e.value);
        //setHeight((e.value * 37) / 26);
        setEditorStates({
            width: e.value,
            height: (e.value * 37) / 26,
        });
    }

    const handleWidthChange = (e) => {
        //setWidth(e.value);
        //setHeight((e.value * 26) / 37);
        setEditorStates({
            width: e.value,
            height: (e.value * 26) / 37,
        });
    }

    const handleTransformChange = (e) => {
        //setTransform(e.value);
        setEditorStates({
            transform: e.value,
        });
    }

    const handleBorderChange = (e) => {
        //setBorder(e.value);
        setEditorStates({
            border: e.value,
        });
    }

    return (
        <Fragment>
          <div className="settings">
            <div className="column">
              <div className="field">
                <div className="label">Title</div>
                <div className="value">
                  <TextBox
                    //value={text}
                    value={editorStates.text}
                    onValueChanged={handleTextChange}
                    maxLength={40}
                    valueChangeEvent="keyup"
                  />
                </div>
              </div>
              <div className="field">
                <div className="label">Color</div>
                <div className="value">
                  <ColorBox
                    //value={color}
                    value={editorStates.color}
                    onValueChanged={handleColorChange}
                    applyValueMode="instantly"
                  />
                </div>
              </div>
            </div>
            <div className="column">
              <div className="field">
                <div className="label">Width</div>
                <div className="value">
                  <NumberBox
                    //value={width}
                    value={editorStates.width}
                    onValueChanged={handleWidthChange}
                    showSpinButtons={true}
                    max={700}
                    min={70}
                    format="#0px"
                  />
                </div>
              </div>
              <div className="field">
                <div className="label">Height</div>
                <div className="value">
                  <NumberBox
                    //value={height}
                    value={editorStates.height}
                    onValueChanged={handleHeightChange}
                    showSpinButtons={true}
                    max={700}
                    min={70}
                    format="#0px"
                  />
                </div>
              </div>
            </div>
            <div className="column">
              <div className="field">
                <div className="label">Transform</div>
                <div className="value">
                  <SelectBox
                    //value={transform}
                    value={editorStates.transform}
                    onValueChanged={handleTransformChange}
                    items={transformations}
                    grouped={true}
                    displayExpr="name"
                    valueExpr="value"
                  />
                </div>
              </div>
  
              <div className="field">
                <div className="label">Border</div>
                <div className="value">
                  <Switch
                    //value={border}
                    value={editorStates.border}
                    onValueChanged={handleBorderChange}
                  />
                </div>
              </div>
            </div>
          </div>
  
          <Logo
            text={editorStates.text}
            width={editorStates.width}
            height={editorStates.height}
            color={editorStates.color}
            transform={editorStates.transform}
            border={editorStates.border}
          />
        </Fragment>
      );
}

export default Editors;