import {closePopup} from "./modal"
import {name, profession, editButton, avatar} from "./constants"
import {getInfo, setProfile} from "./api"
import {handleError} from "./utils"

export function getProfile(){
    return getInfo().then(data => {
        name.textContent = data.name;
        profession.textContent = data.about;
        avatar.src = data.avatar;
        return data;
    }).catch(handleError)
}

export function saveProfileInfo(e){
    e.submitter.textContent = "Сохранение..."
    e.preventDefault();
    setProfile(e.target.name.value, e.target.profession.value).then(()=>{
        name.textContent = e.target.name.value;
        profession.textContent = e.target.profession.value;
        e.target.reset()
        closePopup();
        e.submitter.classList.add("form__button_type_disabled")
        e.submitter.disabled =true 
    }).catch(handleError)
    .finally(()=>{
        e.submitter.textContent = "Сохранить"
    })
}

export function setUserInfo(newData) {
    name.textContent = newData.name;
    profession.textContent = newData.about;
    avatar.src = newData.avatar;
  }