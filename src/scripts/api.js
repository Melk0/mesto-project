import { checkResponse, request, config} from "./Utils";

export function getInfo(){
    return request('/users/me', config)
}

export function getCards(){
    return request('/cards', config)
}

export function setProfile(newName, newAbout){
    let tempConfig = config
    config.method = 'PATCH';
    config.body = JSON.stringify({
        name: newName,
        about: newAbout
    })
    return request('/users/me', tempConfig)
}

export function setCard(newName, newLink){
    let tempConfig = config
    config.method = 'POST';
    config.body = JSON.stringify({
        name: newName,
        link: newLink
    })
    return request(`/cards`, tempConfig)
}

export function deleteCardApi(id){
    let tempConfig = config
    config.method = 'DELETE';
    return request(`/cards/${id}`, tempConfig)
}

export function upLike(id){
    let tempConfig = config
    config.method = 'PUT';
    return request(`/cards/likes/${id}`, tempConfig)
}

export function downLike(id){
    let tempConfig = config
    config.method = 'DELETE';
    return request(`/cards/likes/${id}`, tempConfig)
}

export function editAvatar(link){
    let tempConfig = config
    config.method = 'PATCH';
    config.body = JSON.stringify({
        avatar:link
    })
    return request('/users/me/avatar', tempConfig)
}


