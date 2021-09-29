import { damagedPhoto } from "../utils/constants";
export default class Card {
  constructor(cardTemplateSelector, cardDescription, handleCardClick) {
    this._cardTemplateSelector = cardTemplateSelector;
    this._cardDescription = cardDescription;
    this._handleCardClick = handleCardClick;
  }


  createCard() {
    this._cardElement = document.querySelector(this._cardTemplateSelector).content.cloneNode(true).firstElementChild ;
    this._cardTitle = this._cardElement.querySelector('.photo-card__title');
    this._cardImage = this._cardElement.querySelector('.photo-card__photo');
    this._cardLikeButton = this._cardElement.querySelector('.photo-card__like-button');
    this._cardDeleteButton = this._cardElement.querySelector('.photo-card__delete-button');
    this._fillCard();
    this._setEventListeners();

    return this._cardElement;
  }

  // Выделяем заполнение карточки данными в отдельный метод, чтобы можно было его переиспользовать
  // например, если захотим обновить поля карточки каким-нибудь добавленным в будущем инструментом
  _fillCard() {
    this._cardTitle.textContent = this._cardDescription.name;
    this._cardImage.src = this._cardDescription.link || damagedPhoto;
    this._cardImage.alt = this._cardDescription.alt;
  }

  _setEventListeners() {
    this._cardLikeButton.addEventListener('click', ()=>{this._handleLikeButtonClick()});
    this._cardDeleteButton.addEventListener('click',()=>{this._handleDeleteButtonClick()})
    this._cardImage.addEventListener('error', ()=>{this._handleImageError()});
    this._cardImage.addEventListener('click', ()=>{this._handlePhotoClick()});
  }


  _handleLikeButtonClick() {
    this._cardLikeButton.classList.toggle('like-button_filled');
  }

  _handleDeleteButtonClick() {
    this._cardElement.remove();
  }

  _handleImageError() {
    this._cardImage.src = damagedPhoto;
    this._cardImage.title = 'Ошибка загрузки изображения';
  }

  _handlePhotoClick() {
    this._handleCardClick(this._cardDescription);
  }

}

