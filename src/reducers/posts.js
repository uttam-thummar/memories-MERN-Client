import { FETCH_ALL, FETCH_BY_SEARCH, FETCH_POST, CREATE, UPDATE, DELETE, LIKE, COMMENT, POSTS_MESSAGE, CLEAR_POST_MESSAGE } from '../constants/actionTypes';

export default (state = { isLoading: true, posts: [] }, action) => {
    switch (action.type) {
        case 'START_LOADING':
            return { ...state, isLoading: true };
        case 'END_LOADING':
            return { ...state, isLoading: false };
        case FETCH_ALL:
            return {
                ...state,
                posts: action.payload.data,
                currentPage: action.payload.currentPage,
                numberOfPages: action.payload.numberOfPages,
                post: null
            };
        case FETCH_BY_SEARCH:
            return { ...state, posts: action.payload.data };
        case FETCH_POST:
            return { ...state, post: action.payload.post };
        case LIKE:
            return { ...state, posts: state.posts.map((post) => (post._id === action.payload._id ? action.payload : post)) };
        case COMMENT:
            return {
                ...state,
                posts: state.posts.map((post) => {
                    if (post._id === action.payload._id) {
                        return action.payload;
                    }
                    return post;
                }),
            };
        case CREATE:
            return { ...state, posts: [...state.posts, action.payload] };
        case UPDATE:
            return { ...state, posts: state.posts.map((post) => (post._id === action.payload._id ? action.payload : post)) };
        case DELETE:
            return { ...state, posts: state.posts.filter((post) => post._id !== action.payload) };
        case POSTS_MESSAGE:
            return {
                ...state,
                isAlert: true,
                alertMessage: action.data.message,
                alertType: action.data.type
            }
        case CLEAR_POST_MESSAGE:
            return {
                ...state,
                isAlert: false,
                alertMessage: null,
                alertType: null
            }
        default:
            return state;
    }
};