const actionTypes = {
    LOGIN_REQUEST: 'LOGIN_REQUEST',
    LOGIN_SUCCESS: 'LOGIN_SUCCESS',
    LOGIN_FAILURE: 'LOGIN_FAILURE',
    LOGOUT: 'LOGOUT'
}
const userSchema = {
    username: '',
    password: '',
    likeIds: {}
}
export const actions = {
    login: (username, password) => {
        return (dispatch, getState) => {
            dispatch({ type: actionTypes.LOGIN_REQUEST });
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    if (!localStorage.getItem(username)) {
                        userSchema.username = username;
                        userSchema.password = password;
                        localStorage.setItem(username, JSON.stringify(userSchema));
                    }
                    localStorage.setItem('user', username);
                    localStorage.setItem('isLogin', true);
                    dispatch({ type: actionTypes.LOGIN_SUCCESS });
                    resolve();
                }, 1000);
            })
        }
    },

    logout: () => {
        localStorage.removeItem(localStorage.getItem('user'));
        localStorage.removeItem('user');
        localStorage.removeItem('isLogin');
        return {
            type: actionTypes.LOGOUT
        }
    }
}

const initialState = {
    isFetching: false,
    isLogin: localStorage.getItem('isLogin') || false,
    username: localStorage.getItem('user') || '',
}
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.LOGIN_REQUEST:
            return { ...state, isFetching: true };
        case actionTypes.LOGIN_SUCCESS:
            return { ...state, isLogin: true, isFetching: false, username: localStorage.getItem('user') };
        case actionTypes.LOGIN_FAILURE:
            return { ...state, isFetching: false };
        case actionTypes.LOGOUT:
            return { ...state, isLogin: false, username: '' };
        default:
            return state;
    }
}

export const isLogin = state => state.login.isLogin;

export const getUsername = state => state.login.username;

export default reducer;