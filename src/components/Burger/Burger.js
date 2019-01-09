import React from 'react';
import classes from './Burger.css';
import BurgerIngredients from './BurgerIngredients/BurgerIngredients';

const burger = (props) => {
	let ingredients = Object.keys(props.ingredients).map( igkey => {
		return [...Array(props.ingredients[igkey])].map( (_, i) => {
			return <BurgerIngredients key={igkey + i} type={igkey} />
		})
	}).reduce( (arr, el) => {
		return arr.concat(el);
	}, []);

	if(ingredients.length <= 0 ) {
		ingredients = <p>Start select ingredients.</p>
	}

	return(
		<div className={classes.Burger}>
			<BurgerIngredients type="bread-top" />
				{ingredients}
			<BurgerIngredients type="bread-bottom"/>
		</div>
	);
}

export default burger;