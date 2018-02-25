import * as actionTypes from './actionTypes';
import axios from '../../axiosOrders.js';

export const purchaseBurderSuccess = (id, orderData) => {
    return {
        type: actionTypes.PURCHASE_BURGER_SUCCESS,
        orderId: id,
        orderData: orderData
    };
};

export const purchaseBurderFailed = (err) => {
    return {
        type: actionTypes.PURCHASE_BURGER_FAILED,
        error: err
    };
};

export const purchaseBurgerStart = () => {
    return {
        type: actionTypes.PURCHASE_BURGER_START
    }
}

export const purchaseBurger = (orderData) => {
    return (dispatch) => {
        dispatch(purchaseBurgerStart());

        axios.post('/orders.json', orderData)
            .then(resp => {
                dispatch(purchaseBurderSuccess(resp.data.name, orderData));
            })
            .catch(err => {
                purchaseBurderFailed(err);
            });
    };
};

export const purchaseInit = () => {
    return {
        type: actionTypes.PURCHASE_INIT
    }
}
