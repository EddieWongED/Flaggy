import React from 'react';
import PropTypes from 'prop-types';
import loadingGIF from '../icons/loading.gif'
class Delayed extends React.Component {

    static defaultProps = {
        waitBeforeShow: 1000,
        animation: false
    }

    constructor(props) {
        super(props);
        this.state = {hidden : true};
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({hidden: false});
        }, this.props.waitBeforeShow);
    }

    render() {
        return this.state.hidden ? 
        this.props.animation ?      <img 
        src={loadingGIF} 
        alt="loading..."
        height="30"
        width="30"/> 
        : ""
        : this.props.children;
    }
}

Delayed.propTypes = {
  waitBeforeShow: PropTypes.number.isRequired
};

export default Delayed;