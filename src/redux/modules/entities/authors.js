export const schema = {
    name: 'authors',
    id: 'id'
};

const reducer = (state = {}, action) => {
    if (action.data && action.data[schema.name]) {
        return { ...state, ...action.data[schema.name] };
    }
    return state;
}

export default reducer;