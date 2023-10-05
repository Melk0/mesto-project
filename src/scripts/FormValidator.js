export class FormValidator{
    constructor(config, selector){
        this._config = config
        this._selector = selector
    }

    _showInputError = (formElement, inputElement, errorMessage) => {
        const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
        const errorButton = formElement.querySelector(this._config.submitButtonSelector);
        inputElement.classList.add(this._config.inputErrorClass);
        errorButton.classList.add(this._config.inactiveButtonClass);
        errorButton.disabled =true
        errorElement.textContent = errorMessage;
        errorElement.classList.add(`${this._config.errorClass}_active`);
    };
    
    _hideInputError = (formElement, inputElement) => {
        const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
        const errorButton = formElement.querySelector(this._config.submitButtonSelector);
        inputElement.classList.remove(this._config.inputErrorClass);
        errorElement.classList.remove(`${this._config.errorClass}_active`);
        errorButton.classList.remove(this._config.inactiveButtonClass);
        errorButton.disabled = false
        errorElement.textContent = '';
    };
    
    _checkInputValidity = (formElement, inputElement) => {
        if (inputElement.validity.patternMismatch) {
            inputElement.setCustomValidity(inputElement.dataset.errorMessage);
      } else {
            inputElement.setCustomValidity("");
      }
        if (!inputElement.validity.valid) {
            this._showInputError(formElement, inputElement, inputElement.validationMessage);
        } else {
            this._hideInputError(formElement, inputElement);
        }
    };
    
    _setEventListeners = (formElement) =>{
        const inputList = Array.from(formElement.querySelectorAll(this._config.inputSelector));
        const buttonElement = formElement.querySelector(this._config.submitButtonSelector);
        inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () =>{
                this._checkInputValidity(formElement, inputElement);
                this._toggleButtonState(inputList, buttonElement)
            });
        });
    };
    
    _toggleButtonState  = (inputList, buttonElement) => {
        if(this._hasInvalidInput(inputList)){
            buttonElement.classList.add(this._config.inactiveButtonClass)
            buttonElement.disabled = true 
        }
        else{
                buttonElement.classList.remove(this._config.inactiveButtonClass)
                buttonElement.disabled = false
        }
    }


    enableValidation = () =>{
    const formElement  = document.querySelector(this._selector);
    formElement.addEventListener('submit', (evt) => {
        evt.preventDefault();
    });
    this._setEventListeners(formElement);
    }
    
    
    _hasInvalidInput = (inputList) => {
        return inputList.some((inputElement) => {
            return !inputElement.validity.valid;
        });
    }
}