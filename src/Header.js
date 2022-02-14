import 'devextreme/dist/css/dx.common.css';
import 'devextreme/dist/css/dx.light.css';
import './App.css'
import React from 'react';

const Header = props => {
    return (
        <header>
            <h1> {props.title} </h1>
        </header>
    );
}

export default Header;