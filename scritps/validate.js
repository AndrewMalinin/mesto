const formSubmitHandlersList = {
  'add-card-form' : handleAddCardFormSubmit,
  'edit-profile-form'  :  handleEditProfileFormSubmit
}


const showInputError = (formElement, inputElement, errorMessage, settings) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(settings.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(settings.errorClass);
};


const hideInputError = (formElement, inputElement, settings) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(settings.inputErrorClass);
  errorElement.classList.remove(settings.errorClass);
  errorElement.textContent = '';
};

const checkInputValidity = (formElement, inputElement, settings) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, settings);
  } else {
    hideInputError(formElement, inputElement, settings);
  }
};

const setEventListeners = (formElement, settings) => {
  const inputList = Array.from(formElement.querySelectorAll(settings.inputSelector));
  const buttonElement = formElement.querySelector(settings.submitButtonSelector);
  toggleButtonState(inputList, buttonElement, settings.inactiveButtonClass);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', ()=>{
      checkInputValidity(formElement, inputElement, settings);
      toggleButtonState(inputList, buttonElement, settings.inactiveButtonClass);
    });
  });
};

const enableValidation = (settings) => {
  const formList = Array.from(document.querySelectorAll(settings.formSelector));
  let formInputList;
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (e)=>{
      e.preventDefault();
      formInputList = Array.from(formElement.querySelectorAll(settings.inputSelector))
      if (!hasInvalidInput(formInputList)) {
        formSubmitHandlersList[formElement.id]();
      }
    });

    setEventListeners(formElement, settings);
  });
};

const hasInvalidInput  = function(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

const toggleButtonState = function(inputList, buttonElement, inactiveButtonClass) {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(inactiveButtonClass);
  }
  else {
    buttonElement.classList.remove(inactiveButtonClass);
  }
}

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.form__item',
  submitButtonSelector: '.form__submit-button',
  inactiveButtonClass: 'form__submit-button_inactive',
  inputErrorClass: 'form__item_type_error',
  errorClass: 'form__input-error_active'
});
