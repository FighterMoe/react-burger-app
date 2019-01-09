import React from 'react';

import classes from './Order.css';

//import Aux from '../../hoc/Reactaux/ReactAux';

const order = (props) => {

	const getIngredients = [];

		for (let ingId in props.ingredients) {
			getIngredients.push( {
				name: ingId,
				amount: props.ingredients[ingId]
			} );
		}
		
	const printIngredients = getIngredients.map( ing => {
		return (
			<span
				className={classes.Ingredients} 
				key={ing.name}> 
				{ing.name}({ing.amount})
			</span>)
	});

	return(
		<div className={classes.Order}>
			<p>Ingredients: {printIngredients} </p>
			<p>Price : <strong> {Number.parseFloat(props.price).toFixed(2)} &#36; </strong></p>
		</div>
		)
}

export default order;