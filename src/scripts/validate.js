//Validation

const showInputError = (formElement, inputElement, errorMessage) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    const errorButton = formElement.querySelector(`.form__button`);
    inputElement.classList.add('form__field_type_error');
    errorButton.classList.add('form__button_type_disabled');
    errorElement.textContent = errorMessage;
    errorElement.classList.add('form__field-error_active');
};

const hideInputError = (formElement, inputElement) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    const errorButton = formElement.querySelector(`.form__button`);
    inputElement.classList.remove('form__field_type_error');
    errorElement.classList.remove('form__field-error_active');
    errorButton.classList.remove('form__button_type_disabled');
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
    const inputList = Array.from(formElement.querySelectorAll('.form__field'));
    const buttonElement = formElement.querySelector('.form__button');
    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', function () {
            checkInputValidity(formElement, inputElement);
            toggleButtonState(inputList, buttonElement)
        });
    });
};

const toggleButtonState  = (inputList, buttonElement) => {
    if(hasInvalidInput(inputList)){
      buttonElement.classList.add("form__button_type_disabled")
    }
    else{
      buttonElement.classList.remove("form__button_type_disabled")
    }
  }
const enableValidation = (formList) =>{
    formList  = Array.from(document.querySelectorAll('.form'));
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


