import React from 'react';
import classes from './SideDrawer.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Aux from '../../../hoc/Reactaux/ReactAux';

const sidedrawer = (props) => { 
	let style = [classes.SideDrawer, classes.Close];

		if( props.show ) {
			style = [classes.SideDrawer, classes.Open];
		}

	return(
		<Aux>
			<Backdrop 
				show={props.show}
				clicked = {props.close} 
			/>

			<div className={style.join(' ')}>
				<div className={classes.Logo}>
					<Logo />
				</div>

				<nav>
					<NavigationItems />
				</nav>
			</div>
		</Aux>
	)
}

export default sidedrawer;