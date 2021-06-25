let initElements = ()=>{
  const popup = document.querySelector('.popup');
  const nameInput = document.querySelector('#name-input');
  const statusInput = document.querySelector('#status-input');
  const profileName = document.querySelector('.profile__name');
  const statusName = document.querySelector('.profile__status');

  const handleEditButtonClick = ()=> {
    popup.classList.add('popup_opened');
    nameInput.value = profileName.textContent;
    statusInput.value = statusName.textContent;
  }

  const handleFormSubmit = (e)=>{
    e.preventDefault();
    profileName.textContent = nameInput.value;
    statusName.textContent = statusInput.value;
    popup.classList.remove('popup_opened');
  }

  const handleCloseButtonClick = ()=> {
    popup.classList.remove('popup_opened');
  }

  document.querySelector('.profile__edit-button').addEventListener('click', handleEditButtonClick);
  document.querySelector('.popup__close-button').addEventListener('click', handleCloseButtonClick);
  document.querySelector('.form').addEventListener('submit', handleFormSubmit);
}

document.addEventListener("DOMContentLoaded", initElements);

