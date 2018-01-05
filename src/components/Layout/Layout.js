import React, {Component} from 'react';
import Aux from '../../hoc/Aux';
import classes from './Layout.css';
import Toolbar from '../Nav/Toolbar/Toolbar';
import SideDrawer from '../Nav/SideDrawer/SideDrawer';

class Layout extends Component {
    state = {
        showSideDrawer: false
    }

    sideDrawerClosedHander = () => {
        this.setState({
            showSideDrawer: false
        });
    }

    sideDrawerOpenedHander = () => {
        this.setState({
            showSideDrawer: true
        });
    }

    render () {
        return (
            <Aux>
                <Toolbar openSideDrawer={this.sideDrawerOpenedHander} />
                <SideDrawer
                    open={this.state.showSideDrawer}
                    close={this.sideDrawerClosedHander} />
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Aux>
        );
    }
}

export default Layout;
