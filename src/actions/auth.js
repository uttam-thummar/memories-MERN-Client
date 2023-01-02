import { AUTH, AUTH_MESSAGE, CLEAR_AUTH_MESSAGE } from '../constants/actionTypes';
import * as api from '../api/index.js';

export const signin = (formData, router) => async (dispatch) => {
    try {
        const { data } = await api.signIn(formData);
        dispatch({ type: AUTH, data });
        dispatch({ type: AUTH_MESSAGE, data: { message: 'Redirecting to Dashboard...', type: 'success' } });
        setTimeout(() => {
            dispatch({ type: CLEAR_AUTH_MESSAGE });
            router.push('/');
        }, 2000);
    } catch (error) {
        dispatch({ type: AUTH_MESSAGE, data: { message: error.response.data.message, type: 'error' } });
        // console.log(error);
    }
};

export const signup = (formData, router) => async (dispatch) => {
    try {
        const { data } = await api.signUp(formData);
        dispatch({ type: AUTH, data });
        dispatch({ type: AUTH_MESSAGE, data: { message: 'Redirecting to Dashboard...', type: 'success' } });
        setTimeout(() => {
            dispatch({ type: CLEAR_AUTH_MESSAGE });
            router.push('/');
        }, 2000);
    } catch (error) {
        dispatch({ type: AUTH_MESSAGE, data: { message: error.response.data.message, type: 'error' } });
        // console.log(error);
    }
};