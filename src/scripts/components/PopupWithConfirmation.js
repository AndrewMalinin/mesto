import Popup from "./Popup";

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._formElement = this._popupElement.querySelector('.form');
  }

  open() {
    super.open();
    return new Promise((resolve, reject)=>{
      const handleSumbit = (e)=>{
        e.preventDefault();
        resolve();
        this.close();
        this._formElement.removeEventListener('submit', handleSumbit);
      }

      const handleReject = (e)=>{
        this._popupElement.addEventListener('mousedown', (e)=>{
          if (e.target.classList.contains('popup') ||
              e.target.classList.contains('popup__close-button')){
              reject();
              this.close();
              this._popupElement.removeEventListener('mousedown', handleReject);
          }
        });
      }

      this._formElement.addEventListener('submit', handleSumbit);
      this._popupElement.addEventListener('mousedown', handleReject);
    })
  }

  close() {
    super.close();
  }
}
