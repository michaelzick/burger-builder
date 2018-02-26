import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility/utility';

const initialState = {
    ingredients: null,
    totalPrice: 4,
    error: false
};

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    bacon: 0.7,
    meat: 1.3
};

const modIngredient = (state, action, isAdd) => {
    const updatedIngredient = {
        [action.ingredientName]:
                isAdd ? state.ingredients[action.ingredientName] + 1 :
                    state.ingredients[action.ingredientName] - 1
    };

    const updatedIngredients = updateObject (
        state.ingredients, updatedIngredient
    );

    const updatedState = {
        ingredients: updatedIngredients,
        totalPrice: isAdd ? state.totalPrice +
                        INGREDIENT_PRICES[action.ingredientName] :
                            state.totalPrice -
                                INGREDIENT_PRICES[action.ingredientName]
    };

    return updateObject(state, updatedState);
};

const reducer = (state=initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_INGREDIENT:
            return modIngredient(state, action, true);

        case actionTypes.REMOVE_INGREDIENT:
            return modIngredient(state, action, false);

        case actionTypes.SET_INGREDIENTS:
            return updateObject(state, {
                ingredients: action.ingredients,
                error: false,
                totalPrice: 4
            });

        case actionTypes.FETCH_INGREDIENTS_FAILED:
            return updateObject(state, {
                error: true
            });

        default:
            return state;
    }
};

export default reducer;
