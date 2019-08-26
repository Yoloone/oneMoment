//网络请求封装

const headers = new Headers({
    "Accept": "application/json",
    "Content-Type": "application/json"
});

export const get = url => {
    return fetch(url, {
        method: 'GET',
        credentials: 'include',
        headers,
    }).then(response => {
        return handleResponse(url, response);
    }).catch(err => {
        console.error(err);
        return Promise.reject({
            error: {
                message: `Request ${url} failed due to the ${err}`
            }
        });
    });
}

export const post = (url, data) => {
    return fetch(url, {
        method: 'POST',
        headers,
        body: data
    }).then(response => {
        return handleResponse(url, response);
    }).catch(err => {
        return Promise.reject({
            error: {
                message: `Request ${url} failed due to the ${err}`
            }
        });
    })
}

const handleResponse = (url, response) => {
    if (response.status === 200) {
        return response.json();
    } else {
        console.error(`Request failed. Url = ${url}`)
        return Promise.reject({
            error: {
                message: `Request ${url} failed due to the sever err`
            }
        });
    }
}