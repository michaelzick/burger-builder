import * as actionTypes from './actionTypes';
import axios from '../../axiosOrders';

export const initIngredients = () => {
    return (dispatch) => {
        axios.get('/ingredients.json')
            .then(resp => {
                dispatch(setIngredients(resp.data));
            })
            .catch(err => {
                dispatch(fetchIngrFailed());
            });
    };
};

export const fetchIngrFailed = () => {
    return {
        type: actionTypes.FETCH_INGREDIENTS_FAILED
    };
};

export const setIngredients = (ingr) => {
    return {
        type: actionTypes.SET_INGREDIENTS,
        ingredients: ingr
    }
}

export const addIngredient = (ingrName) => {
    return {
        type: actionTypes.ADD_INGREDIENT,
        ingredientName: ingrName
    };
};

export const removeIngredient = (ingrName) => {
    return {
        type: actionTypes.REMOVE_INGREDIENT,
        ingredientName: ingrName
    };
};
