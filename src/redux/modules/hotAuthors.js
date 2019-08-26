import urls from '../../utils/url';
import { FETCH_DATA } from '../middleware/api';
import { schema } from './entities/authors';

const actionTypes = {
    FETCH_REC_AUTHORS_REQUEST: 'FETCH_REC_AUTHORS_REQUEST',
    FETCH_REC_AUTHORS_SUCCESS: 'FETCH_REC_AUTHORS_SUCCESS',
    FETCH_REC_AUTHORS_FAILURE: 'FETCH_REC_AUTHORS_FAILURE',
    FETCH_HOT_AUTHORS_REQUEST: 'FETCH_HOT_AUTHORS_REQUEST',
    FETCH_HOT_AUTHORS_SUCCESS: 'FETCH_HOT_AUTHORS_SUCCESS',
    FETCH_HOT_AUTHORS_FAILURE: 'FETCH_HOT_AUTHORS_FAILURE',
}

export const actions = {
    loadRecAuthors: () => {
        return (dispatch, getState) => {
            const requestURL = urls.getRecAuthors();
            return dispatch(fetchRecAuthors(requestURL));
        }
    },
    loadHotAuthors: () => {
        return (dispatch, getState) => {
            const requestURL = urls.getHotAuthors();
            return dispatch(fetchHotAuthors(requestURL));
        }
    },
}
const fetchRecAuthors = requestURL => ({
    [FETCH_DATA]: {
        requestURL,
        schema,
        types: [
            actionTypes.FETCH_REC_AUTHORS_REQUEST,
            actionTypes.FETCH_REC_AUTHORS_SUCCESS,
            actionTypes.FETCH_REC_AUTHORS_FAILURE,
        ]
    }
});

const fetchHotAuthors = requestURL => ({
    [FETCH_DATA]: {
        requestURL,
        schema,
        types: [
            actionTypes.FETCH_HOT_AUTHORS_REQUEST,
            actionTypes.FETCH_HOT_AUTHORS_SUCCESS,
            actionTypes.FETCH_HOT_AUTHORS_FAILURE,
        ]
    }
});

const initialState = {
    isFetching: false,
    recIds: [],
    hotIds: [],
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_REC_AUTHORS_REQUEST:
        case actionTypes.FETCH_HOT_AUTHORS_REQUEST:
            return { ...state, isFetching: true };
        case actionTypes.FETCH_REC_AUTHORS_SUCCESS:
            return { ...state, isFetching: false, recIds: action.data.ids };
        case actionTypes.FETCH_HOT_AUTHORS_SUCCESS:
            return { ...state, isFetching: false, hotIds: action.data.ids };
        case actionTypes.FETCH_REC_AUTHORS_FAILURE:
        case actionTypes.FETCH_HOT_AUTHORS_FAILURE:
            return { ...state, isFetching: false };
        default:
            return state;
    }
}

export const getRecAuthors = (state) => {
    return state.hotAuthors.recIds.map(id => state.entities.authors[id]);
}
export const getHotAuthors = (state) => {
    return state.hotAuthors.hotIds.map(id => state.entities.authors[id]);
}
export const isFetching = state => state.hotAuthors.isFetching

export default reducer;