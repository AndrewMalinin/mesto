//==================== Webpack Image Imports ==================================
export const sochiImagePath = new URL('../../images/photo-sochi.jpg', import.meta.url);
export const kareliaImagePath = new URL('../../images/photo-karelia.jpg', import.meta.url);
export const altaiImagePath = new URL('../../images/photo-altai.jpg', import.meta.url);
export const vyoksaImagePath = new URL('../../images/photo-vyoksa.jpg', import.meta.url);
export const tverImagePath = new URL('../../images/photo-tver.jpg', import.meta.url);
export const sheregeshImagePath = new URL('../../images/photo-sheregesh.jpg', import.meta.url);

export const damagedPhoto = new URL('../../images/damaged-photo.jpg', import.meta.url);

//============================== Forms ========================================
export const addCardForm = document.querySelector('form[name=add-card-form]');
export const editProfileForm = document.querySelector('form[name=edit-profile-form]');
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
