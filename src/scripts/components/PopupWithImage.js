import Popup from "./Popup.js";
import {damagedPhoto} from '../utils/constants.js'

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
    this._imageElement.onerror = ()=>{
      this._imageElement.src = damagedPhoto;
      this._imageTitleElement.textContent = 'Произошла ошибка при загрузке фото'
    }
    super.open();
  }
}
