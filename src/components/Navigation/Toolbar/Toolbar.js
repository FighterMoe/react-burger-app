import React from 'react';
import classes from './Toolbar.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import SideDrawToggle from '../SideDrawer/SideDrawToggle/SideDrawToggle';

const toolbar = (props) => (
	<header className={classes.Toolbar}>
		<SideDrawToggle 
			toggleSideDraw = {props.toggleSideDraw}
		/>

		<div className={classes.Logo}>
			<Logo />
		</div>

		<nav className={classes.DesktopOnly}>
			<NavigationItems isAuthenticate = {props.isAuthenticate}/>
		</nav>
	</header>
);

export default toolbar;