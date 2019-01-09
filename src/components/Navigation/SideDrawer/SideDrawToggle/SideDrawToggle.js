import React from 'react';
import classes from './SideDrawToggle.css';

const sideDrawToggle = (props) => (
    <div 
        className = {classes.DrawerToggle} 
        onClick = {props.toggleSideDraw} >
        <div></div>
        <div></div>
        <div></div>
    </div>
);

export default sideDrawToggle;