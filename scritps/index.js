let initElements = ()=>{
  const popup = document.querySelector('.popup');
  const nameInput = document.querySelector('#name-input');
  const statusInput = document.querySelector('#status-input');
  const profileName = document.querySelector('.profile__name');
  const statusName = document.querySelector('.profile__status');
  const editButton = document.querySelector('.profile__edit-button');
  const closeButton = document.querySelector('.popup__close-button');
  const form = document.querySelector('.form');

  const popupOpen = ()=> {
    popup.classList.add('popup_opened');
  }

  const popupClose = ()=> {
    popup.classList.remove('popup_opened');  
  }

  const handleEditButtonClick = ()=> {
    popupOpen();
    nameInput.value = profileName.textContent;
    statusInput.value = statusName.textContent;
  }

  const handleFormSubmit = (e)=>{
    e.preventDefault();
    profileName.textContent = nameInput.value;
    statusName.textContent = statusInput.value;
    popupClose();
  }

  const handleCloseButtonClick = ()=> {
    popupClose();
  }

  editButton.addEventListener('click', handleEditButtonClick);
  closeButton.addEventListener('click', handleCloseButtonClick);
  form.addEventListener('submit', handleFormSubmit);
}

initElements();

