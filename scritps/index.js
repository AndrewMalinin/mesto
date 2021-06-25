let initElements = ()=>{

  const editButtonClickHandler = ()=> {
    document.querySelector('.popup').classList.add('popup_opened');
    document.querySelector('#name-input').value = document.querySelector('.profile__name').textContent;
    document.querySelector('#status-input').value = document.querySelector('.profile__status').textContent;
  }

  const formSubmitHandler = (e)=>{
    e.preventDefault();
    const enteredName = document.querySelector('#name-input').value;
    const enteredStatus = document.querySelector('#status-input').value;

    if (enteredName.length) {
      document.querySelector('.profile__name').textContent = enteredName;
    }
    if (enteredStatus.length) {
      document.querySelector('.profile__status').textContent = enteredStatus;
    }
    document.querySelector('.popup').classList.remove('popup_opened');
  }

  const closeButtonClickHandler = ()=> {
    document.querySelector('.popup').classList.remove('popup_opened');
  }

  document.querySelector('.profile__edit-button').addEventListener('click', editButtonClickHandler);
  document.querySelector('.popup__close-button').addEventListener('click', closeButtonClickHandler);
  document.querySelector('.form').addEventListener('submit', formSubmitHandler);
}

document.addEventListener("DOMContentLoaded", initElements);

