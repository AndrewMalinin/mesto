import Card from '../scripts/components/Card.js';
import PopupWithForm from '../scripts/components/PopupWithForm.js';
import PopupWithConfirmation from '../scripts/components/PopupWithConfirmation.js';
import PopupWithImage from '../scripts/components/PopupWithImage.js'
import FormValidator from '../scripts/components/FormValidator.js';
import Section from '../scripts/components/Section.js';
import UserInfo from '../scripts/components/UserInfo.js';
import Api from '../scripts/components/Api.js';

import {settings,
        addCardForm,
        editProfileForm,
        updateAvatarForm,
        nameInput,
        statusInput,
        apiKey,
        groupId
} from '../scripts/utils/constants.js'

import '../pages/index.css';

const api = new Api({
  baseUrl : `https://mesto.nomoreparties.co/v1/${groupId}`,
  token: apiKey
});

const substituteTextInEditProfileForm = ({name, status})=>{
  nameInput.value = name;
  statusInput.value = status;
}

//=============================== Form Validators =============================

const editProfileFormValidator = new FormValidator(settings, editProfileForm);
const addCardFormValidator = new FormValidator(settings, addCardForm);
const updateAvatarFormValidator = new FormValidator(settings, updateAvatarForm)
editProfileFormValidator.enableValidation();
addCardFormValidator.enableValidation();
updateAvatarFormValidator.enableValidation();

//============================ Buttons ========================================
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const updateAvatarButton = document.querySelector('.profile__avatar-container');

addButton.addEventListener('click', ()=>{
  addCardFormValidator.toggleButtonState();
  addCardPopup.open();
});

editButton.addEventListener('click',()=>{
  substituteTextInEditProfileForm(userInfo.getUserInfo());
  editProfilePopup.open();
});


updateAvatarButton.addEventListener('click', ()=>{
  updateAvatarPopup.open();
})

//============================= Popups ========================================
const photoPopup = new PopupWithImage('#photo-popup');
const editProfilePopup = new PopupWithForm('#edit-profile-popup', (inputList)=>{
  editProfilePopup.setFormWaiting();
  api.sendEditProfileRequest({name: inputList.name, about: inputList.status}).then((data)=>{
    userInfo.setUserInfo({
      name: data.name,
      status: data.about,
      avatarLink: data.avatar
    });
    editProfilePopup.clearFormWaiting();
  })
});

const addCardPopup = new PopupWithForm('#add-card-popup', (inputList)=>{
  addCardPopup.setFormWaiting();
  api.sendAddNewCardRequest({name:inputList.title, link:inputList['photo-link']})
  .then((data)=>{
    cardList.insertElement(createCard(data));
    addCardPopup.clearFormWaiting();
  })
  .catch(()=>{
    addCardPopup.clearFormWaiting();
    console.log('При добавлении карточки произошла ошибка');
  })
});

const updateAvatarPopup = new PopupWithForm('#update-avatar-popup', (inputList)=>{
  updateAvatarPopup.setFormWaiting();
  api.sendUpdateUserAvatarRequest(inputList['avatar-link'])
  .then((data)=>{
    userInfo.setUserInfo({
      name: data.name,
      status: data.about,
      avatarLink: data.avatar
    });
    updateAvatarPopup.clearFormWaiting();
  })
  .catch(()=>{
    updateAvatarPopup.clearFormWaiting();
    console.log('При обновлении данных пользователя произошла ошибка');
  })
})

const confirmationPopup = new PopupWithConfirmation('#confirmation-popup');


updateAvatarPopup.setEventListeners();
photoPopup.setEventListeners();
editProfilePopup.setEventListeners();
addCardPopup.setEventListeners();
//============================= User Info =====================================

const userInfo = new UserInfo({
  userNameSelector: '.profile__name',
  userStatusSelector: '.profile__status',
  avatarSelector:'.profile__avatar',
  userId: undefined
});

api.getUserInfo()
  .then((data)=>{
    userInfo.setUserInfo({
      name: data.name,
      status: data.about,
      avatarLink: data.avatar,
      userId: data._id
    });
  })
  .catch(()=>{
    console.log('При запросе данных пользователя произошла ошибка')
  });

//================================ Cards ======================================

const handleCardDeletion = (cardId)=>{
  return new Promise((resolve, reject)=>{
    confirmationPopup.open()
    .then(()=>{
      api.sendDeleteCardRequest(cardId)
      .then(resolve)
      .catch(reject)
    })
    .catch()
  });
}

const createCard = function(item) {
  const myId = userInfo.getUserInfo().userId;
  // Флаг для расстановки лайков, после загрузки карточек с сервера
  item.isLikedByMe = item.likes.some((user)=>{
    return user._id === myId;
  })
  // Флаг для расстановки кнопок удаления карточек, только на свои карточки
  item.isMyCard = 'owner' in item ? item.owner._id === myId: true;
  const card = new Card({
    cardTemplateSelector: '#card-template',
    cardDescription: item,
    handleCardClick: ()=>{
      photoPopup.open(item);
    },
    handleLikeButtonClickCallback: (isLike, cardId)=>{
      return new Promise((resolve, reject)=>{
        if (isLike) {
          api.sendPutLikeCardRequest(cardId)
          .then((data)=>{
            resolve(data.likes.length);
          })
          .catch(()=>{
            reject();
          })
        }
        else {
          api.sendDeleteLikeCardRequest(cardId)
          .then((data)=>{
            resolve(data.likes.length);
          })
          .catch(()=>{
            reject();
          })
        }
      })
    },
    handleDeleteButtonClickCallback: handleCardDeletion
  });
  return card.createCard();
}


const cardList = new Section({
  items:[],
  renderer: (item)=>{
    cardList.insertElement(createCard(item));
  }
}, '.photo-cards');


const requestInitialCards = function(){
  cardList._items = [];
  api.getCardSet()
  .then((data)=>{
    data.forEach(item => {
      cardList.addItem(item);
    });
    cardList.renderItems();
  })
  .catch((err)=>{
    // Реконнект в случае ошибки
    setTimeout(requestInitialCards, 5000)
  });
}

requestInitialCards();








