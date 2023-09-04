const myToken = '587a6577-aa88-4458-9a8b-aaa868f62a49';

export function getInfo(){
    return fetch('https://nomoreparties.co/v1/plus-cohort-28/users/me', {
        headers: {
            authorization: myToken
        }
    }).then(res => {
        if (res.ok) {
            return res.json();
        }else
        Promise.reject(`Ошибка: ${res.status}`);
    })
}

export function getCards(){
    return fetch('https://nomoreparties.co/v1/plus-cohort-28/cards', {
        headers: {
            authorization: myToken
        }
    }).then(res => {
        if (res.ok) {
            return res.json();
        }else
        return Promise.reject(`Ошибка: ${res.status}`);
    })
}

export function setProfile(newName, newAbout){
    fetch('https://nomoreparties.co/v1/plus-cohort-28/users/me', {
        method: 'PATCH',
        headers: {
            authorization: myToken,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: newName,
            about: newAbout
        })
    }).then(res => {
        if (res.ok) {
            return res.json();
        }else
        return Promise.reject(`Ошибка: ${res.status}`);
    });
}

export function setCard(newName, newLink){
    fetch('https://nomoreparties.co/v1/plus-cohort-28/cards', {
        method: 'POST',
        headers: {
            authorization: myToken,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: newName,
            link: newLink
        })
    }).then(res => {
        if (res.ok) {
            return res.json();
        }else
        return Promise.reject(`Ошибка: ${res.status}`);
    });
}

export function deleteCardApi(id){
    fetch(`https://nomoreparties.co/v1/plus-cohort-28/cards/${id}`, {
        method: 'DELETE',
        headers: {
            authorization: myToken,
        }
    }).then(res => {
        if (res.ok) {
            return res.json();
        }else
        return Promise.reject(`Ошибка: ${res.status}`);
    });
}

export function upLike(id){
    fetch(`https://nomoreparties.co/v1/plus-cohort-28/cards/likes/${id}`, {
        method: 'PUT',
        headers: {
            authorization: myToken,
        }
    }).then(res => {
        if (res.ok) {
            return res.json();
        }else
        return Promise.reject(`Ошибка: ${res.status}`);
    });
}

export function downLike(id){
    fetch(`https://nomoreparties.co/v1/plus-cohort-28/cards/likes/${id}`, {
        method: 'DELETE',
        headers: {
            authorization: myToken,
        }
    }).then(res => {
        if (res.ok) {
            return res.json();
        }else
        return Promise.reject(`Ошибка: ${res.status}`);
    });
}

export function editAvatar(link){
    fetch(`https://nomoreparties.co/v1/plus-cohort-28/users/me/avatar`, {
        method: 'PATCH',
        headers: {
            authorization: myToken,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            avatar:link
        })
    }).then(res => {
        if (res.ok) {
            return res.json();
        }else
        return Promise.reject(`Ошибка: ${res.status}`);
    });
}