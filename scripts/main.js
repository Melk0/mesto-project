let editButton = document.querySelector(".profile__pencil");
let popup = document.querySelector(".popup");
let closeButton = document.querySelector(".popup__close");
let name = document.querySelector(".profile__title");
let profession = document.querySelector(".profile__caption");
let fields = document.querySelectorAll(".form__field");
let saveButton = document.querySelector(".form__button");
let nameField = fields[0];
let professionField=  fields[1];

function popupOpen(){
    popup.classList.add("popup_opened");
    nameField.value = name.textContent;
    professionField.value = profession.textContent;
}

function popupClose(){
    popup.classList.remove("popup_opened");
}

function saveInfo(e){
    e.preventDefault();
    name.textContent = nameField.value;
    profession.textContent = professionField.value;
    popupClose();
}

editButton.addEventListener("click", popupOpen);
closeButton.addEventListener("click", popupClose);
saveButton.addEventListener("click", saveInfo);