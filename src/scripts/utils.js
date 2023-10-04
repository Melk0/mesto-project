export function checkResponse(res) {
    if (res.ok) 
        return res.json();
    else
        return Promise.reject(`Ошибка: ${res.status}`);
}

export function request(url, options) {
    return fetch(options.baseUrl+url, options).then(checkResponse)
}

export function handleError(error){
    return console.error(`Ошибка: ${error}`);
}
