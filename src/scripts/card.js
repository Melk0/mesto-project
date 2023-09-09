import {openPopup, closePopup, openImage} from "./modal"
import {setCard, getCards, deleteCardApi, upLike, downLike} from "./api"
import {deleteButton, popupDelete} from "./constants"
import {handleError}from "./utils"
import {data}from "./main"

const cards = document.querySelector(".cards");

export function getInitialCards() {
    getCards().then(res => {
        res.forEach((i) =>{
            const card = createCard(i);
            cards.prepend(card);
        })
    }).catch(handleError)
}


export function saveCard(e){
    e.preventDefault();
    e.target.addButton.textContent  = "Создание..."
    setCard(e.target.title.value, e.target.link.value).then((res) =>{
        const card = createCard(res);
        cards.prepend(card);
        e.target.reset()
        closePopup();
        e.submitter.classList.add("form__button_type_disabled")
        e.submitter.disabled =true
    }).catch(handleError).finally(()=>{
        e.target.addButton.textContent = "Создать"
    })   
}

function createCard(elem){
    const temp = document.querySelector("#card-template").content;
    const card = temp.querySelector(".card").cloneNode(true);
    const cardImage = card.querySelector(".card__image")
    const cardLike = card.querySelector(".card__like")
    const cardDelete = card.querySelector(".card__delete")
    cardImage.src = elem.link;
    cardImage.alt = elem.name;
    card.id=elem._id
    card.querySelector(".card__caption").textContent = elem.name;
    cardLike.addEventListener("click", like);
    card.querySelector(".card__like-indicator").textContent = elem.likes.length;
    card.querySelector(".card__button").addEventListener("click", () => openImage(elem));
    cardDelete.addEventListener("click", () => {
        openPopup(popupDelete)
        popupDelete.dataset.id = elem._id;
    })
    if(data._id!==elem.owner._id){
        cardDelete.remove();
    }
    console.log(data._id);
    if(elem.likes.find(elem => elem._id == data._id))
    {
        cardLike.classList.add("card__like_active")
    }
    return card;
}

function like(e){
    const likeIndicator = e.target.nextElementSibling;
    console.log(Boolean(e.target.classList))
    if(!e.target.classList.contains("card__like_active"))
    {
        upLike(e.target.offsetParent.id).then((res)=>{
            e.target.classList.add("card__like_active");
            likeIndicator.textContent = res.likes.length
        }).catch(handleError)
        
    }
    else
    {
        downLike(e.target.offsetParent.id).then((res)=>{
            e.target.classList.remove("card__like_active");
            likeIndicator.textContent = res.likes.length
        }).catch(handleError);
    }
        
}

export function deleteCard(id){
    deleteButton.value = "Удаление..."
    deleteCardApi(id).then(res=>{
        document.getElementById(`${id}`).remove()
        closePopup()
    }).catch(handleError).finally(()=>{
        deleteButton.value = "Да"
    });
}