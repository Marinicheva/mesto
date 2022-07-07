import {
  validationConfig,
  formValidation,
  initialCards,
  editBtn,
  addCardBtn,
  editForm,
  cardsContainer,
  addCardForm
} from '../utils/constants.js';

import Card from '../components/Card.js';
import Section from '../components/Section.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';

const userData = new UserInfo({
  name: '.profile__name',
  description: '.profile__description'
});

// Включение валидации
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

//Открытие полноразмерного просмотра фото
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

//Создание экземпляров попапов
//Редактирование профиля
const popupEdit = new PopupWithForm('.popup_type_edit-form', () => {
  
  const data = popupEdit._getInputValues();
  userData.setUserInfo(data);
});

popupEdit.setEventListeners();

//Добавление карточки пользователем
const addFormPopup = new PopupWithForm('.popup_type_add-new-card', () => {
  //при сабмите создаем экз класса Section для рендера новой карточки
  const data = addFormPopup._getInputValues();

  const userNewCard = new Section({
    items: [data],
    renderer: (cardData) => {
      //Экземпляр новой карточки
      const card = new Card(cardData, '.card-template', handleCardClick);
      const newCard = card.generateCard();

      cardList.addItem(newCard);
    },
  }, cardsContainer);

  userNewCard.renderItems();
});

addFormPopup.setEventListeners();


//Открытие попапа редактирования данных пользователя
editBtn.addEventListener('click', () => {
  formValidation[editForm.name].resetValidation();

  const userCurrentData = userData.getUserInfo();

  popupEdit.setInputsValues(userCurrentData);
  popupEdit.openPopup();
});


//Открытие попапа с формой добавления карточки
addCardBtn.addEventListener('click', () => {
  formValidation[addCardForm.name].resetValidation();
  addFormPopup.openPopup();
});

//Создание исходных карточек (НАЧАЛО)
const cardList = new Section({
  items: initialCards,
  renderer: (cardData) => {
    //Создание экземпляров карточек из данных массива
    const card = new Card(cardData, '.card-template', handleCardClick);
    const newCard = card.generateCard();

    cardList.addItem(newCard);
  },
}, cardsContainer);

cardList.renderItems();