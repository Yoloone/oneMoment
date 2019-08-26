// 文章领域实体reducer
export const schema = {
    name: 'posts',
    id: 'id',
}

const reducer = (state = {}, action) => {
    if(action.data && action.data[schema.name]) {
        return {...state, ...action.data[schema.name]};
    }
    return state;
}

export default reducer;