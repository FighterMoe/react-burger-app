import React from 'react';
import classes from './Logo.css';
import logosrc from "../../assets/images/burger-logo.png";

const logo = (props) => (
	<div className={classes.Logo}>
		<img src={logosrc} alt="burger logo"/>
	</div>	
);

export default logo;