import * as actionTypes from './actions';

const initialState = {
    ingredients: null,
    totalPrice: 4,
    purchasable: false,
    purchasing: false,
    loading: false,
    error: false
};

const reducer = (state=initialState, action) => {
    console.log(state);
    // switch action {

    // }
}

export default reducer;
