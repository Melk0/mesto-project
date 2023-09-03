
export let popupOpened;


export const popupEdit = document.querySelector(".popup_type_edit");
export const popupAdd = document.querySelector(".popup_type_add");
export const popupImage = document.querySelector(".popup_type_image");
export const popupDelete = document.querySelector(".popup_type_delete");
export const closeButtons = document.querySelectorAll(".popup__close");

const image = popupImage.querySelector(".image");
const description = popupImage.querySelector(".popup__description");

export function openPopup(popup){
    popup.classList.add("popup_opened");
    popupOpened = popup;
    popup = document.querySelectorAll(".popup");
    document.addEventListener('keydown', closePopupEsc);
    popupOpened.addEventListener("click", (evt) => {
        if (evt.currentTarget === evt.target) {
            closePopup(popupOpened)
        }
    })
}

export function closePopup(popup){
    popup.classList.remove("popup_opened");
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





