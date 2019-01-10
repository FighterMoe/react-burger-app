import React, {Component} from 'react';

import Button from '../../../components/UI/Button/Button';

import classes from './Contact.css';

import axios from '../../../axios-order';

import Spinner from '../../../components/UI/Spinner/Spinner';

import ErrorHandler from '../../../hoc/ErrorHandler/ErrorHandler';

import Input from '../../../components/UI/Input/Input';

import {connect} from 'react-redux';

import * as actionTypes from '../../../store/actions/index';

import {updateObject, checkValidity} from '../../../share/utility';

class Contact extends Component {
	state = {
		orderForms: {
			name: {
				elementType : "input",
				elementConfig : {
					type: "text",
					placeholder: "Your Name",
				},
				value: "",
				validation : {
					required: true,
				},
				valid: false,
				touched: false,
			},
			email: {
				elementType : "input",
				elementConfig : {
					type: "email",
					placeholder: "Your E-mail",
				},
				value: "",
				validation : {
					required: true,
					isEmail: true,
				},
				valid: false,
				touched: false,
			},
			country: {
				elementType : "input",
				elementConfig : {
					type: "text",
					placeholder: "Your Country",
				},
				value: "",
				validation : {
					required: true,
				},
				valid: false,
				touched: false,
			},
			street: {
				elementType : "input",
				elementConfig : {
					type: "text",
					placeholder: "Your Street",
				},
				value: "",
				validation : {
					required: true,
				},
				valid: false,
				touched: false,
			},
			zipCode: {
				elementType : "input",
				elementConfig : {
					type: "text",
					placeholder: "ZIP Code",
				},
				value: "",
				validation : {
					required: true,
					isNumeric : true,
					minLength: 6,
					maxLength: 6,
				},
				valid: false,
				touched: false,
			},
			deliveryMethods: {
				elementType : "select",
				elementConfig : {
					options : [
						{value: "fastest", displayValue: "Fastest"},
						{value: "cheapest", displayValue: "Chapest"},
					]
				},
				value: "",
				validation: {},
				valid: true
			},
		},
		isValidForms: false,
		touched: false
	}

	valueChangeHandler = (event, inputId) => {
		
		const updatedChildElement = updateObject(this.state.orderForms[inputId],{
			value: event.target.value,
			valid: checkValidity(this.state.orderForms[inputId].validation, 
									event.target.value),
			touched: true	
		});	
		
		const updatedForms = updateObject(this.state.orderForms,{
			[inputId] : updatedChildElement
		});

		let isValidForms = true;

		for ( let inputField in updatedForms ){
			isValidForms = updatedForms[inputField].valid && isValidForms;
		}

		this.setState({ orderForms : updatedForms, isValidForms : isValidForms});

	};

	orderBurgerHandler = (event) => {
		
		event.preventDefault();

		const inputData = {};

		for (let input in this.state.orderForms) {
			inputData[input] = this.state.orderForms[input].value;
		}

		const order = {
			ingredients: this.props.ings,
			price: this.props.price,
			orderData: inputData,
			userId : this.props.userId,
		}

		this.props.onPurchaseBurger(order, this.props.token)
	}

	render () {
		const inputData = [];

		for (let input in this.state.orderForms) {
			inputData.push({
				id: input,
				config: this.state.orderForms[input]
			})
		}

		let form = (
			<form onSubmit={this.orderBurgerHandler}>
				{
					inputData.map( formId => {
						return <Input 
							key={formId.id}
							elementType ={formId.config.elementType} 
							elementConfig = {formId.config.elementConfig} 
							value = {formId.config.value} 
							changed = { (event) => this.valueChangeHandler(event, formId.id)}
							invalid = {!formId.config.valid}  
							isTouched = {formId.config.touched} />
					})
				}

				<Button btnType = "Success"
					disabled={!this.state.isValidForms} >ORDER</Button>
			</form>);

		if (this.state.loading) {
			form = <Spinner />;
		}

		return (
				<div className={classes.Contact}>
					<h2>Enter Your Contact Data!</h2>
					{form}
				</div>
			)
	}
}

const mapStateToProp = state => {
	return {
		ings: state.burgerBuilder.ingredients,
		price: state.burgerBuilder.totalPrice,
		loading: state.orders.loading,
		token: state.auth.token,
		userId: state.auth.userId
	}
}

const mapDispatchToProp = dispatch => {
	return {
		onPurchaseBurger : (orderData, token) => { dispatch(actionTypes.purchaseBurger(orderData, token)) }
	}
}

export default connect(mapStateToProp, mapDispatchToProp) (ErrorHandler(Contact, axios));