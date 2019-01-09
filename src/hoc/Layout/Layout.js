import React, {Component} from 'react';
import Aux from '../Reactaux/ReactAux';
import classes from './Layout.css'; 
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import {connect} from 'react-redux';
//import * as actionTypes from '../../store/actions/index';

class Layout extends Component {
	state = {
		showSidedraw: false,
	} 

	closeSidedrawHandler = () => {
		this.setState({showSidedraw : false});
	}

	sideDrawToggleHandler = () => {
		this.setState( prevState => {
			return {showSidedraw : !prevState.showSidedraw}
		});
	}

	render() {
		return (
			<Aux>
				<SideDrawer 
					show = {this.state.showSidedraw} 
					close = {this.closeSidedrawHandler}
					isAuthenticate = {this.props.isAuth}
				/>

				<Toolbar 
					isAuthenticate={this.props.isAuth}
					toggleSideDraw = {this.sideDrawToggleHandler} />

				<main className={classes.content}>
					{this.props.children} 
				</main>
			</Aux>
		)
	}
}

const mapStateToProps = state => {
	return {
		isAuth : state.auth.token !== null,
	}
}

export default connect(mapStateToProps)(Layout);