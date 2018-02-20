import React, { Component } from 'react';
import axios from '../../axiosOrders';
import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import Spinner from '../../components/UI/Spinner/Spinner';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actionTypes from '../../store/actions';
import { connect } from 'react-redux';

class BurgerBuilder extends Component {
    state = {
        purchasing: false,
        loading: false,
        error: false
    }

    componentDidMount () {
        // axios.get('/ingredients.json')
        //     .then(resp => {
        //         this.setState({
        //             ingredients: resp.data
        //         });
        //     })
        //     .catch(err => {
        //         this.setState({
        //             error: true
        //         });
        //     });
    }

    updatePurchasedState = () => {
        const sum = Object.keys(this.props.ingr)
            .map(ingKey => {
                return this.props.ingr[ingKey];
            }).reduce((sum, el) => {
                return sum + el;
            }, 0);

        return sum > 0;
    }

    purchaseHandler = () => {
        this.setState({
            purchasing: true
        });
    }

    purchaseCancelHandler = () => {
        this.setState({
            purchasing: false
        });
    }

    purchaseContinueHandler = () => {
        const queryParams = [];
        let queryStr;

        for (let i in this.props.ingr) {
            queryParams.push(encodeURIComponent(i) +
                '=' + encodeURIComponent(this.props.ingr[i]));
        }

        queryParams.push('price=' + this.state.totalPrice);

        queryStr = queryParams.join('&');

        this.props.history.push({
            pathname: '/checkout',
            search: '?' + queryStr
        });
    }

    render () {
        const disabledInfo = {
            ...this.props.ingr
        };

        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        let burger = this.state.error ? <p>Ingredients failed</p> : <Spinner />;
        let orderSummary = null;

        if (this.props.ingr) {
            burger = (
                <Aux>
                    <Burger ingredients={this.props.ingr}/>

                    <BuildControls
                        ingredientAdded={this.props.onIngredientAdded}
                        ingredientRemoved={this.props.onIngredientRemoved}
                        price={this.props.price}
                        disabled={disabledInfo}
                        ordering={this.purchaseHandler}
                        purchasable={!this.updatePurchasedState()} />
                </Aux>
            );

            orderSummary = (
                <OrderSummary
                    ingredients={this.props.ingr}
                    purchaseCanceled={this.purchaseCancelHandler}
                    price={this.props.price}
                    purchaseContinued={this.purchaseContinueHandler}/>
            );
        }

        if (this.state.loading) {
            orderSummary = <Spinner />;
        }

        return (
            <Aux>
                <Modal
                    show={this.state.purchasing}
                    modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>

                {burger}
            </Aux>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        ingr: state.ingredients,
        price: state.totalPrice
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onIngredientAdded: (ingrName) =>
            dispatch({type: actionTypes.ADD_INGREDIENT, ingredientName: ingrName}),
        onIngredientRemoved: (ingrName) =>
            dispatch({type: actionTypes.REMOVE_INGREDIENT, ingredientName: ingrName})
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));
