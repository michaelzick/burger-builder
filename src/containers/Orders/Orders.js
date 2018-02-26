import React, { Component } from 'react';
import axios from '../../axiosOrders';
import Order from '../../components/Order/Order';
import classes from './Orders.css';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import { connect } from 'react-redux';
import * as actions from '../../store/actions';
import Spinner from '../../components/UI/Spinner/Spinner';

class Orders extends Component {
    componentDidMount () {
        this.props.onFetchOrders();
    }

    render () {
        let orders = <Spinner />;

        if (!this.props.loading) {
            orders = this.props.orders.length ?
                this.props.orders.map((order) => (
                        <Order
                            ingredients={order.ingredients}
                            price={+order.price}
                            key={order.id}
                        />
                )) : <h1 className={classes.NoOrders}>
                        You don't have any orders yet
                     </h1>;
        }

        return (
            <div>
                {orders}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        orders: state.order.orders,
        loading: state.order.loading
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onFetchOrders: () => dispatch(actions.fetchOrders())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));
