import React from 'react';
import Popup from 'reactjs-popup';
import { FaBars } from 'react-icons/fa';

import Separator from '../../common/components/separator/separator.component';

import { exportRecords, openImportPopup } from '../../store/actions';
import { bindActionCreators } from 'redux';
import { connect } from "react-redux";

import './headerMenu.style.scss';

class HeaderMenuComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isMenuOpen: false
        }

        this.exportRecords = props.exportRecords.bind(this);
        this.openImportPopup = props.openImportPopup.bind(this);

        this.handleExportRecords = this.handleExportRecords.bind(this);
        this.handleOpenImportPopup = this.handleOpenImportPopup.bind(this);
    }

    handleExportRecords() {
        this.exportRecords();
    }

    handleOpenImportPopup() {
        this.openImportPopup();
    }

    render() {
        return (
            <Popup position="bottom right" on="click" closeOnEscape closeOnDocumentClick
                mouseLeaveDelay={100}
                trigger={
                    <button className="header-menu-button">
                        <FaBars className="icon" size={30}/>
                    </button>
                }
                contentStyle = {{
                    zIndex: 3,
                    borderRadius: 5
                }}
            >
                <div className="menu">
                    <button className="menu-item" onClick={this.handleOpenImportPopup}>Import</button>
                    <Separator color="black"/>
                    <button className="menu-item" onClick={this.handleExportRecords}>Export</button>
                </div>
            </Popup>
        )
    }

    closeMenu() {
        this.setState({
            isMenuOpen: false
        })
    }
}

function mapStateToProps(state) {
    return {}
}

function mapActionsToProps(dispatch) {
    return {
        exportRecords: bindActionCreators(exportRecords, dispatch),
        openImportPopup: bindActionCreators(openImportPopup, dispatch)
    }
}

export default connect(mapStateToProps, mapActionsToProps)(HeaderMenuComponent)