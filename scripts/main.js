const editButton = document.querySelector(".profile__pencil");
const addButton = document.querySelector(".profile__button");
const popupEdit = document.querySelector(".popup_type_edit");
const popupAdd = document.querySelector(".popup_type_add");
let popupOpened;
const name = document.querySelector(".profile__title");
const profession = document.querySelector(".profile__caption");
const fieldName = document.querySelector("#name");
const fieldProfession = document.querySelector("#profession");
const fieldTitle = document.querySelector("#title");
const fieldLink = document.querySelector("#link");
const saveButton = document.querySelector(".form__button");
const cards = document.querySelector(".cards");
const popupImage = document.querySelector(".popup__image");
let closeButtons = document.querySelectorAll(".popup__close");
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


function init(initArray) {
    for (let i = initArray.length-1; i >= 0 ; i--) {
        const card = createCard(initArray[i]);
        cards.prepend(card);
        card.querySelector(".card__like").addEventListener("click", like);
        card.querySelector(".card__delete").addEventListener("click", deleteCard);
        card.querySelector(".card__button").addEventListener("click", () => openImage(initArray[i]));
    }
}

function openPopup(popup){
    popup.classList.add("popup_opened");
    popupOpened = popup;
}

function closePopup(popup){
    popup.classList.remove("popup_opened");
}

function saveProfileInfo(e){
    e.preventDefault();
    name.textContent = fieldName.value;
    profession.textContent = fieldProfession.value;
    closePopup(popupOpened);
}

function saveCard(e){
    e.preventDefault();
    let temp =[];
    temp.push({
        name: fieldTitle.value,
        link: fieldLink.value
    });
    init(temp);
    fieldTitle.value = "";
    fieldLink.value = "";
    closePopup(popupOpened);
}

function createCard(elem){
    let temp = document.querySelector("#card-template").content;
    let card = temp.querySelector(".card").cloneNode(true);
    const cardImage = card.querySelector(".card__image")
    cardImage.src = elem.link;
    cardImage.alt = elem.name;
    card.querySelector(".card__caption").textContent = elem.name;
    return card;
}

function like(e){
    e.target.classList.toggle("card__like_active");
}

function deleteCard(e){
    e.target.closest(".card").remove();
}

function openImage(item){
    openPopup(popupImage.closest(".popup"));
    const image = popupImage.querySelector(".image")
    image.src = item.link;
    image.alt = item.name;
    popupImage.querySelector(".popup__description").textContent = item.name;
    popupOpened = popupImage;
}

init(initialCards);

document.querySelector(".button-add").addEventListener("click", saveCard);
document.querySelector("#add-card").addEventListener("submit", saveCard);
document.querySelector("#edit-profile").addEventListener("submit", saveProfileInfo);
editButton.addEventListener("click", () =>
{
    openPopup(popupEdit);
    fieldName.value = name.textContent;
    fieldProfession.value = profession.textContent;
});

addButton.addEventListener("click", () => openPopup(popupAdd));

saveButton.addEventListener("click", saveProfileInfo);
closeButtons.forEach((button) => {
    const popup = button.closest('.popup');
    button.addEventListener('click', () => closePopup(popup));
});


