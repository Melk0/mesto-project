import '../pages/index.css'; 
import {enableValidation} from "./validate"
import {init, saveCard, deleteCard} from "./card"
import {saveProfileInfo} from "./Utils"
import {openPopup, closePopup, openImage, popupEdit, popupOpened, popupAdd, popupDelete, popupAvatarEdit} from "./modal"

// import {getCards} from "./api"

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
const closeButtons = document.querySelectorAll(".popup__close"); 

// const cards = await getCards()
const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

init(initialCards);

document.querySelector("#add-card").addEventListener("submit", saveCard);
document.querySelector("#edit-profile").addEventListener("submit", saveProfileInfo);

closeButtons.forEach((button) => {
    const popup = button.closest('.popup');
    button.addEventListener('click', () => closePopup(popup));
});

// avatarSaveButton.addEventListener("click", async (e) => {
//     await editAvatar(avatarLink.value);
//     closePopup(popupOpened);
//     await getProfile();
// })

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

enableValidation();
