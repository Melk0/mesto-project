import {closePopup, popupOpened} from "./modal"
import {name, profession, fieldName, fieldProfession} from "./main"




// async function getProfile(){
//     let info;
//     await getInfo().then(data => {
//         name.textContent = data.name;
//         profession.textContent = data.about;
//         avatar.src = data.avatar;
//         info = data;
//         console.log(info);
//     })
//     return info;
// }

export async function saveProfileInfo(e){
    e.preventDefault();
    // editButton.value = "Сохранение"
    // await setProfile(fieldName.value, fieldProfession.value)
    // getProfile()
    name.textContent = fieldName.value;
    profession.textContent = fieldProfession.value;
    closePopup(popupOpened);
    // editButton.value = "Сохранить"
}