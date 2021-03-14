import React from "react";
import { ToastContainer, toast } from 'react-toastify';

import HeaderMenu from '../headerMenu/headerMenu.component';
import ContentGrid from "../content/content.component";
import ImportRecordsPopup from '../importRecordsPopup/importRecordsPopup.component'

import { initializeItems } from '../../store/actions';
import { bindActionCreators } from 'redux';
import { connect } from "react-redux";
import ChromeStorageService from '../../services/chromeStorageService';

import "./app.style.scss";
import 'react-toastify/dist/ReactToastify.css';

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            ready: props.ready,
            isImportPopupOpen: props.isImportPopupOpen
        }

        this.initializeItems = props.initializeItems.bind(this);
    }

    async componentDidMount() {
        if (!this.state.ready) {
            const records = await ChromeStorageService.loadItemsFromStorage();
            this.initializeItems(records);
        }
    }

    componentWillReceiveProps(props) {
        this.setState({
            ready: props.ready,
            isImportPopupOpen: props.isImportPopupOpen
        })
    }

    render() {
        return (
            <div className="app">
                <header className="app-header">
                    <div className="title-container">
                        <img src="/fennec.png" className="app-logo" alt="logo" />
                        <h1 id="header-title">Fennec</h1>
                    </div>
                    <HeaderMenu/>
                </header>
                <ContentGrid />
                <ImportRecordsPopup open={this.state.isImportPopupOpen}/>
                <ToastContainer
                    toastClassName="my-toast"
                    position={toast.POSITION.BOTTOM_RIGHT}
                    hideProgressBar={true}
                    autoClose={3000}/>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        ready: state.ready,
        isImportPopupOpen: state.isImportPopupOpen
    }
}

function mapActionsToProps(dispatch) {
    return {
        initializeItems: bindActionCreators(initializeItems, dispatch)
    }
}

export default connect(mapStateToProps, mapActionsToProps)(App);