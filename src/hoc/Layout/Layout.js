import React, {Component} from 'react';
import { connect } from 'react-redux';
import Aux from '../Aux/Aux';
import classes from './Layout.css';
import Toolbar from '../../components/Nav/Toolbar/Toolbar';
import SideDrawer from '../../components/Nav/SideDrawer/SideDrawer';

class Layout extends Component {
    state = {
        showSideDrawer: false
    }

    sideDrawerClosedHander = () => {
        this.setState({
            showSideDrawer: false
        });
    }

    sideDrawerToggle = () => {
        this.setState((prevState) => {
            return {
                showSideDrawer: !prevState.showSideDrawer
            };
        });
    }

    render () {
        return (
            <Aux>
                <Toolbar
                    isAuthed={this.props.isAuthed}
                    toggleSideDrawer={this.sideDrawerToggle} />
                <SideDrawer
                    isAuthed={this.props.isAuthed}
                    open={this.state.showSideDrawer}
                    close={this.sideDrawerClosedHander} />
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Aux>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isAuthed: state.auth.token !== null
    };
};

export default connect(mapStateToProps)(Layout);
