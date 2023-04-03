let editButton = document.querySelector(".profile__pencil");
let addButton = document.querySelector(".profile__button");
let popupEdit = document.querySelector(".popup_type_edit");
let popupAdd = document.querySelector(".popup_type_add");
let popupOpened;
let closeButton = document.querySelectorAll(".popup__close");
let name = document.querySelector(".profile__title");
let profession = document.querySelector(".profile__caption");
let fields = document.querySelectorAll(".form__field");
let saveButton = document.querySelector(".form__button");
let nameField = fields[0];
let professionField=  fields[1];
let cards = document.querySelector(".cards");
let popupImage = document.querySelector(".popup_type_image");
let likeButtons;
let deleteButtons;
let imageButtons;
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
    for (let i = 0; i < initArray.length; i++) {
        let temp = document.querySelector("#card-template").content;
        let card = temp.querySelector(".card").cloneNode(true);
        card.querySelector(".card__image").src = initArray[i].link;
        card.querySelector(".card__image").alt = initArray[i].name;
        card.querySelector(".card__caption").insertAdjacentText("afterbegin", initArray[i].name);
        cards.append(card);
    }

}


function popupOpen(popup){
    popup.classList.add("popup_opened");
    nameField.value = name.textContent;
    professionField.value = profession.textContent;
    popupOpened = popup;
}

function popupClose(){
    popupOpened.classList.remove("popup_opened");
}

function saveInfo(e){
    e.preventDefault();
    name.textContent = nameField.value;
    profession.textContent = professionField.value;
    popupClose();
}

function saveCard(e){
    e.preventDefault();
    let temp = document.querySelector("#card-template").content;
    let card = temp.querySelector(".card").cloneNode(true);
    card.querySelector(".card__image").src = fields[3].value;
    card.querySelector(".card__image").alt = fields[2].value;
    card.querySelector(".card__caption").insertAdjacentText("afterbegin", fields[2].value);
    cards.prepend(card);
    document.querySelector(".card__like").addEventListener("click", like);
    document.querySelector(".card__delete").addEventListener("click", deleteCard);
    document.querySelector(".card__button").addEventListener("click", () => openImage(event, popupImage));
    popupClose();
}

function like(){
    this.classList.add("card__like_active");
}

function deleteCard(){
    this.parentElement.remove();
}

function openImage(e, popup){
    popup.classList.add("popup_opened");
    popup.children[0].children[1].attributes.src.value = e.target.attributes[0].value;
    popup.children[0].children[2].innerHTML = e.target.parentElement.parentElement.children[2].innerHTML;
    popupOpened = popup;
}


init(initialCards);


likeButtons = document.querySelectorAll(".card__like");
deleteButtons = document.querySelectorAll(".card__delete");
editButton.addEventListener("click", () => popupOpen(popupEdit));
addButton.addEventListener("click", () => popupOpen(popupAdd));


saveButton.addEventListener("click", saveInfo);

for(i = 0; i < closeButton.length; i++){
    closeButton[i].addEventListener("click", popupClose);
}

document.querySelector(".button-add").addEventListener("click", saveCard);

for(i = 0; i < likeButtons.length; i++){
    likeButtons[i].addEventListener("click", like);
}

for(i = 0; i < deleteButtons.length; i++){
    deleteButtons[i].addEventListener("click", deleteCard);
}

imageButtons = document.querySelectorAll(".card__button");
for(i = 0; i < imageButtons.length; i++){
    imageButtons[i].addEventListener("click", () => openImage(event, popupImage));
}
