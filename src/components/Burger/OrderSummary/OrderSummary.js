import React from 'react';
import Aux from '../../../hoc/Reactaux/ReactAux';
import Button from '../../UI/Button/Button';


const orderSummary = (props) => {
	const ingList = Object.keys(props.ingredients).map( ingkey => {
		return <li key={ingkey} > {ingkey} : {props.ingredients[ingkey]} </li>
	});

	return (
		<Aux>
			<h2>Your Order</h2>
			<p>Delicous burger with the following ingredients: </p>
				<ul>
					{ingList}
				</ul>
			<p><strong>Total price: {props.totalPrice.toFixed(2)} $</strong></p>
			<p>Containue checkout?</p>

			<Button 
				btnType="Danger"
				clicked= {props.cancelHandler} >CANCEL</Button>
			<Button 
				btnType="Success"
				clicked = {props.containueHandler} >CONTAINUE</Button>
		</Aux>
		);
}

export default orderSummary;