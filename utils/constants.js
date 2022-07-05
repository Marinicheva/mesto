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
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__btn',
  inactiveButtonClass: 'popup__btn_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_visible'
};

export const ESC_CODE = 'Escape';
export const cardsContainer = document.querySelector('.gallery__list');

export const closeButtons = document.querySelectorAll('.popup__close');

export const addCardBtn = document.querySelector('.profile__add-btn');
export const popupAddCard = document.querySelector('.popup_type_add-new-card');
export const addCardForm = popupAddCard.querySelector('.popup__form_type_add-card');
export const inputPlaceName = addCardForm.querySelector('.popup__input-place-name');
export const inputPlaceLink = addCardForm.querySelector('.popup__input-place-link');

export const editBtn = document.querySelector('.profile__edit-btn');
export const popupEdit = document.querySelector('.popup_type_edit-form');
export const editForm = popupEdit.querySelector('.popup__form_type_edit');
export const userName = popupEdit.querySelector('.popup__input-name');
export const userDescription = popupEdit.querySelector('.popup__input-description');
export const profileName = document.querySelector('.profile__name');
export const profileDescription = document.querySelector('.profile__description');

export const popupFullScreen = document.querySelector('.popup_type_fullscreen-img');
export const fullScreenImg = popupFullScreen.querySelector('.popup__img-fullscreen');
export const fullScreenCaption = popupFullScreen.querySelector('.popup__fullscreen-caption');

export const formValidation = {};