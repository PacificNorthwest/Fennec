import React from 'react';
import ResizeObserver from 'react-resize-detector';
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';

import { FaClipboard, FaTimes} from 'react-icons/fa';
import { Spinner } from 'react-bootstrap';


import downloadableRecordTypes from '../../common/constants/downloadableRecordTypes';
import VideoComponentProviderService from '../../services/videoComponentsProviderService';

import { deleteItem, copyToClipboard } from '../../store/actions';

import './tile.style.scss';

class Tile extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isHovered: false,
            loading: downloadableRecordTypes.includes(this.props.mediaContent.type)
        };

        this.handleHover = this.handleHover.bind(this);
        this.handleDeleteItem = this.handleDeleteItem.bind(this);
        this.handleCopyItem = this.handleCopyItem.bind(this);

        this.deleteItem = props.deleteItem.bind(this);
        this.copyToClipboard = props.copyToClipboard.bind(this);
        this.onLoad = this.onLoad.bind(this);
        this.getMediaComponent = this.getMediaComponent.bind(this);
    }

    handleHover(isHovered) {
        this.setState({
            isHovered
        })
    }

    handleDeleteItem() {
        this.deleteItem(this.props.mediaContent);
    }

    handleCopyItem() {
        this.copyToClipboard(this.props.mediaContent);
    }

    onLoad() {
        this.setState({
            loading: false
        });
    }

    getMediaComponent(item) {
        switch (item.type) {
            case 'image': return <img className="tile-media-content" src={item.content} alt="item" onLoad={this.onLoad}/>;
            case 'link': return <a className="tile-media-content" href={item.content} onLoad={this.onLoad}>{item.content}</a>;
            case 'video': return <div onLoad={this.onLoad}>{VideoComponentProviderService.getVideoComponent(item)}</div> 
            default: return <span className="tile-media-content" onLoad={this.onLoad}>{item.content}</span>
        }
    }

    render() {
        if (!this.props.mediaContent) {
            return null;
        }

        let mediaComponent = this.getMediaComponent(this.props.mediaContent);

        return (
            <div
                onMouseEnter={() => this.handleHover(true)}
                onMouseLeave={() => this.handleHover(false)}
                className={`tile-card ${this.state.isHovered ? "shadow" : "shadow-sm"}`}
            >
                <ResizeObserver handleHeight onResize={this.props.onSizeChanged}/>
                <div className={`action-icons-group ${this.state.isHovered ? "" : "hidden"}`}>
                    <button className="tile-action-button" onClick={this.handleDeleteItem}><FaTimes className="icon" size={22}/></button>
                    <button className="tile-action-button" onClick={this.handleCopyItem}><FaClipboard className="icon" size={20}/></button>
                </div>
                {this.state.loading && <Spinner animation="grow" className="loading-indicator"/>}
                <div className={`media-content-container media-${this.props.mediaContent.type}-container`}>
                    {mediaComponent}
                </div>
            </div>
        );
    }
}

function mapStateToProps() {
    return {}
}

function mapActionsToProps(dispatch) {
    return {
        deleteItem: bindActionCreators(deleteItem, dispatch),
        copyToClipboard: bindActionCreators(copyToClipboard, dispatch)
    }
}

export default connect(mapStateToProps, mapActionsToProps)(Tile);
