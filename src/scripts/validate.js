//Validation

const enableValidationSettings= ({
  formSelector: '.form',
  inputSelector: '.form__field',
  submitButtonSelector: '.form__button',
  inactiveButtonClass: 'form__button_type_disabled',
  inputErrorClass: 'form__field_type_error',
  errorClass: 'form__field-error'
}); 

const showInputError = (formElement, inputElement, errorMessage) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    const errorButton = formElement.querySelector(enableValidationSettings.submitButtonSelector);
    inputElement.classList.add(enableValidationSettings.inputErrorClass);
    errorButton.classList.add(enableValidationSettings.inactiveButtonClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(`${enableValidationSettings.errorClass}_active`);
};

const hideInputError = (formElement, inputElement) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    const errorButton = formElement.querySelector(enableValidationSettings.submitButtonSelector);
    inputElement.classList.remove(enableValidationSettings.inputErrorClass);
    errorElement.classList.remove(`${enableValidationSettings.errorClass}_active`);
    errorButton.classList.remove(enableValidationSettings.inactiveButtonClass);
    errorElement.textContent = '';
};

const checkInputValidity = (formElement, inputElement) => {
    if (inputElement.validity.patternMismatch) {
        inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
        inputElement.setCustomValidity("");
  }
    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage);
    } else {
        hideInputError(formElement, inputElement);
    }
};

const setEventListeners = (formElement) => {
    const inputList = Array.from(formElement.querySelectorAll(enableValidationSettings.inputSelector));
    const buttonElement = formElement.querySelector(enableValidationSettings.submitButtonSelector);
    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', function () {
            checkInputValidity(formElement, inputElement);
            toggleButtonState(inputList, buttonElement)
        });
    });
};

const toggleButtonState  = (inputList, buttonElement) => {
    if(hasInvalidInput(inputList)){
      buttonElement.classList.add(enableValidationSettings.inactiveButtonClass)
    }
    else{
      buttonElement.classList.remove(enableValidationSettings.inactiveButtonClass)
    }
  }
// const enableValidation = (formList) =>{
//     formList  = Array.from(document.querySelectorAll('.form'));
//     formList.forEach((formElement) => {
//       formElement.addEventListener('submit', (evt) => {
//         evt.preventDefault();
//       });
//       setEventListeners(formElement);
//     }); 
//   }

const enableValidation = (formList) =>{
  formList  = Array.from(document.querySelectorAll(enableValidationSettings.formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    setEventListeners(formElement);
  }); 
}


const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    });
}

export {enableValidation}


