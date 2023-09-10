import {popupImage} from "./constants"
const image = popupImage.querySelector(".image");
const description = popupImage.querySelector(".popup__description");

let  popupOpened

export function openPopup(popup){
    popup.classList.add("popup_opened");
    popupOpened = popup;
    document.addEventListener('keydown', closePopupEsc);
}

export function closePopup(){
    popupOpened.classList.remove("popup_opened");
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
        closePopup();
    }
}







