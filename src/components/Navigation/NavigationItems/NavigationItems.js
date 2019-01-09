import React from 'react';
import classes from './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = (props) => {
	
	return (
		<ul className={classes.NavigationItems}>
			<NavigationItem link="/" exact>BurgerBuilder</NavigationItem>
			{props.isAuthenticate ? <NavigationItem link="/orders">Order</NavigationItem>:null}
			{props.isAuthenticate ? <NavigationItem link="/logout">Logout</NavigationItem>
				:<NavigationItem link="/auth">Authentication</NavigationItem>
			}
		</ul>
	);
}

export default navigationItems;