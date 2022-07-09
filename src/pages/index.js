import './index.css';
import {
  initialCards,
  cardsContainer,
  formValidation,
  validationConfig,
  editBtn,
  addCardBtn,
} from '../utils/constants.js';

import UserInfo from '../components/UserInfo.js';
import Section from '../components/Section.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';


const userData = new UserInfo({
  name: '.profile__name',
  description: '.profile__description'
});

//Функция для открытия полноразмерного просмотра фото
function handleCardClick({
  name,
  link
}) {
  const popupFullSizeImg = new PopupWithImage('.popup_type_fullscreen-img');
  popupFullSizeImg.setEventListeners();

  popupFullSizeImg.openPopup({
    name,
    link
  });
}

//Создание исходных карточек (НАЧАЛО)
const cardList = new Section({
  items: initialCards,
  renderer: (cardData) => {
    const card = new Card(cardData, '.card-template', handleCardClick);
    const newCard = card.generateCard();

    cardList.addItem(newCard);
  },
}, cardsContainer);

cardList.renderItems();


//Функция включения валидации
function enableValidation(config) {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((form) => {

    const validatorItem = new FormValidator(config, form);

    const formName = form.getAttribute('name');
    formValidation[formName] = validatorItem;

    validatorItem.enableValidation();
  });
}

enableValidation(validationConfig);


//Создание экземпляров попапов
//Попап с фформой редактирования профиля
const popupEdit = new PopupWithForm('.popup_type_edit-form', (data) => {
  
  // const data = popupEdit._getInputValues();
  userData.setUserInfo(data);
  popupEdit.closePopup();
});

//Установка слушателей
popupEdit.setEventListeners();

//Открытие попапа редактирования данных пользователя
editBtn.addEventListener('click', () => {
  formValidation[popupEdit.popupForm.name].resetValidation();

  const userCurrentData = userData.getUserInfo();

  popupEdit.setInputsValues(userCurrentData);
  popupEdit.openPopup();
});


//Попап с формой добавления карточки пользователем
const addFormPopup = new PopupWithForm('.popup_type_add-new-card', (data) => {
  // const data = addFormPopup._getInputValues();

  const userNewCard = new Section({
    items: [data],
    renderer: (cardData) => {
      const card = new Card(cardData, '.card-template', handleCardClick);
      const newCard = card.generateCard();

      cardList.addItem(newCard);
    },
  }, cardsContainer);

  userNewCard.renderItems();
  addFormPopup.closePopup();
});

//Установка слушателей
addFormPopup.setEventListeners();

//Открытие попапа с формой добавления карточки
addCardBtn.addEventListener('click', () => {
  formValidation[addFormPopup.popupForm.name].resetValidation();
  addFormPopup.openPopup();
});