import React from 'react';

import Burger from '../../Burger/Burger';

import Button from '../../UI/Button/Button';

import classes from './CheckoutSummary.css';

const checkoutSummary = (props) => (
	<div className={classes.CheckoutSummary}>
		<h3>Choeckout Your Order</h3>
		<Burger ingredients={props.ingredients}/>

		<Button btnType="Danger" clicked={props.cancle}> CANCLE </Button>
		<Button btnType="Success" clicked={props.containue}> CONTAINUE </Button>
	</div>
);

export default checkoutSummary;