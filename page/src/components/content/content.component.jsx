import React from 'react';
import StackGrid from 'react-stack-grid';

import { connect } from 'react-redux'
import Tile from '../tile/tile.component';

import './content.style.scss'

class ContentGrid extends React.Component {
    render() {
        const { records } = this.props;
        const recordTiles = records.map(r => <Tile mediaContent={r}/>);

        return (
            <div id="content-grid">
                <StackGrid columnWidth={450}>
                    {recordTiles.length > 0
                        ? recordTiles
                        : <span>No records yet :(</span>}
                </StackGrid>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        records: [...state.records]
    };
}

export default connect(mapStateToProps)(ContentGrid);