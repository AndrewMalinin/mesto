import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, submitFormCallback) {
    super(popupSelector);
    this._submitFormCallback = submitFormCallback;
    this._formElement = this._popupElement.querySelector('.form');
    this._inputList = this._formElement.querySelectorAll('.form__item');
    this._submitButtonElement = this._formElement.querySelector('.form__submit-button');

  }

  _getInputValues() {
    this._formValues = {};
    this._inputList.forEach(input => {
      this._formValues[input.name] = input.value;
    });

    return this._formValues;
  }

  setEventListeners() {
    this._formElement.addEventListener('submit', (e)=>{
      e.preventDefault();
      this._submitFormCallback(this._getInputValues());
    });
    super.setEventListeners();
  }

  setFormWaiting() {
    this._submitButtonText =  this._submitButtonElement.textContent;
    this._submitButtonElement.textContent = 'Cохранение...';
  }
  // Одинаковые по наполнению методы логически оправданы, т.к
  // в будущем вид ожидающей формы может поменяться, но
  // каркас из функций останется
  clearFormWaiting() {
    this._submitButtonElement.textContent = this._submitButtonText;
  }

  open() {
    super.open();
    this._inputList[0].focus();
  }

  close() {
    this._formElement.reset();
    super.close();
  }
}
