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

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    bacon: 0.7,
    meat: 1.3
};

class BurgerBuilder extends Component {
    state = {
        ingredients: null,
        totalPrice: 4,
        purchasable: false,
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

    addIngredientHandler = (type) => {
        const newIngredientCount = this.props.ingr[type] + 1;
        const updatedIngredients = {
            ...this.props.ingr
        };
        const priceAddition = INGREDIENT_PRICES[type];
        const newTotalPrice = this.state.totalPrice + priceAddition;

        updatedIngredients[type] = newIngredientCount;

        this.setState({
            totalPrice: newTotalPrice,
            ingredients: updatedIngredients
        });

        this.updatePurchasedState(updatedIngredients);
    }

    removeIngredientHandler = (type) => {
        const oldCount = this.props.ingr[type];

        if (!oldCount) return;

        const newIngredientCount = this.props.ingr[type] - 1;
        const updatedIngredients = {
            ...this.props.ingr
        };
        const priceAddition = INGREDIENT_PRICES[type];
        const newTotalPrice = this.state.totalPrice - priceAddition;

        updatedIngredients[type] = newIngredientCount;

        this.setState({
            totalPrice: newTotalPrice,
            ingredients: updatedIngredients
        });

        this.updatePurchasedState(updatedIngredients);
    }

    updatePurchasedState = (updatedIngredients) => {
        const sum = Object.keys(updatedIngredients)
            .map(ingKey => {
                return updatedIngredients[ingKey];
            }).reduce((sum, el) => {
                return sum + el;
            }, 0);

        this.setState({
            purchasable: sum > 0
        });
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
                        ingredientAdded={this.props.addIngredientHandler}
                        ingredientRemoved={this.props.removeIngredientHandler}
                        price={this.state.totalPrice}
                        disabled={disabledInfo}
                        ordering={this.purchaseHandler}
                        purchasable={!this.state.purchasable} />
                </Aux>
            );

            orderSummary = (
                <OrderSummary
                    ingredients={this.props.ingr}
                    purchaseCanceled={this.purchaseCancelHandler}
                    price={this.state.totalPrice}
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
        ingr: state.ingredients
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onIngrAdded: (ingredientName) =>
            dispatch({typs: actionTypes.ADD_INGREDIENT}, ingredientName),
        onIngrRemoved: (ingredientName) =>
            dispatch({typs: actionTypes.REMOVE_INGREDIENT}, ingredientName),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));
