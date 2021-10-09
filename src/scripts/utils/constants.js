//==================== Webpack Image Imports ==================================
export const avatarEmpty = new URL('../../images/avatar-empty.jpg', import.meta.url);
export const damagedPhoto = new URL('../../images/damaged-photo.jpg', import.meta.url);

//============================== Forms ========================================
export const addCardForm = document.querySelector('form[name=add-card-form]');
export const editProfileForm = document.querySelector('form[name=edit-profile-form]');
export const updateAvatarForm = document.querySelector('form[name=update-avatar-form]');
export const nameInput = editProfileForm.querySelector('#name-input');
export const statusInput = editProfileForm.querySelector('#status-input');


export const settings = {
  formSelector: '.popup__form',
  inputSelector: '.form__item',
  submitButtonSelector: '.form__submit-button',
  inactiveButtonClass: 'form__submit-button_inactive',
  inputErrorClass: 'form__item_type_error',
  errorClass: 'form__input-error_active',
}

//============================== Api data =====================================
export const apiKey = 'ea755ed6-7278-4a36-bcf5-011ef17fbeb5';
export const groupId = 'cohort-28';
