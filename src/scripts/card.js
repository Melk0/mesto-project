import {openPopup, closePopup, openImage, popupEdit, closeButtons, popupOpened, popupAdd, popupDelete, popupAvatarEdit} from "./modal"
import {getInfo, setProfile, setCard, getCards, deleteCardApi, upLike, downLike,editAvatar} from "./api"

export const fieldTitle = document.querySelector("#title");
const fieldLink = document.querySelector("#link");
const avatarLink = document.querySelector("#avatar-link");
const cards = document.querySelector(".cards");
const name = document.querySelector(".profile__title");
const profession = document.querySelector(".profile__caption");
const fieldName = document.querySelector("#name");
const fieldProfession = document.querySelector("#profession");
const editButton = document.querySelector(".profile__pencil");
const addButton = document.querySelector(".profile__button");
const avatarSaveButton = document.querySelector(".button-avatar-edit");
const deleteButton = document.querySelector(".button__delete");
const avatar = document.querySelector(".profile__avatar");
const editAvatarButton = document.querySelector(".profile__overlay");

let data;

export async function init(initArray) {
    data = await getProfile();
    for (let i = initArray.length-1; i >= 0 ; i--) {
        const card = createCard(initArray[i]);
        cards.prepend(card);
    }
}


export async function saveCard(e){
    e.preventDefault();
    const temp =[];
    temp.push({
        name: fieldTitle.value,
        link: fieldLink.value
    });
    addButton.value = "Сохранение"
    await setCard(fieldTitle.value, fieldLink.value)
    const cards = await getCards()
    init(cards);
    fieldTitle.value = "";
    fieldLink.value = "";
    closePopup(popupOpened);
    addButton.value = "Сохранить"
}

function createCard(elem){
    const temp = document.querySelector("#card-template").content;
    const card = temp.querySelector(".card").cloneNode(true);
    const cardImage = card.querySelector(".card__image")
    cardImage.src = elem.link;
    cardImage.alt = elem.name;
    card.id=elem._id
    card.querySelector(".card__caption").textContent = elem.name;
    card.querySelector(".card__like").addEventListener("click", like);
    card.querySelector(".card__like-indicator").textContent = elem.likes.length;
    card.querySelector(".card__button").addEventListener("click", () => openImage(elem));
    card.querySelector(".card__delete").addEventListener("click", () => {
        openPopup(popupDelete)
        popupDelete.dataset.id = elem._id;
    });
    if(data._id!==elem.owner._id){
        card.querySelector(".card__delete").remove();
    }
    
    if(elem.likes.find(elem => elem._id == data._id))
    {
        card.querySelector(".card__like").classList.add("card__like_active")
    }
    return card;
}

async function like(e){
    e.target.classList.toggle("card__like_active");
    const likeIndicator = e.target.nextElementSibling;
    if(e.target.classList.contains("card__like_active"))
    {
        await upLike(e.target.offsetParent.id)
        likeIndicator.textContent = Number(likeIndicator.textContent) + 1
    }
    else
    {
        await downLike(e.target.offsetParent.id);
        likeIndicator.textContent = Number(likeIndicator.textContent) - 1
    }
        
}

async function deleteCard(id){
    deleteButton.value = "Удаление"
    await deleteCardApi(id);
    document.getElementById(`${id}`).remove()
    closePopup(popupOpened)
    deleteButton.value = "Да"
}

export async function saveProfileInfo(e){
    e.preventDefault();
    editButton.value = "Сохранение"
    await setProfile(fieldName.value, fieldProfession.value)
    getProfile()
    closePopup(popupOpened);
    editButton.value = "Сохранить"
}

editButton.addEventListener("click", () =>
{
    openPopup(popupEdit);
    fieldName.value = name.textContent;
    fieldProfession.value = profession.textContent;
});

closeButtons.forEach((button) => {
    const popup = button.closest('.popup');
    button.addEventListener('click', () => closePopup(popup));
});

addButton.addEventListener("click", () => {
    openPopup(popupAdd);
})
deleteButton.addEventListener("click", () => {
    deleteCard(popupDelete.dataset.id)
})

editAvatarButton.addEventListener("click", () => {
    openPopup(popupAvatarEdit);
})

avatarSaveButton.addEventListener("click", async (e) => {
    await editAvatar(avatarLink.value);
    closePopup(popupOpened);
    await getProfile();
})

async function getProfile(){
    let info;
    await getInfo().then(data => {
        name.textContent = data.name;
        profession.textContent = data.about;
        avatar.src = data.avatar;
        console.log(data);
        info = data;
        console.log(info);
    })
    return info;
}





