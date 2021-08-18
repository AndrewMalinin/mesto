/*=========================== Variables definition ==========================*/
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
const editProfilePopupCloseButton = editProfilePopup.querySelector('.popup__close-button');
const nameInput = editProfileForm.querySelector('#name-input');
const statusInput = editProfileForm.querySelector('#status-input');

const addCardPopup = document.querySelector('#add-card-popup');
const addCardForm = addCardPopup.querySelector('form[name=add-card-form]');
const addCardPopupCloseButton = addCardPopup.querySelector('.popup__close-button');
const cardTitleInput = addCardForm.querySelector('#title-input');
const cardLinkInput = addCardForm.querySelector('#photo-link-input');

const profileName = document.querySelector('.profile__name');
const statusName = document.querySelector('.profile__status');
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const cardsContainer = document.querySelector('.photo-cards');
const cardTemplate = document.querySelector('#card-template').content;
const popupPhotoTemplate = document.querySelector('#popup-photo-template').content;

const popupAnimationDuration_ms = 400;

/*============================== Cards function =============================*/
const createCard = (cardDescription)=> {
  const newCard = cardTemplate.querySelector('.photo-card').cloneNode(true);
  const cardTitle = newCard.querySelector('.photo-card__title');
  const cardImage = newCard.querySelector('.photo-card__photo');
  const cardLikeButton = newCard.querySelector('.photo-card__like-button');
  const cardDeleteButton = newCard.querySelector('.photo-card__delete-button');

  cardTitle.textContent = cardDescription.name;
  cardImage.src = cardDescription.link || './images/damaged-photo.jpg';
  cardImage.alt = cardDescription.alt;

  cardLikeButton.addEventListener('click', handleLikeButtonClick);
  cardDeleteButton.addEventListener('click', handleDeleteButtonClick)
  cardImage.addEventListener('error', handleImageError);
  cardImage.addEventListener('click', handlePhotoClick);

  return newCard;
}

const insertCard = (card)=> {
  cardsContainer.prepend(card);
}

const addNewCard = (cardDescription)=> {
  insertCard(createCard(cardDescription));
}

const insertInitialCards = ()=> {
  initialCards.forEach((item, index)=>{
    const card = createCard(item);
    card.style.animationDelay = `${index*0.05}s`;
    insertCard(card);
  });
}

const parseCard = (cardNode)=> {
  const title = cardNode.querySelector('.photo-card__title');
  const photo = cardNode.querySelector('.photo-card__photo')

  return {
    name: title.textContent,
    link: photo.src,
    alt: photo.alt
  }
}

/*=========================== Popup functions ===============================*/
const editProfilePopupOpen = ()=> {
  editProfilePopup.classList.add('popup_opened');
}

const popupClose = (popupNode)=> {
  popupNode.classList.add('popup_closing');
  popupNode.classList.remove('popup_opened');
  setTimeout(()=>{
    popupNode.classList.remove('popup_closing');
  },popupAnimationDuration_ms)
}

const editProfilePopupClose = ()=> {
  popupClose(editProfilePopup);
}

const addCardPopupOpen = ()=> {
  addCardPopup.classList.add('popup_opened');
}

const addCardPopupClose = ()=> {
  popupClose(addCardPopup);
}

const openPhotoPopup = (cardDescription)=> {
  function closePhotoPopup() {
    popup.classList.add('popup_closing');
    popup.classList.remove('popup_opened');
    setTimeout(()=>{
      popup.remove();
    },popupAnimationDuration_ms)
  }

  const popup = popupPhotoTemplate.querySelector('.popup').cloneNode(true);
  const photo = popup.querySelector('.popup__photo');
  const closeButton = popup.querySelector('.popup__close-button');
  const title = popup.querySelector('.popup__photo-title');

  photo.src = cardDescription.link;
  photo.alt = cardDescription.alt;
  title.textContent = cardDescription.name;

  closeButton.addEventListener('click', closePhotoPopup)

  document.body.append(popup);
}

/*================================ Handlers =================================*/

const handleLikeButtonClick = (e)=> {
  e.target.classList.toggle('like-button_filled');
}

const handleDeleteButtonClick = (e)=> {
  e.target.parentNode.remove();
}

const handlePhotoClick = (e)=> {
  openPhotoPopup(parseCard(e.target.parentNode));
}

const handleEditButtonClick = ()=> {
  editProfilePopupOpen();
  substituteTextInEditProfileForm();
}

const handleEditProfileFormSubmit = ()=>{
  profileName.textContent = nameInput.value;
  statusName.textContent = statusInput.value;
  editProfilePopupClose();
}

const handleAddButtonClick = ()=> {
  cardTitleInput.value = '';
  cardLinkInput.value = '';
  addCardPopupOpen();
}

const handleAddCardFormSubmit = ()=>{
  addNewCard({
    name: cardTitleInput.value,
    link: cardLinkInput.value,
    alt: "Фото загружено пользователем"
  })
  addCardPopupClose();
}

const handleImageError = (e)=> {
  e.target.src = './images/damaged-photo.jpg';
  e.target.title = 'Ошибка при загрузке фото';
}

const handleEscKeyDown = ()=>{
  const openedPopup = document.querySelector('.popup_opened');
  if (null !== openedPopup) {
    popupClose(openedPopup);
  }
}

/*================================= Forms ===================================*/

const substituteTextInEditProfileForm = ()=>{
  nameInput.value = profileName.textContent;
  statusInput.value = statusName.textContent;
}

/*================================= Main ====================================*/
substituteTextInEditProfileForm();
editButton.addEventListener('click', handleEditButtonClick);
editProfilePopup.addEventListener('click', editProfilePopupClose);
editProfilePopupCloseButton.addEventListener('click', editProfilePopupClose);


addButton.addEventListener('click', handleAddButtonClick);
addCardPopup.addEventListener('click', addCardPopupClose);
addCardPopupCloseButton.addEventListener('click', addCardPopupClose);


document.body.addEventListener('keydown', (e)=>{
  if (e.key === 'Escape') {
    handleEscKeyDown();
  }
})

insertInitialCards();
