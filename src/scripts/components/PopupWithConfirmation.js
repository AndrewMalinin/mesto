import Popup from "./Popup";

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector, handleSubmitCallback) {
    super(popupSelector);
    this._formElement = this._popupElement.querySelector('.form');
    this._handleSubmitCallback = handleSubmitCallback;
    this._cache = undefined; //хранит значение, переданное при открытии окна
  }

  setEventListeners() {
    this._formElement.addEventListener('submit', (e)=>{
      e.preventDefault();
      this._handleSubmitCallback(this._cache);
    });
    super.setEventListeners();
  }

  open(cache) {
    this._cache = cache;
    super.open();
  }

}
