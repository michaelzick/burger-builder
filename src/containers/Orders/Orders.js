import React, { Component } from 'react';
import axios from '../../axiosOrders';
import Order from '../../components/Order/Order';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'

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
        return (
            <div>
                {this.state.orders.map(order => (
                    <Order
                        ingredients={order.ingredients}
                        price={+order.price}
                        key={order.id}
                    />
                ))};
            </div>
        );
    }
}

export default withErrorHandler(Orders, axios);
