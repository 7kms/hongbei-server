import fetch from 'node-fetch';
import querystring from 'querystring'
let baseFetchConfig = {
    credentials: 'include'
};

function checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
        return Promise.resolve(response.json())
    } else {
        return response.json().then(err => Promise.reject(err))
    }
}

let getConfig = (method, paramObj = {})=>{
    return Object.assign({
        method,
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(paramObj)
    },baseFetchConfig)
}

export const $get = (url, paramObj = {})=>{
    url = `${url}?${querystring.stringify(paramObj)}`;
    return fetch(url, baseFetchConfig)
            .then(checkStatus)
}

export const $post = (url, paramObj = {}) => {
    let config = getConfig('POST',paramObj);
    return fetch(url,config).then(checkStatus)
}

export const $put = (url, paramObj = {}) => {
    let config = getConfig('PUT',paramObj);
    return fetch(url,config).then(checkStatus)
}
export const $delete = (url, paramObj = {}) => {
    let config = getConfig('DELETE',paramObj);
    return fetch(url,config).then(checkStatus)
}
