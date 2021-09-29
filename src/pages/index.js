import Card from '../scripts/components/Card.js';
import PopupWithForm from '../scripts/components/PopupWithForm.js';
import PopupWithImage from '../scripts/components/PopupWithImage.js'
import FormValidator from '../scripts/components/FormValidator.js';
import Section from '../scripts/components/Section.js';
import UserInfo from '../scripts/components/UserInfo.js';

import {settings,
        addCardForm,
        editProfileForm,
        nameInput,
        statusInput,
        sochiImagePath,
        tverImagePath,
        kareliaImagePath,
        sheregeshImagePath,
        altaiImagePath,
        vyoksaImagePath
} from '../scripts/utils/constants.js'


import '../pages/index.css';

const substituteTextInEditProfileForm = ({name, status})=>{
  nameInput.value = name;
  statusInput.value = status;
}

//=============================== Form Validators =============================

const editProfileFormValidator = new FormValidator(settings, editProfileForm);
const addCardFormValidator = new FormValidator(settings, addCardForm);
editProfileFormValidator.enableValidation();
addCardFormValidator.enableValidation();

//============================ Buttons ========================================
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');

addButton.addEventListener('click', ()=>{
  addCardFormValidator.toggleButtonState();
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
  cardList.inserElement(createCard({
    name: inputList.title,
    link: inputList['photo-link'],
    alt: 'Фото добавлено пользователем'
  }));
});

photoPopup.setEventListeners();
editProfilePopup.setEventListeners();
addCardPopup.setEventListeners();

//============================= User Info =====================================
const userInfo = new UserInfo('.profile__name', '.profile__status');

//================================ Cards ======================================

const createCard = function(item) {
  const card = new Card('#card-template', item, ()=>{
    photoPopup.open(item);
  });
  return card.createCard();
}

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
      cardList.inserElement(createCard(item));
    }
  }, '.photo-cards');

cardList.renderItems();

