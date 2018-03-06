import axios from 'axios';
import * as actionTypes from './actionTypes';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const authSuccess = (authData) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        authData: authData
    };
};

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    };
};

export const auth = (email, password, isSignUp) => {
    return dispatch => {
        dispatch(authStart());

        let method = isSignUp ? 'signupNewUser' : 'verifyPassword';

        console.log(method);

        const authData = {
                email: email,
                password: password,
                returnSecureToken: true
            },
            api = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/' +
                method + '?key=AIzaSyAZ7aOyCq2qTreYxDY8SGIhIW5QAFRVJxQ';

        axios.post(api, authData)
            .then((resp) => {
                console.log(resp);
                dispatch(authSuccess(resp.data));
            })
            .catch((err) => {
                console.log(err);
                dispatch(authFail(err));
            });
    };
};
