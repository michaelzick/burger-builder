import React, { Component } from 'react';
import Aux from '../../hoc/Aux/Aux';
import axios from '../../axiosOrders';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import Spinner from '../../components/UI/Spinner/Spinner';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as burgerBuilderActions from '../../store/actions';
import { connect } from 'react-redux';

class BurgerBuilder extends Component {
    state = {
        purchasing: false,
    }

    componentDidMount () {
        this.props.onInitIngredients();
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
        this.props.history.push({
            pathname: '/checkout',
        });
    }

    render () {
        const disabledInfo = {
            ...this.props.ingr
        };

        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        let burger = this.props.err ? <p>Ingredients failed</p> : <Spinner />;
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
        ingr: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        err: state.burgerBuilder.error
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onIngredientAdded: (ingrName) =>
            dispatch(burgerBuilderActions.addIngredient(ingrName)),
        onIngredientRemoved: (ingrName) =>
            dispatch(burgerBuilderActions.removeIngredient(ingrName)),
        onInitIngredients: () => {
            dispatch(burgerBuilderActions.initIngredients());
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));
