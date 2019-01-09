import React, {Component} from 'react';

import Order from '../../components/Order/Order';

import axios from '../../axios-order';

import ErrorHandler from '../../hoc/ErrorHandler/ErrorHandler';

import Aux from '../../hoc/Reactaux/ReactAux';

import {connect} from 'react-redux';

import * as actionTypes from '../../store/actions/index';

import Spinner from '../../components/UI/Spinner/Spinner';

class Orders extends Component {
	
	componentDidMount () {
		this.props.onFetchOrders(this.props.token, this.props.userId);
	}

	render () {
		let order = <Spinner />;
		if(!this.props.loading) {
			order = (
				<Aux>
					{ this.props.orders.map( order => {
						return <Order 
							key = {order.id}
							ingredients = {order.orders.ingredients}
							price={order.orders.price}
						/>
					})}
				</Aux>
			);
		}
		return order;
	}
}

const mapStateToProps = state => {
	return {
		orders: state.orders.orders,
		loading: state.orders.loading,
		token: state.auth.token,
		userId: state.auth.userId
	}
};

const mapDispatchToProps = dispatch =>{
	return {
		onFetchOrders: (idToken, userId) => dispatch(actionTypes.fetchOrders(idToken, userId)),
	}
};

export default connect(mapStateToProps, mapDispatchToProps)(ErrorHandler(Orders, axios));