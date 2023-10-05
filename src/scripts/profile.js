import {closePopup} from "./modal"
import {name, profession, avatar} from "./constants"
import Api from "./Api"
import {handleError} from "./Utils"

export let data = {};

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
    data = newData;
    name.textContent = data.name;
    profession.textContent = data.about;
    avatar.src = data.avatar;
  }