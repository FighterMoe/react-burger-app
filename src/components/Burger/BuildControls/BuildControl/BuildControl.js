import React from 'react';
import classes from './BuildControl.css';

const buildControl = (props) => (
    <div className={classes.BuildControl}>
        <div className={classes.Label}><span>{props.label}</span></div>
        <button className={classes.Less} onClick={props.less} disabled = {!props.disable} >Less</button>
        <button className={classes.More} onClick={props.add}>More</button>
    </div>
);

export default buildControl;