import React, {Component} from 'react';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';

import {Route, Redirect} from 'react-router-dom';

import Contact from './Contact/Contact';

import {connect} from 'react-redux'; 

class Checkout extends Component {
	
	cancleCheckoutHandler = () => {
		this.props.history.goBack();
	}

	containueCheckoutHandler = () => {
		this.props.history.push('/checkout/contact-data');
	}

	render() {
		let summary = <Redirect to="/" />;

		if(this.props.ings) {
			const checkoutRedirect = this.props.purchase ? <Redirect to="/" /> : null;
			
			summary = (
				<div>
					{checkoutRedirect}
					<CheckoutSummary 
						ingredients= {this.props.ings}  
						cancle = {this.cancleCheckoutHandler} 
						containue = {this.containueCheckoutHandler} />

					<Route 
						path={this.props.match.path + '/contact-data'} 
						component = {Contact} />
				</div>
			);
		}

		return summary;
	}
}
const mapStateToProp = state => {
	return {
		ings: state.burgerBuilder.ingredients,
		purchase: state.orders.purchase
	}
}

export default connect(mapStateToProp)(Checkout);