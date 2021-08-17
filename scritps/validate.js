


// const hideInputError = (formElement, inputElement) => {
//   const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
//   inputElement.classList.remove('form__input_type_error');
//   errorElement.classList.remove('form__input-error_active');
//   errorElement.textContent = '';
// };

// const checkInputValidity = (formElement, inputElement) => {
//   if (!inputElement.validity.valid) {
//     showInputError(formElement, inputElement, inputElement.validationMessage);
//   } else {
//     hideInputError(formElement, inputElement);
//   }
// };

// const setEventListeners = (formElement) => {
//   const inputList = Array.from(formElement.querySelectorAll('.form__input'));
//   const buttonElement = formElement.querySelector('.form__submit');
//   toggleButtonState(inputList, buttonElement);
//   inputList.forEach((inputElement) => {
//     inputElement.addEventListener('input', function () {
//       checkInputValidity(formElement, inputElement);
//       toggleButtonState(inputList, buttonElement);
//     });
//   });
// };

// const enableValidation = (settings) => {
//   const formList = Array.from(document.querySelectorAll(settings.formSelector));
//   formList.forEach((formElement) => {
//     formElement.addEventListener('submit', function (evt) {
//       evt.preventDefault();
//     });

//     const fieldsetList = Array.from(formElement.querySelectorAll(settings.fieldSetSelector));
//     fieldsetList.forEach((fieldset)=>{
//       setEventListeners(fieldset);
//     })

//   });
// };

// const hasInvalidInput  = function(inputList) {
//   return inputList.some((inputElement) => {
//     return !inputElement.validity.valid;
//   });
// };

// const toggleButtonState = function(inputList, buttonElement) {
//   if (hasInvalidInput(inputList)) {
//     buttonElement.classList.add('.button_inactive');
//   }
//   else {
//     buttonElement.classList.remove('.button_inactive');
//   }
// }

// enableValidation({
//   formSelector: '.popup__form',
//   inputSelector: '.form__input',
//   fieldSetSelector: '.form__input-container',
//   submitButtonSelector: '.form__submit-button',
//   inactiveButtonClass: 'form__submit-button_inactive',
//   inputErrorClass: 'form__input_type_error',
//   errorClass: 'form__input-error'
// });

