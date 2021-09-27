import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, submitFormCallback) {
    super(popupSelector);
    this._submitFormCallback = submitFormCallback;
    this._formElement = this._popupElement.querySelector('.form');
  }

  _getInputValues() {
    this._inputList = this._formElement.querySelectorAll('.form__item');
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
      this.close();
    });
    super.setEventListeners();
  }

  close() {
    this._formElement.reset();
    super.close();
  }


}
