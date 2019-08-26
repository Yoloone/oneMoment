import urls from '../../utils/url';
import { FETCH_DATA } from '../middleware/api';
import { schema } from './entities/columns';

const actionTypes = {
    FETCH_COLUMNS_REQUEST: 'FETCH_COLUMNS_REQUEST',
    FETCH_COLUMNS_SUCCESS: 'FETCH_COLUMNS_SUCCESS',
    FETCH_COLUMNS_FAILURE: 'FETCH_COLUMNS_FAILURE',
}

export const actions = {
    loadColumns : () => {
        return (dispatch, getState) => {
            const requestURL = urls.getColumns();
            return dispatch(fetchColumns(requestURL));
        }
    },
}

const fetchColumns = requestURL => ({
    [FETCH_DATA]: {
        requestURL,
        schema,
        types: [
            actionTypes.FETCH_COLUMNS_REQUEST,
            actionTypes.FETCH_COLUMNS_SUCCESS,
            actionTypes.FETCH_COLUMNS_FAILURE,
        ]
    }
});

const initialState = {
    isFetching: false,
    columnIds: [],
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_COLUMNS_REQUEST:
            return { ...state, isFetching: true };
        case actionTypes.FETCH_COLUMNS_SUCCESS:
            return { ...state, isFetching: false, columnIds: action.data.ids };
        case actionTypes.FETCH_COLUMNS_FAILURE:
            return { ...state, isFetching: false };
        default:
            return state;
    }
}

export const getAllColumns = (state) => {
    return state.showColumns.columnIds.map(id => state.entities.columns[id]);
}

export default reducer;