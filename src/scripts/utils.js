export const config = {
    baseUrl: 'https://nomoreparties.co/v1/plus-cohort-28',
    headers: {
      authorization: '587a6577-aa88-4458-9a8b-aaa868f62a49',
      'Content-Type': 'application/json',
    },
};

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
