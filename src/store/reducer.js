import * as actionTypes from './actions';

const initialState = {
    ingredients: {
        meat: 0,
        bacon: 0,
        cheese: 0,
        salad: 0
    },
    totalPrice: 4,
    purchasable: false,
    purchasing: false,
    loading: false,
    error: false
};

const reducer = (state=initialState, action) => {
    switch (action) {
        case actionTypes.ADD_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]:
                        state.ingredients[action.ingredientName] + 1
                }
            };
        case actionTypes.REMOVE_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]:
                        state.ingredients[action.ingredientName] - 1
                }
            };
        default:
            return state;
    }
};

export default reducer;
