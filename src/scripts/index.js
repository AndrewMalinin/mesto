import Card from './components/Card.js';
import PopupWithForm from './components/PopupWithForm.js';
import PopupWithImage from './components/PopupWithImage.js'
import FormValidator from './components/FormValidator.js';
import Section from './components/Section.js';
import UserInfo from './components/UserInfo.js';

import '../pages/index.css';

//==================== Webpack Image Imports ==================================
const sochiImagePath = new URL('../images/photo-sochi.jpg', import.meta.url);
const kareliaImagePath = new URL('../images/photo-karelia.jpg', import.meta.url);
const altaiImagePath = new URL('../images/photo-altai.jpg', import.meta.url);
const vyoksaImagePath = new URL('../images/photo-vyoksa.jpg', import.meta.url);
const tverImagePath = new URL('../images/photo-tver.jpg', import.meta.url);
const sheregeshImagePath = new URL('../images/photo-sheregesh.jpg', import.meta.url);

//============================== Forms ========================================
const addCardForm = document.querySelector('form[name=add-card-form]');
const editProfileForm = document.querySelector('form[name=edit-profile-form]');
const nameInput = editProfileForm.querySelector('#name-input');
const statusInput = editProfileForm.querySelector('#status-input');

const substituteTextInEditProfileForm = ({name, status})=>{
  nameInput.value = name;
  statusInput.value = status;
}

//=============================== Form Validators =============================
const settings = {
  formSelector: '.popup__form',
  inputSelector: '.form__item',
  submitButtonSelector: '.form__submit-button',
  inactiveButtonClass: 'form__submit-button_inactive',
  inputErrorClass: 'form__item_type_error',
  errorClass: 'form__input-error_active',
}

const editProfileFormValidator = new FormValidator(settings, editProfileForm);
const addCardFormValidator = new FormValidator(settings, addCardForm);
editProfileFormValidator.enableValidation();
addCardFormValidator.enableValidation();

//============================ Buttons ========================================
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');

addButton.addEventListener('click', ()=>{
  addCardPopup.open();
});

editButton.addEventListener('click',()=>{
  substituteTextInEditProfileForm(userInfo.getUserInfo());
  editProfilePopup.open();
});

//============================= Popups ========================================
const photoPopup = new PopupWithImage('#photo-popup');
const editProfilePopup = new PopupWithForm('#edit-profile-popup', (inputList)=>{
  userInfo.setUserInfo(inputList);
});

const addCardPopup = new PopupWithForm('#add-card-popup', (inputList)=>{
  cardList.addItem({
    name: inputList.title,
    link: inputList['photo-link'],
    alt: 'Фото добавлено пользователем'
  });

  cardList.renderItems();
});

photoPopup.setEventListeners();
editProfilePopup.setEventListeners();
addCardPopup.setEventListeners();

//============================= User Info =====================================
const userInfo = new UserInfo('.profile__name', '.profile__status');

//================================ Cards ======================================
const cardList = new Section({
    items:[
      {
        name: 'Сочи',
        link: sochiImagePath,
        alt: 'Фото олимпийских колец'
      },
      {
        name: 'Карелия',
        link: kareliaImagePath,
        alt: 'Фото божьей коровки во мхе'
      },
      {
        name: 'Горный Алтай',
        link: altaiImagePath,
        alt: 'Фото реки Катунь'
      },
      {
        name: 'Река Вуокса',
        link: vyoksaImagePath,
        alt: 'Фото камней на берегу Вуоксы под луной'
      },
      {
        name: 'Тверская область',
        link: tverImagePath,
        alt: 'Фото заснеженного леса'
      },
      {
        name: 'Шерегеш',
        link: sheregeshImagePath,
        alt: 'Фото фуникулёра на секторе Е, Шерегеш'
      }
    ],
    renderer: (item)=>{
      const handleCardClick = ()=>{
        photoPopup.open(item);
      };
      const card = new Card('#card-template', item, handleCardClick);
      const cardElement = card.createCard();

      cardList.inserElement(cardElement);
    }
  }, '.photo-cards');

cardList.renderItems();

