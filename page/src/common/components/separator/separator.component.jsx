import React from 'react';
import PropTypes from 'prop-types';

export default class SeparatorComponent extends React.Component {
    static propTypes = {
        color: PropTypes.string,
        thickness: PropTypes.number
    }
    
    static defaultProps = {
        color: 'black',
        thickness: 1
    }

    render() {
        return (
            <div style={{
                height: this.props.thickness,
                backgroundColor: this.props.color,
                color: this.props.color
            }}></div>
        )
    }
}