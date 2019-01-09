import React from 'react';
import BuildControl from './BuildControl/BuildControl';
import classes from './BuildControls.css';

const buildControl = [
	{label : 'Salad', type : 'salad'},
	{label : 'Bacon', type : 'bacon'},
	{label : 'Cheese', type : 'cheese'},
	{label : 'Meat', type : 'meat'},
];

const buildControls = (props) => (
		<div className={classes.BuildControls}>
			<p>Burger Price: <strong> {props.totalPrice.toFixed(2)} $</strong></p>
			{ buildControl.map( crl => {
				return <BuildControl 
					key={crl.label} 
					label={crl.label}
					add = { () => props.addIng(crl.type)}
					less = { () => props.lessIng(crl.type)} 
					disable = {props.disableInfo[crl.type]} /> 
			}) }
			<button 
				className={classes.OrderButton} 
				disabled = {!props.disable} 
				onClick = {props.purchasing} >{props.isAuth ? "ORDER BURGER" : "SINGIN TO ORDER"}</button>
		</div>
	);

export default buildControls;