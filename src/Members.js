import React, { Component } from "react";
import './Members.css';
import Header from './Header';

class Members extends Component {
    render() {
        return (
            <div className="App">
                <Header title="Member list"></Header>
                <main>
                    <section>
                        {/* Record Paging (https://js.devexpress.com/Demos/WidgetsGallery/Demo/DataGrid/RecordPaging/React/Light/) */}

                    </section>
                </main>
            </div>
        );
    }
}

export default Members;