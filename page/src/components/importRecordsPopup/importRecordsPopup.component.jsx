import React from 'react';
import Popup from 'reactjs-popup';
import Dropzone from 'react-dropzone';

import { FaTimes } from 'react-icons/fa';

import { bindActionCreators } from 'redux';
import { connect } from "react-redux";

import { importRecords, closeImportPopup } from './../../store/actions'

import './importRecordsPopup.style.scss'

class ImportRecordsPopupComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            open: props.open,
            errorOcured: false
        };

        this.importRecords = props.importRecords.bind(this);
        this.closeImportPopup = props.closeImportPopup.bind(this);

        this.handleImportRecords = this.handleImportRecords.bind(this);
        this.handleImportError = this.handleImportError.bind(this);
        this.handleClosePopup = this.handleClosePopup.bind(this);
    }

    componentWillReceiveProps(props) {
        this.setState({
            open: props.open,
            errorOcured: false
        })
    }

    handleImportRecords(files) {
        const recordsFile = files[0];

        if (recordsFile) {
            const fileReader = new FileReader();
            fileReader.readAsText(recordsFile, 'UTF-8');
            fileReader.onerror = this.handleImportError;
            fileReader.onload = e => {
                try {
                    const records = JSON.parse(e.target.result);
                    if (this.validateRecords(records)) {
                        this.importRecords(records);
                    } else {
                        this.handleImportError();
                    }
                } catch {
                    this.handleImportError();
                }
            }
        }
    }

    handleImportError() {
        this.setState({
            errorOcured: true
        })
    }

    handleClosePopup() {
        this.closeImportPopup();
    }

    render() {
        return (
            <Popup modal closeOnEscape closeOnDocumentClick lockScroll
                open={this.state.open}
                onClose={this.handleClosePopup}
                contentStyle={{
                    borderRadius: 5
                }}>
                <div>
                    <button className="popup-close-button" onClick={this.handleClosePopup}>
                        <FaTimes className="icon" size={30} />
                    </button>
                    <Dropzone multiple={false} onDropAccepted={this.handleImportRecords}>
                        {({ getRootProps, getInputProps }) => (
                            <div {...getRootProps({ className: `dropzone ${this.state.errorOcured ? 'error' : ''}` })}>
                                <input {...getInputProps()} />
                                <p>{
                                    this.state.errorOcured
                                        ? "Failed to import records :("
                                        : "Drag 'n' drop your JSON records file here, or click to select a file"
                                }
                                </p>
                            </div>
                        )}
                    </Dropzone>
                </div>
            </Popup>
        )
    }

    validateRecords(records) {
        if (!Array.isArray(records)) {
            return false;
        }

        for (let record of records) {
            if (!record.content || !record.type) {
                return false;
            }
        }

        return true;
    }
}

function mapStateToProps() {
    return {}
}

function mapActionsToProps(dispatch) {
    return {
        importRecords: bindActionCreators(importRecords, dispatch),
        closeImportPopup: bindActionCreators(closeImportPopup, dispatch)
    }
}

export default connect(mapStateToProps, mapActionsToProps)(ImportRecordsPopupComponent);