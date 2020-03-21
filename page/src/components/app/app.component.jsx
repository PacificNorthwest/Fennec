import React from "react";
import ContentGrid from "../content/content.component";

import { initializeItems } from '../../store/actions'
import { bindActionCreators } from 'redux'
import { connect } from "react-redux";
import { loadItems } from '../../data/chromeStorageItemsProvider'

import "bootstrap/dist/css/bootstrap.min.css";
import "./app.style.scss";

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            ready: props.ready
        }

        this.initializeItems = props.initializeItems.bind(this);
    }

    async componentDidMount() {
        if (!this.state.ready) {
            const records = await loadItems();
            this.initializeItems(records);
        }
    }

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <img src="/fennec.png" className="App-logo" alt="logo" />
                    <p>Fennec</p>
                </header>
                <ContentGrid />
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        ready: state.ready
    }
}

function mapActionsToProps(dispatch) {
    return {
        initializeItems: bindActionCreators(initializeItems, dispatch)
    }
}

export default connect(mapStateToProps, mapActionsToProps)(App);