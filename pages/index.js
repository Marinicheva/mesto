import {
  validationConfig,
  formValidation,
  initialCards,
  editBtn,
  addCardBtn,
  editForm,
  cardsContainer,
  addCardForm,
  userName,
  userDescription,
  inputPlaceName,
  inputPlaceLink,
  profileName,
  profileDescription,
  popupEdit,
  popupAddCard
} from '../utils/constants.js';

import Card from '../components/Card.js';
import Section from '../components/Section.js';
import Popup from '../components/Popup.js';
import PopupWithImage from '../components/PopupWithImage.js';
import FormValidator from '../components/FormValidator.js';

//Заполнение формы редактирования профиля
function handleFillEditPopup() {
  userName.value = profileName.textContent;
  userDescription.value = profileDescription.textContent;
}

//Сохранение новых данных профиля
function handleEditProfileSubmit(evt) {
  evt.preventDefault();

  profileName.textContent = userName.value;
  profileDescription.textContent = userDescription.value;

  closePopup(popupEdit);
}

//Создание экземпляра Card
function createNewCard(cardData) {
  const card = new Card(cardData, '.card-template', handleOpenViewModal);
  const newCard = card.generateCard();

  return newCard;
}

//Если я правильно понимаю этой функции быть не должно за рендер отвечает класс???
//Рендер полученного экземпляра Card
function renderCard(cardItem, parent) {
  parent.prepend(cardItem);
}

//Открытие полноразмерного просмотра фото
function handleCardClick({name, link}) {
  const popupFullSizeImg = new PopupWithImage('.popup_type_fullscreen-img');
  popupFullSizeImg.setEventListeners();

  popupFullSizeImg.openPopup({name, link});
}

//Создание карточки с данными от пользователя
function handleCreateUserCardSubmit(evt) {
  evt.preventDefault();

  const newCardData = {};
  newCardData.name = inputPlaceName.value;
  newCardData.link = inputPlaceLink.value;

  const card = createNewCard(newCardData);

  renderCard(card, cardsContainer);

  closePopup(popupAddCard);
}


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

//Обработчики событий
//Открытие модальных окон
//ГОТОВОЕ!!!!
editBtn.addEventListener('click', () => {
  handleFillEditPopup();
  formValidation[editForm.name].resetValidation();

  const popupEdit = new Popup('.popup_type_edit-form');
  popupEdit.setEventListeners();
  popupEdit.openPopup();
});

addCardBtn.addEventListener('click', () => {
  addCardForm.reset();
  formValidation[addCardForm.name].resetValidation();
  
  const addFormPopup = new Popup('.popup_type_add-new-card');
  addFormPopup.setEventListeners();
  addFormPopup.openPopup();
});

//Редактирование профиля
editForm.addEventListener('submit', handleEditProfileSubmit);

//Создание экзмепляров класса Card для исходных карточек 
//ГОТОВОЕ!!!!
const cardList = new Section({
  items: initialCards,
  renderer: (cardData) => {
    const card = new Card(cardData, '.card-template', handleCardClick);
    const newCard = card.generateCard();

    cardList.addItem(newCard);
  },
}, cardsContainer);

cardList.renderItems();

//Создание новой карточки с данными от пользователя
addCardForm.addEventListener('submit', handleCreateUserCardSubmit);