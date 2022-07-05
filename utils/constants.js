export const initialCards = [{
    name: 'Карачаевск',
    link: './images/photo-1.jpg',
  },
  {
    name: 'Гора Эльбрус',
    link: './images/photo-2.jpg',
  },
  {
    name: 'Домбай',
    link: './images/photo-3.jpg',
  },
  {
    name: 'Калуга',
    link: './images/photo-4.jpg',
  },
  {
    name: 'Санкт-Петербург',
    link: './images/photo-5.jpg',
  },
  {
    name: 'Калининград',
    link: './images/photo-6.jpg',
  },
];

export const validationConfig = {
  formSelector: '.modal__form',
  inputSelector: '.modal__input',
  submitButtonSelector: '.modal__btn',
  inactiveButtonClass: 'modal__btn_inactive',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'modal__input-error_visible'
};

export const ESC_CODE = 'Escape';
export const cardsContainer = document.querySelector('.gallery__list');

export const closeButtons = document.querySelectorAll('.modal__close');

export const addCardBtn = document.querySelector('.profile__add-btn');
export const modalAddCard = document.querySelector('.modal_type_add-new-card');
export const addCardForm = modalAddCard.querySelector('.modal__form_type_add-card');
export const inputPlaceName = addCardForm.querySelector('.modal__input-place-name');
export const inputPlaceLink = addCardForm.querySelector('.modal__input-place-link');

export const editBtn = document.querySelector('.profile__edit-btn');
export const modalEdit = document.querySelector('.modal_type_edit-form');
export const editForm = modalEdit.querySelector('.modal__form_type_edit');
export const userName = modalEdit.querySelector('.modal__input-name');
export const userDescription = modalEdit.querySelector('.modal__input-description');
export const profileName = document.querySelector('.profile__name');
export const profileDescription = document.querySelector('.profile__description');

export const modalFullScreen = document.querySelector('.modal_type_fullscreen-img');
export const fullScreenImg = modalFullScreen.querySelector('.modal__img-fullscreen');
export const fullScreenCaption = modalFullScreen.querySelector('.modal__fullscreen-caption');

export const formValidation = {};