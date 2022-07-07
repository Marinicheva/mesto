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

export const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__btn',
  inactiveButtonClass: 'popup__btn_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_visible'
};

export const ESC_CODE = 'Escape';
export const cardsContainer = document.querySelector('.gallery__list');

export const addCardBtn = document.querySelector('.profile__add-btn');
export const addCardForm = document.querySelector('.popup__form_type_add-card');

export const editBtn = document.querySelector('.profile__edit-btn');
export const popupEdit = document.querySelector('.popup_type_edit-form');
export const editForm = popupEdit.querySelector('.popup__form_type_edit');
export const userName = popupEdit.querySelector('.popup__input-name');
export const userDescription = popupEdit.querySelector('.popup__input-description');
export const profileName = document.querySelector('.profile__name');
export const profileDescription = document.querySelector('.profile__description');

export const formValidation = {};