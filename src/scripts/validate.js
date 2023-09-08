//Validation



const showInputError = (formElement, inputElement, errorMessage, settings) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    const errorButton = formElement.querySelector(settings.submitButtonSelector);
    inputElement.classList.add(settings.inputErrorClass);
    errorButton.classList.add(settings.inactiveButtonClass);
    errorButton.disabled =true
    errorElement.textContent = errorMessage;
    errorElement.classList.add(`${settings.errorClass}_active`);
};

const hideInputError = (formElement, inputElement, settings) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    const errorButton = formElement.querySelector(settings.submitButtonSelector);
    inputElement.classList.remove(settings.inputErrorClass);
    errorElement.classList.remove(`${settings.errorClass}_active`);
    errorButton.classList.remove(settings.inactiveButtonClass);
    errorButton.disabled = false
    errorElement.textContent = '';
};

const checkInputValidity = (formElement, inputElement, settings) => {
    if (inputElement.validity.patternMismatch) {
        inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
        inputElement.setCustomValidity("");
  }
    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage, settings);
    } else {
        hideInputError(formElement, inputElement, settings);
    }
};

const setEventListeners = (formElement, settings) => {
    const inputList = Array.from(formElement.querySelectorAll(settings.inputSelector));
    const buttonElement = formElement.querySelector(settings.submitButtonSelector);
    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', function () {
            checkInputValidity(formElement, inputElement, settings);
            toggleButtonState(inputList, buttonElement, settings)
        });
    });
};

const toggleButtonState  = (inputList, buttonElement, settings) => {
    if(hasInvalidInput(inputList)){
      buttonElement.classList.add(settings.inactiveButtonClass)
      buttonElement.disabled = true 
    }
    else{
      buttonElement.classList.remove(settings.inactiveButtonClass)
      buttonElement.disabled = false
    }
  }

const enableValidation = (settings) => {
  const formList  = Array.from(document.querySelectorAll(settings.formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    setEventListeners(formElement, settings);
  }); 
}


const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    });
}

export {enableValidation}


