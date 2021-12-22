import 'devextreme/dist/css/dx.common.css';
import 'devextreme/dist/css/dx.light.css';
import './App.css'
import React, { Component } from 'react';
import { Button } from 'devextreme-react/button';

class Header extends Component {

    onClick = () => {
        window.location.replace("/");
        //window.location.href ="/";
    }

    render() {
        return (
            <footer>
                <Button
                    id='icon-back'
                    icon='back'
                    onClick={this.onClick}
                ></Button>
            </footer>
        );
    }
}

export default Header;