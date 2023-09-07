
export const popupEdit = document.querySelector(".popup_type_edit");
export const popupAdd = document.querySelector(".popup_type_add");
export const popupImage = document.querySelector(".popup_type_image");
export const popupDelete = document.querySelector(".popup_type_delete");
export const closeButtons = document.querySelectorAll(".popup__close");
export const popupAvatarEdit = document.querySelector(".popup_type_avatar-edit");
export const popups = document.querySelectorAll(".popup");
const image = popupImage.querySelector(".image");
const description = popupImage.querySelector(".popup__description");

export let popupOpened;

export function openPopup(popup){
    popup.classList.add("popup_opened");
    popupOpened = popup;
    document.addEventListener('keydown', closePopupEsc);
}

export function closePopup(popup){
    popup.classList.remove("popup_opened");
    document.removeEventListener('keydown', closePopupEsc);
}

export function openImage(item){
    openPopup(popupImage);
    image.src = item.link;
    image.alt = item.name;
    description.textContent = item.name;
}


function closePopupEsc(evt) {
    if (evt.key === 'Escape') {
        closePopup(popupOpened);
    }
}







