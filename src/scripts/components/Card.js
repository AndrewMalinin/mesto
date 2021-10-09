import { damagedPhoto } from "../utils/constants";
export default class Card {
  constructor({cardTemplateSelector, cardDescription, handleCardClick, handleLikeButtonClickCallback, handleDeleteButtonClickCallback}) {
    this._cardTemplateSelector = cardTemplateSelector;
    this._cardDescription = cardDescription;
    this._handleCardClick = handleCardClick;
    this._handleLikeButtonClickCallback = handleLikeButtonClickCallback;
    this._handleDeleteButtonClickCallback = handleDeleteButtonClickCallback;
  }

  createCard() {
    this._cardElement = document.querySelector(this._cardTemplateSelector).content.cloneNode(true).firstElementChild ;
    this._cardTitle = this._cardElement.querySelector('.photo-card__title');
    this._cardImage = this._cardElement.querySelector('.photo-card__photo');
    this._cardLikeButton = this._cardElement.querySelector('.photo-card__like-button');
    this._cardDeleteButton = this._cardElement.querySelector('.photo-card__delete-button');
    this._cardLikesCounter = this._cardElement.querySelector('.photo-card__likes-counter');
    if(!this._cardDescription.isMyCard) {
      this._cardDeleteButton.style.display = 'none';
    }
    this._fillCard();
    this._setEventListeners();

    return this._cardElement;
  }


  _fillCard() {
    this._cardTitle.textContent = this._cardDescription.name;
    this._cardImage.src = this._cardDescription.link || damagedPhoto;
    this._cardImage.alt = this._cardDescription.alt || 'Фото загружено пользователем';
    this._cardLikesCounter.textContent = this._cardDescription.likes.length;
    if(this._cardDescription.isLikedByMe) {
      this._setLike();
    }
  }

  _setEventListeners() {
    this._cardLikeButton.addEventListener('click', ()=>{this._handleLikeButtonClick()});
    if(this._cardDescription.isMyCard) {
      this._cardDeleteButton.addEventListener('click',()=>{this._handleDeleteButtonClick()})
    }
    this._cardImage.addEventListener('error', ()=>{this._handleImageError()});
    this._cardImage.addEventListener('click', ()=>{this._handlePhotoClick()});
  }

  _setLike() {
    this._cardLikeButton.classList.add('like-button_filled');
  }

  _removeLike() {
    this._cardLikeButton.classList.remove('like-button_filled');
  }

  _changeLikesCounter(numberOfLikes) {
    this._cardLikesCounter.textContent = String(numberOfLikes);
  }

  _handleLikeButtonClick() {
    let isLike;
    //Если на момент клика, лайк стоял - значит произошло событие снятия лайка
    if (this._cardLikeButton.classList.contains('like-button_filled')) {
      this._removeLike();
      isLike = false;
    }
    else {
      this._setLike();
      isLike = true;
    }

    this._handleLikeButtonClickCallback(isLike, this._cardDescription._id)
    .then((numberOfLikes)=>{
      this._changeLikesCounter(numberOfLikes);
    })
    .catch(()=>{
      console.error(`Запрос ${isLike ? 'постановки':'снятия' } лайка завершился с ошибкой, действие отменено`);
      if (isLike) {
        this._removeLike();
      }
      else {
        this._setLike();
      }
    })
  }

  _handleDeleteButtonClick() {
    this._handleDeleteButtonClickCallback(this._cardDescription._id)
    .then(()=>{
      this._cardElement.remove();
    })
    .catch(()=>{
      console.log('Карточка не удалена из-за ошибки в this._handleDeleteButtonClickCallback')
    })
  }

  _handleImageError() {
    this._cardImage.src = damagedPhoto;
    this._cardImage.title = 'Ошибка загрузки изображения';
  }

  _handlePhotoClick() {
    this._handleCardClick(this._cardDescription);
  }

}

