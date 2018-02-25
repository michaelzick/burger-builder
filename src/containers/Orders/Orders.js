import React, { Component } from 'react';
import axios from '../../axiosOrders';
import Order from '../../components/Order/Order';
import classes from './Orders.css';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

class Orders extends Component {
    state = {
        orders: [],
        loading: true
    }

    componentDidMount () {
        axios.get('/orders.json')
            .then(resp => {
                const fetchedOrders = [];

                for (let key in resp.data) {
                    fetchedOrders.push({
                        ...resp.data[key],
                        id: key
                    });
                }

                this.setState({
                    loading: false,
                    orders: fetchedOrders
                });
            })
            .catch(err => {
                this.setState({
                    loading: false
                });
            });
    }

    render () {
        let orders = this.state.orders.length ?
            this.state.orders.map((order) => (
                    <Order
                        ingredients={order.ingredients}
                        price={+order.price}
                        key={order.id}
                    />
            )) : <h1 className={classes.NoOrders}>You don't have any orders yet</h1>;

        return (
            <div>
                {orders}
            </div>
        );
    }
}

export default withErrorHandler(Orders, axios);
