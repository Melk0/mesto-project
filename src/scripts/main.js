import '../pages/index.css'; 
import {enableValidation} from "./validate"
import {init, saveCard, deleteCard} from "./card"
import {getProfile, saveProfileInfo} from "./Utils"
import {popups, openPopup, closePopup, openImage, popupEdit, popupOpened, popupAdd, popupDelete, popupAvatarEdit, closeButtons} from "./modal"

import {editAvatar} from "./api"

export const name = document.querySelector(".profile__title");
export const profession = document.querySelector(".profile__caption");
export const fieldName = document.querySelector("#name");
export const fieldProfession = document.querySelector("#profession");
export const editButton = document.querySelector(".profile__pencil");
export const avatarLink = document.querySelector("#avatar-link");
export const avatar = document.querySelector(".profile__avatar");
export const editAvatarButton = document.querySelector(".profile__overlay");
export const avatarSaveButton = document.querySelector(".button-avatar-edit");
export const addButton = document.querySelector(".profile__button");
export const deleteButton = document.querySelector(".button__delete");

const enableValidationSettings= ({
    formSelector: '.form',
    inputSelector: '.form__field',
    submitButtonSelector: '.form__button',
    inactiveButtonClass: 'form__button_type_disabled',
    inputErrorClass: 'form__field_type_error',
    errorClass: 'form__field-error'
}); 

init();

document.querySelector("#add-card").addEventListener("submit", saveCard);
document.querySelector("#edit-profile").addEventListener("submit", saveProfileInfo);

closeButtons.forEach((button) => {
    const popup = button.closest('.popup');
    button.addEventListener('click', () => closePopup(popup));
});

popups.forEach((elem) => {
    elem.addEventListener('click', (e) => {
        if (e.currentTarget === e.target) {
            closePopup(popupOpened)
        }
    }); 
});

avatarSaveButton.addEventListener("click", async (e) => {
    await editAvatar(avatarLink.value);
    getProfile()
    closePopup(popupOpened);
    init();
})

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
