import React from 'react';
import { FaClipboard, FaTimes} from 'react-icons/fa'

import { deleteItem } from '../../store/actions'
import { bindActionCreators } from 'redux'
import { connect } from "react-redux";

import './tile.style.scss';

class Tile extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isHovered: false
        };

        this.handleHover = this.handleHover.bind(this);
        this.handleDeleteItem = this.handleDeleteItem.bind(this);

        this.deleteItem = props.deleteItem.bind(this);
    }

    handleHover() {
        this.setState(state => ({
            isHovered: !state.isHovered
        }))
    }

    handleDeleteItem() {
        this.deleteItem(this.props.mediaContent);
    }

    render() {
        return (
            <div
                onMouseEnter={this.handleHover}
                onMouseLeave={this.handleHover}
                className={`tile-card ${this.state.isHovered ? "shadow" : "shadow-sm"}`}
            >
                <div className={`action-icons-group ${this.state.isHovered ? "" : "hidden"}`}>
                    <button className="tile-action-button" onClick={this.handleDeleteItem}><FaTimes className="icon" size={22}/></button>
                    <button className="tile-action-button"><FaClipboard className="icon" size={20}/></button>
                </div>
                {this.props.mediaContent && (
                    <img
                        className="tile-media-content"
                        src={this.props.mediaContent.content}
                        alt="content"
                    ></img>
                )}
            </div>
        );
    }
}

function mapStateToProps() {
    return {}
}

function mapActionsToProps(dispatch) {
    return {
        deleteItem: bindActionCreators(deleteItem, dispatch)
    }
}

export default connect(mapStateToProps, mapActionsToProps)(Tile);
