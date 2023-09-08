import {closePopup, popupOpened} from "./modal"
import {name, profession, fieldName, fieldProfession, avatar, editButton} from "./main"
import {getInfo, setProfile} from "./api"



export async function getProfile(){
    let info;
    await getInfo().then(data => {
        name.textContent = data.name;
        profession.textContent = data.about;
        avatar.src = data.avatar;
        info = data;
        console.log(info);
    })
    return info;
}

export async function saveProfileInfo(e){
    e.preventDefault();
    editButton.value = "Сохранение"
    await setProfile(fieldName.value, fieldProfession.value)
    getProfile()
    name.textContent = fieldName.value;
    profession.textContent = fieldProfession.value;
    closePopup(popupOpened);
    e.submitter.classList.add("form__button_type_disabled")
    e.submitter.disabled =true
    editButton.value = "Сохранить"
}