export const formValidation = {};

export const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__btn',
  inactiveButtonClass: 'popup__btn_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_visible'
};

export const addCardBtn = document.querySelector('.profile__add-btn');
export const editBtn = document.querySelector('.profile__edit-btn');

export const ESC_CODE = 'Escape';

export const apiConfig = {
  url: 'https://mesto.nomoreparties.co/v1/cohort-46/',
  headers: {
    "authorization": "8c85438e-65cc-450c-bee8-2c152a950866",
    "Content-type": "application/json"
  }
}