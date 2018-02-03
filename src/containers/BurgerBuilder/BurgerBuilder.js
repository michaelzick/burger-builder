import React, { Component } from 'react';
import axios from '../../axiosOrders';
import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import Spinner from '../../components/UI/Spinner/Spinner';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
// import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

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
        console.log(this.props);

        axios.get('/ingredients.json')
            .then(resp => {
                this.setState({
                    ingredients: resp.data
                });
            })
            .catch(err => {
                this.setState({
                    error: true
                });
            });
    }

    addIngredientHandler = (type) => {
        const newIngredientCount = this.state.ingredients[type] + 1;
        const updatedIngredients = {
            ...this.state.ingredients
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
        const oldCount = this.state.ingredients[type];

        if (!oldCount) return;

        const newIngredientCount = this.state.ingredients[type] - 1;
        const updatedIngredients = {
            ...this.state.ingredients
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

        for (let i in this.state.ingredients) {
            queryParams.push(encodeURIComponent(i) +
                '=' + encodeURIComponent(this.state.ingredients[i]));
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
            ...this.state.ingredients
        };

        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        let burger = this.state.error ? <p>Ingredients failed</p> : <Spinner />;
        let orderSummary = null;

        if (this.state.ingredients) {
            burger = (
                <Aux>
                    <Burger ingredients={this.state.ingredients}/>

                    <BuildControls
                        ingredientAdded={this.addIngredientHandler}
                        ingredientRemoved={this.removeIngredientHandler}
                        price={this.state.totalPrice}
                        disabled={disabledInfo}
                        ordering={this.purchaseHandler}
                        purchasable={!this.state.purchasable} />
                </Aux>
            );

            orderSummary = (
                <OrderSummary
                    ingredients={this.state.ingredients}
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

// export default withErrorHandler(BurgerBuilder, axios);
export default BurgerBuilder;
