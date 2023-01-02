import { START_LOADING, END_LOADING, FETCH_ALL, FETCH_POST, FETCH_BY_SEARCH, CREATE, UPDATE, DELETE, LIKE, COMMENT, POSTS_MESSAGE } from '../constants/actionTypes';
import * as api from '../api/index.js';

export const getPost = (id) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING });
        const { data } = await api.fetchPost(id);
        dispatch({ type: FETCH_POST, payload: { post: data } });
        dispatch({ type: END_LOADING });
    } catch (error) {
        dispatch({ type: POSTS_MESSAGE, data: { message: error.response.data.message, type: 'error' } });
        // console.log(error);
    }
};

export const getPosts = (page) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING });
        const { data: { data, currentPage, numberOfPages } } = await api.fetchPosts(page);
        dispatch({ type: FETCH_ALL, payload: { data, currentPage, numberOfPages } });
        dispatch({ type: END_LOADING });
    } catch (error) {
        dispatch({ type: POSTS_MESSAGE, data: { message: error.response.data.message, type: 'error' } });
        // console.log(error);
    }
};

export const getPostsBySearch = (searchQuery) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING });
        const { data: { data } } = await api.fetchPostsBySearch(searchQuery);
        dispatch({ type: FETCH_BY_SEARCH, payload: { data } });
        dispatch({ type: END_LOADING });
    } catch (error) {
        dispatch({ type: POSTS_MESSAGE, data: { message: error.response.data.message, type: 'error' } });
        // console.log(error);
    }
};

export const createPost = (post, history) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING });
        const { data } = await api.createPost(post);
        dispatch({ type: POSTS_MESSAGE, data: { message: 'Post Created, Redirecting...', type: 'success' } });
        setTimeout(() => {
            history.push(`/posts/${data._id}`);
        }, 2000)
        dispatch({ type: CREATE, payload: data });
        dispatch({ type: END_LOADING });
    } catch (error) {
        dispatch({ type: POSTS_MESSAGE, data: { message: error.response.data.message, type: 'error' } })
        // console.log(error);
    }
};

export const updatePost = (id, post) => async (dispatch) => {
    try {
        const { data } = await api.updatePost(id, post);
        dispatch({ type: UPDATE, payload: data });
        dispatch({ type: POSTS_MESSAGE, data: { message: 'Post Updated', type: 'success' } });
    } catch (error) {
        dispatch({ type: POSTS_MESSAGE, data: { message: 'Could not update, please try again later', type: 'error' } })
        // console.log(error);
    }
};

export const likePost = (id) => async (dispatch) => {
    try {
        const { data } = await api.likePost(id);
        dispatch({ type: LIKE, payload: data });
    } catch (error) {
        console.log(error);
    }
};


export const commentPost = (value, id) => async (dispatch) => {
    try {
        const { data } = await api.comment(value, id);
        dispatch({ type: COMMENT, payload: data });
        return data.comments;
    } catch (error) {
        console.log(error);
    }
};

export const deletePost = (id) => async (dispatch) => {
    try {
        await api.deletePost(id);
        dispatch({ type: DELETE, payload: id });
        dispatch({ type: POSTS_MESSAGE, data: { message: 'Post Deleted', type: 'success' } });
    } catch (error) {
        console.log(error);
    }
};