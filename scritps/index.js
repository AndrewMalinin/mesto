import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';

const initialCards = [
  {
    name: 'Сочи',
    link: './images/photo-sochi.jpg',
    alt: 'Фото олимпийских колец'
  },
  {
    name: 'Карелия',
    link: './images/photo-karelia.jpg',
    alt: 'Фото божьей коровки во мхе'
  },
  {
    name: 'Горный Алтай',
    link: './images/photo-altai.jpg',
    alt: 'Фото реки Катунь'
  },
  {
    name: 'Река Вуокса',
    link: './images/photo-vyoksa.jpg',
    alt: 'Фото камней на берегу Вуоксы под луной'
  },
  {
    name: 'Тверская область',
    link: './images/photo-tver.jpg',
    alt: 'Фото заснеженного леса'
  },
  {
    name: 'Шерегеш',
    link: './images/photo-sheregesh.jpg',
    alt: 'Фото фуникулёра на секторе Е, Шерегеш'
  }
];

const editProfilePopup = document.querySelector('#edit-profile-popup');
const editProfileForm = editProfilePopup.querySelector('form[name=edit-profile-form]');
const nameInput = editProfileForm.querySelector('#name-input');
const statusInput = editProfileForm.querySelector('#status-input');

const addCardPopup = document.querySelector('#add-card-popup');
const addCardForm = addCardPopup.querySelector('form[name=add-card-form]');
const cardTitleInput = addCardForm.querySelector('#title-input');
const cardLinkInput = addCardForm.querySelector('#photo-link-input');

const profileName = document.querySelector('.profile__name');
const statusName = document.querySelector('.profile__status');
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const cardsContainer = document.querySelector('.photo-cards');
const photoPopup = document.querySelector('#photo-popup');
const photo = photoPopup.querySelector('.popup__photo');
const photoTitle = photoPopup.querySelector('.popup__photo-title');


/*============================== Cards function =============================*/
  const insertCard = (card)=> {
    cardsContainer.prepend(card);
  }

  const insertInitialCards = ()=> {
    initialCards.forEach((item, index, arr)=>{
      const card = new Card('#card-template', item, openPhotoPopup);
      const cardElement = card.createCard();

      cardElement.style.animationDelay = `${(arr.length - index)*0.05}s`;
      insertCard(cardElement);
    });
  }
/*=========================== Popup functions ===============================*/

const openPopup = (popupNode)=> {
  popupNode.classList.add('popup_opened');
  addEscListener();
}

const closePopup = (popupNode)=> {
  popupNode.classList.remove('popup_opened');
  popupNode.inne
  removeEscListener();
}

const openPhotoPopup = (cardDescription)=> {

  photo.src = cardDescription.link;
  photo.alt = cardDescription.alt;
  photoTitle.textContent = cardDescription.name;

  openPopup(photoPopup);
}

const addEscListener = ()=>{
  document.addEventListener('keydown', handleEscKeyDown);
}

const removeEscListener = ()=> {
  document.removeEventListener('keydown', handleEscKeyDown);
}

const addFormSumbitHandlers = ()=>{

  addCardForm.addEventListener('submit', (e)=>{
    e.preventDefault();
    const formInputList = Array.from(addCardForm.querySelectorAll('.form__item'))
    if (!FormValidator.hasInvalidInput(formInputList)) {
      handleAddCardFormSubmit();
    }
  });

  editProfileForm.addEventListener('submit', (e)=>{
    e.preventDefault();
    const formInputList = Array.from(editProfileForm.querySelectorAll('.form__item'))
    if (!FormValidator.hasInvalidInput(formInputList)) {
      handleEditProfileFormSubmit();
    }
  });
}
/*================================ Handlers =================================*/

const handleEditButtonClick = ()=> {
  substituteTextInEditProfileForm();
  openPopup(editProfilePopup);
}

const handleEditProfileFormSubmit = ()=>{
  profileName.textContent = nameInput.value;
  statusName.textContent = statusInput.value;
  closePopup(editProfilePopup);
  removeEscListener();
}

const handleAddButtonClick = ()=> {
  cardTitleInput.value = '';
  cardLinkInput.value = '';
  addCardFormValidator.toggleButtonState();
  openPopup(addCardPopup);
}

const handleAddCardFormSubmit = ()=>{
  const card = new Card('#card-template', {
    name: cardTitleInput.value,
    link: cardLinkInput.value,
    alt: "Фото загружено пользователем"
  }, openPhotoPopup);

  const cardElement = card.createCard();

  insertCard(cardElement);
  closePopup(addCardPopup);
}


const handleEscKeyDown = (e)=>{
  if (e.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    if (openedPopup !== null) {
      closePopup(openedPopup);
    }
  }
}

const handlePopupClick = (e)=>{

  // Объединение двух условий в одно (с помощью ||) невозможно,
  // так как две этих условных конструкции выполняют разный код (функции принимают ражные аргументы)
  if (e.target.classList.contains('popup')){
    closePopup(e.target);
  }
  if (e.target.classList.contains('popup__close-button')) {
    closePopup(e.target.parentNode.parentNode);
  }
}

/*================================= Forms ===================================*/

const substituteTextInEditProfileForm = ()=>{
  nameInput.value = profileName.textContent;
  statusInput.value = statusName.textContent;
}

/*================================= Main ====================================*/
editButton.addEventListener('click', handleEditButtonClick);
addButton.addEventListener('click', handleAddButtonClick);

// Вешаем обработчики на событие mousedown, а не на click, чтобы убрать неприятный баг
// при котором mousedown внутри формы и mouseup вне формы(мышка отводится в сторону во время набора текста),
// приводило к закрытию формы
editProfilePopup.addEventListener('mousedown', handlePopupClick);
addCardPopup.addEventListener('mousedown', handlePopupClick);
photoPopup.addEventListener('mousedown', handlePopupClick);

insertInitialCards();
addFormSumbitHandlers();


const settings = {
  formSelector: '.popup__form',
  inputSelector: '.form__item',
  submitButtonSelector: '.form__submit-button',
  inactiveButtonClass: 'form__submit-button_inactive',
  inputErrorClass: 'form__item_type_error',
  errorClass: 'form__input-error_active',
};

const editProfileFormValidator = new FormValidator(settings, editProfileForm);
const addCardFormValidator = new FormValidator(settings, addCardForm);
editProfileFormValidator.enableValidation();
addCardFormValidator.enableValidation();
