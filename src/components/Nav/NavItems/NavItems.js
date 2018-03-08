import React from 'react';
import classes from './NavItems.css';
import NavItem from './NavItem/NavItem';

const navItems = (props) => (
    <ul className={classes.NavItems}>
        <NavItem link='/'>Burger Builder</NavItem>
        <NavItem link='/orders'>Orders</NavItem>
        {!props.isAuthed
            ? <NavItem link='/auth'>Sign In</NavItem>
            : <NavItem link='/logout'>Sign Out</NavItem>}
    </ul>
);

export default navItems;
