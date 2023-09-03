import '../pages/index.css'; 
import {enableValidation} from "./validate"
import {init, saveCard, saveProfileInfo, getProfile} from "./card"
import {getCards} from "./api"


const cards = await getCards()


init(cards);

document.querySelector("#add-card").addEventListener("submit", saveCard);
document.querySelector("#edit-profile").addEventListener("submit", saveProfileInfo);

enableValidation();
