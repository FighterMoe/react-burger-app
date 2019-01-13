import React, { Component } from 'react';
import {Route, Switch, withRouter, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import asyncComponent from './hoc/asyncComponent/asyncComponent';

import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
// import Checkout from './containers/Checkout/Checkout';
// import Orders from './containers/Orders/Orders';
// import Auth from './containers/Auth/Auth';
// import Logout from './containers/Auth/Logout/Logout';

import * as actionTypes from './store/actions/index';

const asyncCheckout = asyncComponent( () => {
	return import('./containers/Checkout/Checkout');
});

const asyncOrders = asyncComponent( () => {
	return import('./containers/Orders/Orders');
});

const asyncAuth = asyncComponent ( () => {
	return import('./containers/Auth/Auth');
});

const asyncLogout = asyncComponent ( () => {
	return import('./containers/Auth/Logout/Logout');
});

class App extends Component {
	componentDidMount() {
		this.props.onAuthCheckState();
	}

  render() {
		let routes = (
			<Switch>
				<Route path="/auth" component={asyncAuth} />
				<Route path="/" exact component = {BurgerBuilder} />
				<Redirect to="/" />
			</Switch>
		);

		if(this.props.isAuth) {
			routes = (
				<Switch>
					<Route path="/checkout" component={asyncCheckout}/>
					<Route path="/orders" component={asyncOrders} />
					<Route path="/logout" component={asyncLogout} />
					<Route path="/auth" component={asyncAuth} />
					<Route path="/" exact component = {BurgerBuilder} />
					<Redirect to="/" />
			</Switch>
			);
		}

    return (
		<Layout>
			{routes}
		</Layout>
    );
  }
}

const mapStateToProps = state => {
	return {
		isAuth: state.auth.token !== null,
	}
}

const mapDispatchToProps = dispatch => {
	return {
		onAuthCheckState: () => dispatch(actionTypes.authCheckState()),
	}
}

export default withRouter( connect( mapStateToProps, mapDispatchToProps)(App) );
