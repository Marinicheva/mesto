import karachevskImg from '../images/photo-1.jpg';
import elbrusImg from '../images/photo-2.jpg';
import dombaiImg from '../images/photo-3.jpg';
import kalugaImg from '../images/photo-4.jpg';
import stPetersburgImg from '../images/photo-5.jpg';
import kaliningradImg from '../images/photo-6.jpg';

export const initialCards = [{
  'place-name': 'Карачаевск',
  'place-link': karachevskImg,
},
{
  'place-name': 'Гора Эльбрус',
  'place-link': elbrusImg,
},
{
  'place-name': 'Домбай',
  'place-link': dombaiImg,
},
{
  'place-name': 'Калуга',
  'place-link': kalugaImg,
},
{
  'place-name': 'Санкт-Петербург',
  'place-link': stPetersburgImg,
},
{
  'place-name': 'Калининград',
  'place-link': kaliningradImg,
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

export const addCardBtn = document.querySelector('.profile__add-btn');
export const editBtn = document.querySelector('.profile__edit-btn');

export const ESC_CODE = 'Escape';