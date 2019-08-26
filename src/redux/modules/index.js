import { combineReducers } from 'redux';
import entities from './entities';
import details from './details';
import showArticles from './showArticles';
import showColumns from './showColumns';
import hotAuthors from "./hotAuthors";
import login from './login';
import authorInfo from './authorInfo';

const rootReducer = combineReducers({
    entities,
    showArticles,
    showColumns,
    hotAuthors,
    details,
    login,
    authorInfo
});

export default rootReducer;