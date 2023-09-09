import {closePopup, popupOpened} from "./modal"
import {name, profession, fieldName, fieldProfession, avatar, editButton} from "./main"
import {getInfo, setProfile} from "./api"

export const config = {
    baseUrl: 'https://nomoreparties.co/v1/plus-cohort-28',
    headers: {
      authorization: '587a6577-aa88-4458-9a8b-aaa868f62a49',
      'Content-Type': 'application/json',
    },
};

export function getProfile(newData){
    if(newData==null){
        const info = getInfo().then(data => {
            name.textContent = data.name;
            profession.textContent = data.about;
            avatar.src = data.avatar;
            return data;
        }).catch(errorOutput)
        return info
    }
    else{
        name.textContent = newData.name;
        profession.textContent = newData.about;
        avatar.src = newData.avatar;
    }
}

export function saveProfileInfo(e){
    e.preventDefault();
    setProfile(fieldName.value, fieldProfession.value).then(()=>{
        editButton.value = "Сохранение"
        name.textContent = fieldName.value;
        profession.textContent = fieldProfession.value;
    }).catch(errorOutput)
    .finally(()=>{
        closePopup(popupOpened);
        e.submitter.classList.add("form__button_type_disabled")
        e.submitter.disabled =true
        editButton.value = "Сохранить"
    })
}

export function checkResponse(res) {
    if (res.ok) 
        return res.json();
    else
        return Promise.reject(`Ошибка: ${res.status}`);
}

export function request(url, options) {
    return fetch(options.baseUrl+url, options).then(checkResponse)
}

export function errorOutput(error){
    return Promise.reject(`Ошибка: ${error}`);
}