import React from "react";
import StackGrid from "react-stack-grid";

import { connect } from "react-redux";
import Tile from "../tile/tile.component";

import "./content.style.scss";

class ContentGrid extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            recordTilesMap: new Map()
        };
    }

    componentWillReceiveProps(props) {
        const { records } = props;

        if (records) {
            this.updateRecordTiles(records);
        }
    }

    updateRecordTiles(records) {
        const recordsMap = new Map(records.map(r => [r.content, r]));
        let { recordTilesMap } = this.state;

        let newRecords = [];
        let deletedRecords = [];

        for (let record of recordsMap.values()) {
            if (!recordTilesMap.has(record.content)) {
                newRecords.push(record);
            }
        }

        for (let recordTileKey of recordTilesMap.keys()) {
            if (!recordsMap.has(recordTileKey)) {
                deletedRecords.push(recordTileKey);
            }
        }

        for (let deletedRecordKey of deletedRecords) {
            recordTilesMap.delete(deletedRecordKey);
        }

        for (let newRecord of newRecords) {
            recordTilesMap.set(
                newRecord.content,
                <Tile mediaContent={newRecord} key={newRecord.content} onSizeChanged={() => this.forceUpdate()}/>
            );
        }

        if (newRecords.length > 0 || deletedRecords.length > 0) {
            this.setState({
                recordTilesMap
            });
        }
    }

    render() {
        const recordTiles = Array.from(this.state.recordTilesMap.values());

        return (
            <div id="content-grid">
                {
                    this.props.ready
                        ? recordTiles.length > 0 
                            ? <StackGrid columnWidth={450}>{recordTiles}</StackGrid>
                            : <span className="empty-content-notification">No records for Fennec :(</span>
                        : <span className="empty-content-notification">Loading...</span>
                }
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        records: [...state.records],
        ready: state.ready
    };
}

export default connect(mapStateToProps)(ContentGrid);
