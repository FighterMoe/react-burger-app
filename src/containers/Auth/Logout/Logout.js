import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import * as actionType from '../../../store/actions/index';

class logout extends Component {
    componentDidMount(){
        this.props.onLogout();
    }

    render () {
        return ( <Redirect to="/" /> );
    }
}

const mapDispatchToProp = dispatch => {
    return {
        onLogout: () => dispatch(actionType.logout()),
    }
}

export default connect(null, mapDispatchToProp) (logout);