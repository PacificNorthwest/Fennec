import React from 'react';
import { X, ReplyFill } from 'react-bootstrap-icons'
import './tile.style.scss';

export class Tile extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            mediaContent: props.mediaContent,
            isHovered: false
        };

        this.handleHover = this.handleHover.bind(this);
    }

    handleHover() {
        this.setState(state => ({
            isHovered: !state.isHovered
        }))
    }

    render() {
        return (
            <div
                onMouseEnter={this.handleHover}
                onMouseLeave={this.handleHover}
                className={`tile-card ${this.state.isHovered ? "shadow" : "shadow-sm"}`}
            >
                <div className={`action-icons-group ${this.state.isHovered ? "" : "hidden"}`}>
                    <button className="tile-action-button"><X className="icon" size={35}/></button>
                    <button className="tile-action-button"><ReplyFill className="icon" size={30}/></button>
                </div>
                {this.state.mediaContent && (
                    <img
                        className="tile-media-content"
                        src={this.state.mediaContent.content}
                        alt="content"
                    ></img>
                )}
            </div>
        );
    }
}
