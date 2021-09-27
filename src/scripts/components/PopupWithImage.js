import Popup from "./Popup.js";

export default class PopupWithImage extends Popup  {
  constructor(popupSelector) {
    super(popupSelector);
    this._imageElement = this._popupElement.querySelector('.popup__photo');
    this._imageTitleElement = this._popupElement.querySelector('.popup__photo-title');
  }

  open({name, link, alt}) {
    this._imageElement.src = link;
    this._imageElement.alt = alt;
    this._imageTitleElement.textContent = name;
    super.open();
  }
}
