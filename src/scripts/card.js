import {openPopup, closePopup, openImage, popupEdit, closeButtons, popupOpened, popupAdd, popupDelete, popupAvatarEdit} from "./modal"
// import {getInfo, setProfile, setCard, getCards, deleteCardApi, upLike, downLike,editAvatar} from "./api"
import {addButton} from "./main"

export const fieldTitle = document.querySelector("#title");
const fieldLink = document.querySelector("#link");
const cards = document.querySelector(".cards");
const addButtonSubmit = document.querySelector(".button-add")
// let data;

export async function init(initArray) {
    // data = await getProfile();
    initArray.forEach((i) =>{
        const card = createCard(i);
        cards.prepend(card);
    })
}


// export async function saveCard(e){
//     e.preventDefault();
//     const temp =[];
//     temp.push({
//         name: fieldTitle.value,
//         link: fieldLink.value
//     });
//     addButton.value = "Сохранение"
//     await setCard(fieldTitle.value, fieldLink.value)
//     const cards = await getCards()
//     init(cards);
//     fieldTitle.value = "";
//     fieldLink.value = "";
//     closePopup(popupOpened);
//     addButton.value = "Сохранить"
// }

export function saveCard(e){
    e.preventDefault();
    const temp =[{
        name: fieldTitle.value,
        link: fieldLink.value
    }];
    init(temp);
    fieldTitle.value = "";
    fieldLink.value = "";
    e.submitter.classList.add("form__button_type_disabled")
    e.submitter.disabled =true
    closePopup(popupOpened);
}

function createCard(elem){
    const temp = document.querySelector("#card-template").content;
    const card = temp.querySelector(".card").cloneNode(true);
    const cardImage = card.querySelector(".card__image")
    cardImage.src = elem.link;
    cardImage.alt = elem.name;
    // card.id=elem._id
    card.querySelector(".card__caption").textContent = elem.name;
    card.querySelector(".card__like").addEventListener("click", like);
    // card.querySelector(".card__like-indicator").textContent = elem.likes.length;
    card.querySelector(".card__button").addEventListener("click", () => openImage(elem));
    // card.querySelector(".card__delete").addEventListener("click", () => {
    //     openPopup(popupDelete)
    //     popupDelete.dataset.id = elem._id;
    // });
    card.querySelector(".card__delete").addEventListener("click", (e) => {
        deleteCard(e)
    })
    // if(data._id!==elem.owner._id){
    //     card.querySelector(".card__delete").remove();
    // }
    
    // if(elem.likes.find(elem => elem._id == data._id))
    // {
    //     card.querySelector(".card__like").classList.add("card__like_active")
    // }
    return card;
}

async function like(e){
    e.target.classList.toggle("card__like_active");
    const likeIndicator = e.target.nextElementSibling;
    if(e.target.classList.contains("card__like_active"))
    {
        // await upLike(e.target.offsetParent.id)
        likeIndicator.textContent = Number(likeIndicator.textContent) + 1
    }
    else
    {
        // await downLike(e.target.offsetParent.id);
        likeIndicator.textContent = Number(likeIndicator.textContent) - 1
    }
        
}

// async export function deleteCard(id){
//     deleteButton.value = "Удаление"
//     await deleteCardApi(id);
//     document.getElementById(`${id}`).remove()
//     closePopup(popupOpened)
//     deleteButton.value = "Да"
// }

export function deleteCard(e){
    e.target.closest(".card").remove();
}




