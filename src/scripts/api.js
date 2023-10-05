import {request} from "./Utils";

export default class Api {
    constructor(config) {
        this._config = config;
    }

    getInfo(){
        return request('/users/me', this._config)
    }
    
    getCards(){
        return request('/cards', this._config)
    }
    
    setProfile(newName, newAbout){
        let tempConfig = this._config
        this._config.method = 'PATCH';
        this._config.body = JSON.stringify({
            name: newName,
            about: newAbout
        })
        return request('/users/me', tempConfig)
    }
    
    setCard(newName, newLink){
        let tempConfig = this._config
        this._config.method = 'POST';
        this._config.body = JSON.stringify({
            name: newName,
            link: newLink
        })
        return request(`/cards`, tempConfig)
    }
    
    deleteCardApi(id){
        let tempConfig = this._config
        this._config.method = 'DELETE';
        return request(`/cards/${id}`, tempConfig)
    }
    
    upLike(id){
        let tempConfig = this._config
        this._config.method = 'PUT';
        return request(`/cards/likes/${id}`, tempConfig)
    }
    
    downLike(id){
        let tempConfig = this._config
        this._config.method = 'DELETE';
        return request(`/cards/likes/${id}`, tempConfig)
    }
    
    editAvatar(link){
        let tempConfig = this._config
        this._config.method = 'PATCH';
        this._config.body = JSON.stringify({
            avatar:link
        })
        return request('/users/me/avatar', tempConfig)
    }
  }
  
