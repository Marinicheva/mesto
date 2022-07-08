export const initialCards = [{
  'place-name': 'Карачаевск',
  'place-link': './images/photo-1.jpg',
},
{
  'place-name': 'Гора Эльбрус',
  'place-link': './images/photo-2.jpg',
},
{
  'place-name': 'Домбай',
  'place-link': './images/photo-3.jpg',
},
{
  'place-name': 'Калуга',
  'place-link': './images/photo-4.jpg',
},
{
  'place-name': 'Санкт-Петербург',
  'place-link': './images/photo-5.jpg',
},
{
  'place-name': 'Калининград',
  'place-link': './images/photo-6.jpg',
},
];

export const formValidation = {};

export const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__btn',
  inactiveButtonClass: 'popup__btn_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_visible'
};

export const cardsContainer = document.querySelector('.gallery__list');

export const addCardBtn = document.querySelector('.profile__add-btn');
export const editBtn = document.querySelector('.profile__edit-btn');

export const ESC_CODE = 'Escape';