import {openPopup, closePopup, openImage} from "./modal"
import {deleteButton, popupDelete} from "./constants"
import {handleError}from "./Utils"
import {data}from "./profile"
import {api} from "./main"

const cards = document.querySelector(".cards");

export function getInitialCards(initialArray) {
    initialArray.forEach((i) =>{
        const card = new Card(i, "#card-template");
        const cardElement = card.createCard()
        cards.append(cardElement);
    })
}

export function saveCard(e){
    e.preventDefault();
    e.target.addButton.textContent  = "Создание..."
    api.setCard(e.target.title.value, e.target.link.value).then((res) =>{
        const card = new Card(res, "#card-template");
        const cardElement = card.createCard()
        cards.prepend(cardElement);
        e.target.reset()
        closePopup();
        e.submitter.classList.add("form__button_type_disabled")
        e.submitter.disabled =true
    }).catch(handleError).finally(()=>{
        e.target.addButton.textContent = "Создать"
    })   
}

class Card{
    constructor(data, template){
        this._template = template
        this._data = data
    }

    _getElement() {
        const card = document
          .querySelector(this._template)
          .content
          .querySelector('.card')
          .cloneNode(true);
        return card;
      }

    createCard(){
        this._newCard = this._getElement();
        const cardImage = this._newCard.querySelector(".card__image")
        const cardLike = this._newCard.querySelector(".card__like")
        const cardDelete = this._newCard.querySelector(".card__delete")
        cardImage.src = this._data.link;
        cardImage.alt = this._data.name;
        this._newCard.id=this._data._id
        this._newCard.querySelector(".card__caption").textContent = this._data.name;
        cardLike.addEventListener("click", this._like);
        this._newCard.querySelector(".card__like-indicator").textContent = this._data.likes.length;
        this._newCard.querySelector(".card__button").addEventListener("click", () => openImage(this._data)); // нужно переделать когда будет класс попапа
        cardDelete.addEventListener("click", () => {
            openPopup(popupDelete)// нужно переделать когда будет класс попапа
            popupDelete.dataset.id = this._data._id;// нужно переделать когда будет класс попапа
        })
        if(data._id!==this._data.owner._id){
            cardDelete.remove();
        }
        if(this._data.likes.find(elem => elem._id == data._id))
        {
            cardLike.classList.add("card__like_active")
        }
        return this._newCard;
    }

    deleteCard(id){
        deleteButton.value = "Удаление..."
        deleteCardApi(id).then(res=>{
            document.getElementById(`${id}`).remove()
            closePopup()
        }).catch(handleError).finally(()=>{
            deleteButton.value = "Да"
        });
    }

    _like(e){
        this._likeIndicator = e.target.nextElementSibling;
        if(!e.target.classList.contains("card__like_active"))
        {
            api.upLike(e.target.offsetParent.id).then((res)=>{
                e.target.classList.add("card__like_active");
                this._likeIndicator.textContent = res.likes.length
            }).catch(handleError)
            
        }
        else
        {
            api.downLike(e.target.offsetParent.id).then((res)=>{
                e.target.classList.remove("card__like_active");
                this._likeIndicator.textContent = res.likes.length
            }).catch(handleError);
        }
    }
}
