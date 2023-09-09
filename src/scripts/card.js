import {openPopup, closePopup, openImage, popupOpened, popupDelete} from "./modal"
import {setCard, getCards, deleteCardApi, upLike, downLike} from "./api"
import {addButton, deleteButton, data} from "./main"
import {errorOutput}from "./Utils"

export const fieldTitle = document.querySelector("#title");
const fieldLink = document.querySelector("#link");
const cards = document.querySelector(".cards");

export function init() {
    getCards().then(res => {
        res.forEach((i) =>{
            const card = createCard(i);
            cards.prepend(card);
        })
    }).catch(errorOutput)
}


export function saveCard(e){
    e.preventDefault();
    setCard(fieldTitle.value, fieldLink.value).then((res) =>{
        addButton.value = "Сохранение"
        const card = createCard(res);
        cards.append(card);
    }).catch(errorOutput).finally(()=>{
        fieldTitle.value = "";
        fieldLink.value = "";
        closePopup(popupOpened);
        e.submitter.classList.add("form__button_type_disabled")
        e.submitter.disabled =true
        addButton.value = "Сохранить"
    })   
    
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
    })
    if(data._id!==elem.owner._id){
        card.querySelector(".card__delete").remove();
    }
    if(elem.likes.find(elem => elem._id == data._id))
    {
        card.querySelector(".card__like").classList.add("card__like_active")
    }
    return card;
}

function like(e){
    e.target.classList.toggle("card__like_active");
    const likeIndicator = e.target.nextElementSibling;
    if(e.target.classList.contains("card__like_active"))
    {
        upLike(e.target.offsetParent.id).then((res)=>{
            likeIndicator.textContent = Number(likeIndicator.textContent) + 1
        }).catch(errorOutput)
        
    }
    else
    {
        downLike(e.target.offsetParent.id).then((res)=>{
            likeIndicator.textContent = Number(likeIndicator.textContent) - 1
        }).catch(errorOutput);
    }
        
}

export function deleteCard(id){
    deleteCardApi(id).then(res=>{
        deleteButton.value = "Удаление"
        document.getElementById(`${id}`).remove()
    }).catch(errorOutput).finally(()=>{
        closePopup(popupOpened)
        deleteButton.value = "Да"
    });
}