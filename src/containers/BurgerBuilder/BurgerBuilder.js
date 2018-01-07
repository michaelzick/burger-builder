import React, { Component } from 'react';
import axios from '../../AxiosOrders';
import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    bacon: 0.7,
    meat: 1.3
};

class BurgerBuilder extends Component {
    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        totalPrice: 4,
        purchasable: false,
        purchasing: false
    }

    addIngredientHandler = (type) => {
        const newIngredientCount = this.state.ingredients[type] + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        const priceAddition = INGREDIENT_PRICES[type];
        const newTotalPrice = this.state.totalPrice + priceAddition;

        updatedIngredients[type] = newIngredientCount;

        console.log(newTotalPrice)

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
        const order = {
            ingredients: this.state.ingredients,
            price: parseFloat(this.state.totalPrice),
            customer: {
                name: 'Michael',
                address: {
                    street: '123 Test St',
                    zip: 99999,
                    state: 'CA'
                },
                email: 'asdf@asdfasdf.com'
            },
            deliverMethos: 'fastest'
        };

        axios.post('/order.json', order)
            .then(resp => {
                this.setState({
                    purchasing: false
                });
            })
            .catch(err => console.log(err));
    }

    render () {
        const disabledInfo = {
            ...this.state.ingredients
        };

        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        return (
            <Aux>
                <Modal
                    show={this.state.purchasing}
                    modalClosed={this.purchaseCancelHandler}>
                    <OrderSummary
                        ingredients={this.state.ingredients}
                        purchaseCanceled={this.purchaseCancelHandler}
                        price={this.state.totalPrice}
                        purchaseContinued={this.purchaseContinueHandler}/>
                </Modal>

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
    }
}

export default BurgerBuilder;
