import React from 'react';
import classes from './Toolbar.css';
import Logo from '../../Logo/Logo';
import NavItems from '../NavItems/NavItems';

const toolbar = (props) => (
    <header className={classes.Toolbar}>
        <div className={classes.DesktopOnly}>
            MENU
        </div>

        <div
            onClick={props.openSideDrawer}
            className={classes.Logo}>
            <Logo />
        </div>

        <nav className={classes.DesktopOnly}>
            <NavItems />
        </nav>
    </header>
);

export default toolbar;
