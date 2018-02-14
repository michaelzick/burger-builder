import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {
    state = {
        ingredients: null,
        totalPrice: null
    };

    componentWillMount () {
        const query = new URLSearchParams(this.props.location.search),
              ingredients = {};
        let price;

        for (let param of query.entries()) {
            if (param[0] !== 'price') {
                ingredients[param[0]] = +param[1];
            } else {
                price = param[1];
            }
        }

        console.log('ing', ingredients);

        this.setState({
            ingredients: ingredients,
            totalPrice: price
        });
    }

    checkoutCancelHandler = () => {
        this.props.history.goBack();
    }

    checkoutContinuedHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    }

    render () {
        return (
            <div>
                <CheckoutSummary
                    checkoutCancelled={this.checkoutCancelHandler}
                    checkoutContinued={this.checkoutContinuedHandler}
                    ingredients={this.state.ingredients} />

                <Route
                    path={this.props.match.path + '/contact-data'}
                    render= {props => (
                        <ContactData
                            {...props}
                            ingredients={this.state.ingredients}
                            price={this.state.totalPrice} />
                        )} />
            </div>
        );
    }
}

export default Checkout;
