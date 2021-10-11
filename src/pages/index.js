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
        editButton,
        addButton,
        updateAvatarButton,
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
  api.sendEditProfileRequest({name: inputList.name, about: inputList.status})
  .then((data)=>{
    userInfo.setUserInfo({
      name: data.name,
      status: data.about,
      avatarLink: data.avatar
    });
    editProfilePopup.clearFormWaiting();
    editProfilePopup.close();
  })
  .catch(()=>{
    editProfilePopup.clearFormWaiting();
    editProfilePopup.close();
    console.log('При редактировании даных пользователя произошла ошибка');
  })
});

const addCardPopup = new PopupWithForm('#add-card-popup', (inputList)=>{
  addCardPopup.setFormWaiting();
  api.sendAddNewCardRequest({name:inputList.title, link:inputList['photo-link']})
  .then((data)=>{
    cardList.insertElement(createCard(data));
    addCardPopup.clearFormWaiting();
    addCardPopup.close();
  })
  .catch(()=>{
    addCardPopup.clearFormWaiting();
    addCardPopup.close();
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
    updateAvatarPopup.close();
  })
  .catch(()=>{
    updateAvatarPopup.clearFormWaiting();
    updateAvatarPopup.close();
    console.log('При обновлении данных пользователя произошла ошибка');
  })
})

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

//================================ Cards ======================================
const handleCardDeletion = (card)=>{
  api.sendDeleteCardRequest(card.getId())
  .then(()=>{
    card.remove();
    confirmationPopup.close();
  })
  .catch(()=>{
    console.log('Удаление карточки не выполнено! Произошла ошибка при отправке запроса.')
  })
}

const cardList = new Section({
  items:[],
  renderer: (item)=>{
    cardList.insertElement(createCard(item));
  }
}, '.photo-cards');


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
    handleLikeCardCallback: ()=>{
      api.sendPutLikeCardRequest(card.getId())
      .then((data)=>{
        card.updateLikeInfo({
          isLiked: true,
          numberOfLikes: data.likes.length
        })
      })
      .catch(()=>{
        console.error('Лайк не установлен! Произошла ошибка')
      });
    },
    handleDeleteLikeCallback: ()=>{
      api.sendDeleteLikeCardRequest(card.getId())
      .then((data)=>{
        card.updateLikeInfo({
          isLiked: false,
          numberOfLikes: data.likes.length
        })
      })
      .catch(()=>{
        console.error('Лайк не установлен! Произошла ошибка')
      });
    },
    handleDeleteCardCallback: ()=>{
      confirmationPopup.open(card)
    }
  });
  return card.createCard();
}


const confirmationPopup = new PopupWithConfirmation('#confirmation-popup', handleCardDeletion);
confirmationPopup.setEventListeners();

Promise.all([api.getUserInfo(), api.getCardSet()])
  .then(([ userData, cards ]) => {
    userInfo.setUserInfo({
      name: userData.name,
      status: userData.about,
      avatarLink: userData.avatar,
      userId: userData._id
    });

    cards.forEach(item => {
      cardList.addItem(item);
    });
    cardList.renderItems();

  })
  .catch(()=>{
    console.log('При запросе данных пользователя произошла ошибка')
  });




