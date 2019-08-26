import { get } from '../../utils/response';
// 请求数据action标识
export const FETCH_DATA = "FETCH_DATA";

/**
 * 处理请求API的中间件
 * action = {
    FETCH_DATA: {
        types:[requestAction, successAction, failureAction]
        requestURL,
        schema, 领域数据表
    }
* }
 * @param {*} store 
 */
export default store => next => action => {
    const requestEntity = action[FETCH_DATA];
    if (requestEntity === undefined) {
        return next(action);
    }

    const { requestURL, types, schema } = requestEntity;
    if (typeof requestURL !== 'string') {
        return new Error('请求URL必须为string类型');
    }

    if (!Array.isArray(types) || types.length !== 3) {
        return new Error('需指定包含3个action type的数组');
    }

    if (!types.every(item => typeof item === 'string')) {
        return new Error('action type 必需为string类型');
    }

    if (!schema) {
        return new Error('必需指定领域实体的schema');
    }

    //摘除FETCH_DATA，构造新的action
    const actionWith = params => {
        delete action[FETCH_DATA];
        return { ...action, ...params };
    }

    //
    const [requestAction, successAction, failureAction] = types;
    next(actionWith({ type: requestAction }));
    return fetchData(requestURL, schema).then(
        data => {
            next(actionWith({
                type: successAction,
                data
            }));
        },
        error => {
            next(actionWith({
                type: failureAction,
                error: error.message || '获取数据失败'
            }));
        }
    )
}

// 请求数据
const fetchData = (requestURL, schema) => {
    return get(requestURL).then(data => {
        return normalizeData(data, schema);
    });
}

// 根据schema 对获取的数据进行扁平化处理
const normalizeData = (data, schema) => {
    // console.log(data);
    const { id, name } = schema;
    let kvObj = {};
    let ids = [];
    data = data[name];
    if (Array.isArray(data)) {
        data.forEach(item => {
            kvObj[item[id]] = item;
            ids.push(item[id]);
        });
    } else {
       return data;
    }
    return {
        [name]: kvObj,
        ids
    }
}