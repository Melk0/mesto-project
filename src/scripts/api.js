import {request} from "./Utils";

class Api {
    constructor(config) {
        this.config = config;
    }

    getInfo(){
        return request('/users/me', config)
    }
    
    getCards(){
        return request('/cards', config)
    }
    
    setProfile(newName, newAbout){
        let tempConfig = config
        config.method = 'PATCH';
        config.body = JSON.stringify({
            name: newName,
            about: newAbout
        })
        return request('/users/me', tempConfig)
    }
    
    setCard(newName, newLink){
        let tempConfig = config
        config.method = 'POST';
        config.body = JSON.stringify({
            name: newName,
            link: newLink
        })
        return request(`/cards`, tempConfig)
    }
    
    deleteCardApi(id){
        let tempConfig = config
        config.method = 'DELETE';
        return request(`/cards/${id}`, tempConfig)
    }
    
    upLike(id){
        let tempConfig = config
        config.method = 'PUT';
        return request(`/cards/likes/${id}`, tempConfig)
    }
    
    downLike(id){
        let tempConfig = config
        config.method = 'DELETE';
        return request(`/cards/likes/${id}`, tempConfig)
    }
    
    editAvatar(link){
        let tempConfig = config
        config.method = 'PATCH';
        config.body = JSON.stringify({
            avatar:link
        })
        return request('/users/me/avatar', tempConfig)
    }
  }
  
  const api = new Api({
    baseUrl: 'https://nomoreparties.co/v1/plus-cohort-28',
    headers: {
      authorization: '587a6577-aa88-4458-9a8b-aaa868f62a49',
      'Content-Type': 'application/json',
    },
  });