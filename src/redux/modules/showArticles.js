import urls from '../../utils/url';
import { FETCH_DATA } from '../middleware/api';
import { schema } from './entities/articles';

//actions
const actionTypes = {
    FETCH_ARTICLES_REQUEST: 'TODAY/FETCH_ARTICLES_REQUEST',
    FETCH_ARTICLES_SUCCESS: 'TODAY/FETCH_ARTICLES_SUCCESS',
    FETCH_ARTICLES_FAILURE: 'TODAY/FETCH_ARTICLES_FAILURE',
    SET_COLUMNID: 'SET_COLUMNID',
    SET_DATE: 'SET_DATE'
}

export const actions = {
    loadArticles: date => {
        return (dispatch, getState) => {          
            dispatch({ type: actionTypes.SET_DATE, date });
            const requestURL = urls.getArticlesByDate(getDateParam(date));
            return dispatch(fetchArticles(requestURL));
        };
    },
    loadColumnArticles: columnId => {
        return (dispatch, getState) => {
            dispatch({ type: actionTypes.SET_COLUMNID, columnId })
            const requestURL = urls.getArticlesByColumn(columnId);
            return dispatch(fetchArticles(requestURL));
        };
    },
    setColumnID: columnId => ({ type: actionTypes.SET_COLUMNID, columnId }),
}

const fetchArticles = requestURL => ({
    [FETCH_DATA]: {
        requestURL,
        types: [
            actionTypes.FETCH_ARTICLES_REQUEST,
            actionTypes.FETCH_ARTICLES_SUCCESS,
            actionTypes.FETCH_ARTICLES_FAILURE
        ],
        schema
    }
});

const getDateParam = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const datePara = year + '-' +
        (month > 9 ? month : '0' + month) + '-' +
        (day > 9 ? day : '0' + day);
    return datePara;
}
//reducers

const initialState = {
    isFetching: false,
    articleIds: [],
    columnId: '',
    date: new Date(),
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_ARTICLES_REQUEST:
            return { ...state, isFetching: true };
        case actionTypes.FETCH_ARTICLES_SUCCESS:
            return { ...state, isFetching: false, articleIds: action.data.ids };
        case actionTypes.FETCH_ARTICLES_FAILURE:
            return { ...state, isFetching: false };
        case actionTypes.SET_COLUMNID:
            return { ...state, columnId: action.columnId };
        case actionTypes.SET_DATE:
            return { ...state, date: action.date };
        default:
            return state;
    }
}

//selecor
export const getArticleList = state => {
    return state.showArticles.articleIds.map(id => state.entities.articles[id]);
}

export const getDate = state => state.showArticles.date

export const isFetching = state => state.showArticles.isFetching

export const getColumnName = state => {
    if (state.showArticles.columnId && state.entities.columns[state.showArticles.columnId]) {
        return state.entities.columns[state.showArticles.columnId]['name'];
    } else {
        return '';
    }

}
export const getLikeList = state => {
    const user = JSON.parse(localStorage.getItem(state.login.username));
    const likeList = [];
    if (user) {
        for (let id in user.likeIds) {
            likeList.push(state.entities.articles[id]);
        }
    }

    return likeList;
}


export default reducer;