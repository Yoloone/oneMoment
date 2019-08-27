import urls from '../../utils/url';
import { FETCH_DATA } from '../middleware/api';
import { schema } from './entities/comments';
import { stat } from 'fs';

//actions
const actionTypes = {
    FETCH_ARTICLE_DETAIL_REQUEST: 'FETCH_ARTICLE_DETAIL_REQUEST',
    FETCH_ARTICLE_DETAIL_SUCCESS: 'FETCH_ARTICLE_DETAIL_SUCCESS',
    FETCH_ARTICLE_DETAIL_FAILURE: 'FETCH_ARTICLE_DETAIL_FAILURE',
    FETCH_ARTICLE_COMMENTS_REQUEST: 'FETCH_ARTICLE_DETAIL_REQUEST',
    FETCH_ARTICLE_COMMENTS_SUCCESS: 'FETCH_ARTICLE_COMMENTS_SUCCESS',
    FETCH_ARTICLE_COMMENTS_FAILURE: 'FETCH_ARTICLE_COMMENTS_FAILURE',
    CHANGE_IS_LIKE: 'CHANGE_IS_LIKE'
}

export const actions = {
    loadArticleDetail: postId => {
        return (dispatch, getState) => {
            dispatch(changeIsLike(postId));
            const requestURL = urls.getArticleDetail(postId);
            
            return dispatch(fetchArticleDetail(requestURL));
        };
    },
    loadArticleComments: postId => {
        return (dispatch, getState) => {
            const requestURL = urls.getArticleComments(postId);
            return dispatch(fetchArticleComments(requestURL));
        };
    },
    changeLikes: postId => {
        return changeIsLike(postId, true);
    }

}

const fetchArticleDetail = requestURL => ({
    [FETCH_DATA]: {
        requestURL,
        types: [
            actionTypes.FETCH_ARTICLE_DETAIL_REQUEST,
            actionTypes.FETCH_ARTICLE_DETAIL_SUCCESS,
            actionTypes.FETCH_ARTICLE_DETAIL_FAILURE
        ],
        schema: {
        }
    }
});

const fetchArticleComments = requestURL => ({
    [FETCH_DATA]: {
        requestURL,
        types: [
            actionTypes.FETCH_ARTICLE_COMMENTS_REQUEST,
            actionTypes.FETCH_ARTICLE_COMMENTS_SUCCESS,
            actionTypes.FETCH_ARTICLE_COMMENTS_FAILURE
        ],
        schema
    }
});

const changeIsLike = (postId, isChange) => {
    const username = localStorage.getItem('user');
    let isLike = false;
    if (username) {
        const user = JSON.parse(localStorage.getItem(username));
        isLike = user.likeIds[postId] ? true : false;

        if (isChange) {
            if (isLike) {
                delete user.likeIds[postId];
            } else {
                user.likeIds[postId] = true;
            }
            localStorage.setItem(username, JSON.stringify(user));
            isLike = !isLike;
        }
    }
    return {
        type: actionTypes.CHANGE_IS_LIKE,
        isLike
    };
}
//reducers
const initialState = {
    isFetching: false,
    commentIds: [],
    content: {},
    isLike: false,
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_ARTICLE_DETAIL_REQUEST:
        case actionTypes.FETCH_ARTICLE_COMMENTS_REQUEST:
            return { ...state, isFetching: true };
        case actionTypes.FETCH_ARTICLE_DETAIL_SUCCESS:
            return { ...state, isFetching: false, content: action.data };
        case actionTypes.FETCH_ARTICLE_COMMENTS_SUCCESS:
            return { ...state, isFetching: false, commentIds: action.data.ids };
        case actionTypes.FETCH_ARTICLE_DETAIL_FAILURE:
        case actionTypes.FETCH_ARTICLE_COMMENTS_FAILURE:
            return { ...state, isFetching: false };
        case actionTypes.CHANGE_IS_LIKE:
            return { ...state, isLike: action.isLike };
        default:
            return state;
    }
}

//selecor
export const getArticleDetail = state => {
    return state.details.content['content'];
}

export const getArticlePhotos = state => state.details.content['photos'];

export const getArticleComments = state => {
    return state.details.commentIds.map(id => state.entities.comments[id]);
}

export const getIsLike = state => state.details.isLike;

export default reducer;