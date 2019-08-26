import { combineReducers } from 'redux';
import comments from './comments';
import articles from './articles'
import columns from './columns'
import authors from './authors';

const rootReducer = combineReducers({
    articles,
    columns,
    comments,
    authors,
})

export default  rootReducer;