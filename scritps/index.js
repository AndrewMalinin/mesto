const editProfilePopup = document.querySelector('#edit-profile-popup');
const editProfileForm = editProfilePopup.querySelector('form[name=edit-profile-form]');
const editProfilePopupCloseButton = editProfilePopup.querySelector('.popup__close-button');
const nameInput = editProfileForm.querySelector('#name-input');
const statusInput = editProfileForm.querySelector('#status-input');

const addCardPopup = document.querySelector('#add-card-popup');
const addCardForm = addCardPopup.querySelector('form[name=add-card-form]');
const addCardSubmitButton = addCardPopup.querySelector('.form__submit-button')
const addCardPopupCloseButton = addCardPopup.querySelector('.popup__close-button');
const cardTitleInput = addCardForm.querySelector('#title-input');
const cardLinkInput = addCardForm.querySelector('#photo-link-input');

const profileName = document.querySelector('.profile__name');
const statusName = document.querySelector('.profile__status');
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const cardsContainer = document.querySelector('.photo-cards');
const cardTemplate = document.querySelector('#card-template').content;
const photoPopup = document.querySelector('#photo-popup');
const photoPopupCloseButton = photoPopup.querySelector('.popup__close-button');
const photo = photoPopup.querySelector('.popup__photo');
const photoTitle = photoPopup.querySelector('.popup__photo-title');

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

const popupOpen = (popupNode)=> {
  popupNode.classList.add('popup_opened');
}

const popupClose = (popupNode)=> {
  popupNode.classList.add('popup_closing');
  popupNode.classList.remove('popup_opened');
  setTimeout(()=>{
    popupNode.classList.remove('popup_closing');
  },popupAnimationDuration_ms)
}

const openPhotoPopup = (cardDescription)=> {

  photo.src = cardDescription.link;
  photo.alt = cardDescription.alt;
  photoTitle.textContent = cardDescription.name;

  popupOpen(photoPopup);
  addEscListener();
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
  substituteTextInEditProfileForm();
  popupOpen(editProfilePopup);
  addEscListener();
}

const handleEditProfileFormSubmit = ()=>{
  profileName.textContent = nameInput.value;
  statusName.textContent = statusInput.value;
  popupClose(editProfilePopup);
  removeEscListener();
}

const handleAddButtonClick = ()=> {
  cardTitleInput.value = '';
  cardLinkInput.value = '';
  addCardSubmitButton.classList.add('form__submit-button_inactive');
  addCardSubmitButton.disabled = true;
  popupOpen(addCardPopup);
  addEscListener();
}

const handleAddCardFormSubmit = ()=>{
  addNewCard({
    name: cardTitleInput.value,
    link: cardLinkInput.value,
    alt: "Фото загружено пользователем"
  })
  popupClose(addCardPopup);
  removeEscListener();
}

const handleImageError = (e)=> {
  e.target.src = './images/damaged-photo.jpg';
  e.target.title = 'Ошибка при загрузке фото';
}

const addEscListener = ()=>{
  document.addEventListener('keydown', handleEscKeyDown);
}

const removeEscListener = ()=> {
  document.removeEventListener('keydown', handleEscKeyDown);
}

const handleEscKeyDown = (e)=>{
  if (e.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    if (openedPopup !== null) {
      popupClose(openedPopup);
      removeEscListener();
    }
  }
}

const handlePopupClick = (e)=>{
  if (e.target.classList.contains('popup')){
    popupClose(e.target);
    removeEscListener();
  }
  if (e.target.classList.contains('popup__close-button')) {
    popupClose(e.target.parentNode.parentNode);
    removeEscListener();
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

editProfilePopup.addEventListener('click', handlePopupClick);
addCardPopup.addEventListener('click', handlePopupClick);
photoPopup.addEventListener('click', handlePopupClick);

insertInitialCards();
