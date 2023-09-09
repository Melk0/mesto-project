import '../pages/index.css'; 
import {enableValidation} from "./validate"
import {getInitialCards, saveCard, deleteCard} from "./card"
import {handleError} from "./utils"
import {getProfile, saveProfileInfo, setUserInfo} from "./profile"
import {openPopup, closePopup} from "./modal"
import {editAvatar} from "./api"
import {name, profession, fieldName, fieldProfession, editButton, avatarLink, editAvatarButton, avatarSaveButton, addButton, deleteButton, popups, closeButtons, popupEdit, popupAdd, popupDelete, popupAvatarEdit} from "./constants"

export let data = {};

const enableValidationSettings= ({
    formSelector: '.form',
    inputSelector: '.form__field',
    submitButtonSelector: '.form__button',
    inactiveButtonClass: 'form__button_type_disabled',
    inputErrorClass: 'form__field_type_error',
    errorClass: 'form__field-error'
}); 

getProfile().then(res => {
    data = res
}).catch(handleError)

getInitialCards();

Promise.all([getProfile(), getInitialCards()]).then(([res]) => {
    data = res
}).catch(handleError)

document.querySelector("#add-card").addEventListener("submit", saveCard);
document.querySelector("#edit-profile").addEventListener("submit", saveProfileInfo);
document.querySelector("#edit-avatar").addEventListener("submit", (e) => {
    e.submitter.textContent = "Сохранение..."
    editAvatar(avatarLink.value).then((res)=>{
        data=res;
        setUserInfo (data)
    }).catch(handleError)
    .finally(()=>{
        e.submitter.textContent = "Сохранить"
        closePopup();
    })
});

closeButtons.forEach((button) => {
    const popup = button.closest('.popup');
    button.addEventListener('click', () => closePopup());
});

popups.forEach((elem) => {
    elem.addEventListener('click', (e) => {
        if (e.currentTarget === e.target) {
            closePopup()
        }
    }); 
});

deleteButton.addEventListener("click", () => {
    deleteCard(popupDelete.dataset.id)
})

addButton.addEventListener("click", () => {
    openPopup(popupAdd);
})

editAvatarButton.addEventListener("click", () => {
    openPopup(popupAvatarEdit);
})

editButton.addEventListener("click", () =>
{
    openPopup(popupEdit);
    fieldName.value = name.textContent;
    fieldProfession.value = profession.textContent;
});

enableValidation(enableValidationSettings);
