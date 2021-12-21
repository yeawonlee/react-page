import 'devextreme/dist/css/dx.common.css';
import 'devextreme/dist/css/dx.light.css';
import './App.css'
import React, { Component } from 'react';

class Header extends Component {
    render() {
        return (
            <header>
                <h1> {this.props.title} </h1>
            </header>
        );
    }
}

export default Header;