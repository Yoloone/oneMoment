import urls from '../../utils/url';
import { FETCH_DATA } from '../middleware/api';
import { schema } from './entities/articles';

const actionTypes = {
    FETCH_AUTHOR_POSTS_REQUEST: 'FETCH_AUTHOR_POSTS_REQUEST',
    FETCH_AUTHOR_POSTS_SUCCESS: 'FETCH_AUTHOR_POSTS_SUCCESS',
    FETCH_AUTHOR_POSTS_FAILURE: 'FETCH_AUTHOR_POSTS_FAILURE',
    SET_AUTHORID: 'SET_AUTHORID'
}

export const actions = {
    setAuthorID : (authorId) => ({ type: actionTypes.SET_AUTHORID, authorId }),
    loadAuthorPosts: () => {
        return (dispatch, getState) => {
            const requestURL = urls.getAuthorPosts(getState().authorInfo.authorId);
            return dispatch(fetchAuthorPosts(requestURL));
        }
    },
}
const fetchAuthorPosts = requestURL => ({
    [FETCH_DATA]: {
        requestURL,
        schema,
        types: [
            actionTypes.FETCH_AUTHOR_POSTS_REQUEST,
            actionTypes.FETCH_AUTHOR_POSTS_SUCCESS,
            actionTypes.FETCH_AUTHOR_POSTS_FAILURE,
        ]
    }
});



const initialState = {
    isFetching: false,
    postIds: [],
    authorId: ''
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_AUTHOR_POSTS_REQUEST:
            return { ...state, isFetching: true };
        case actionTypes.FETCH_AUTHOR_POSTS_SUCCESS:
            return { ...state, isFetching: false, postIds: action.data.ids };
        case actionTypes.FETCH_AUTHOR_POSTS_FAILURE:
            return { ...state, isFetching: false };
        case actionTypes.SET_AUTHORID:{
            return { ...state, authorId: action.authorId };
        }
        default:
            return state;
    }
}

export const getAuthorPosts = (state) => {
    return state.authorInfo.postIds.map(id => state.entities.articles[id]);
}
export const getAuthorInfo = (state) => {
    return state.entities.authors[state.authorInfo.authorId]
}
export default reducer;