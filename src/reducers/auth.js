import * as actionType from '../constants/actionTypes';

const authReducer = (state = { authData: null }, action) => {
    switch (action.type) {
        case actionType.AUTH:
            localStorage.setItem('profile', JSON.stringify({ ...action?.data }));
            return { ...state, authData: action.data, loading: false, errors: null, isError: false };
        case actionType.AUTH_MESSAGE:
            return { ...state, loading: false, errors: action.data.message, isError: true, errorType: action.data.type };
        case actionType.CLEAR_AUTH_MESSAGE:
            return { ...state, errors: null, isError: false, errorType: null };
        case actionType.LOGOUT:
            localStorage.clear();
            return { ...state, authData: null, loading: false, errors: null, isError: false };
        default:
            return state;
    }
};

export default authReducer;