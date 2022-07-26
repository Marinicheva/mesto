import "./index.css";
import {
  formValidation,
  validationConfig,
  editBtn,
  addCardBtn,
  apiConfig
} from "../utils/constants.js";

import UserInfo from "../components/UserInfo.js";
import Section from "../components/Section.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import Api from "../components/Api";
import Popup from "../components/Popup";

//Функция включения валидации
function enableValidation(config) {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((form) => {
    const validatorItem = new FormValidator(config, form);

    const formName = form.getAttribute("name");
    formValidation[formName] = validatorItem;

    validatorItem.enableValidation();
  });
}

//Включение валидации
enableValidation(validationConfig);

//Функция открытия полноразмерного просмотра фото
function handleCardClick({ name, link }) {
  popupFullSizeImg.openPopup({
    name,
    link,
  });
}

//Коллбэк клика на кнопку редатирования профиля
function handleClickEditBtn() {
  formValidation[popupEdit.popupForm.getAttribute("name")].resetValidation();

  const userCurrentData = userData.getUserInfo();

  popupEdit.setInputsValues(userCurrentData);
  popupEdit.openPopup();
}

//Коллбэк клика на кнопку добавления новой карточки
function handleClickAddCardBtn() {
  formValidation[addFormPopup.popupForm.getAttribute("name")].resetValidation();
  addFormPopup.openPopup();
}

//Функция для создания новой карточки
function createCard(data) {
  const card = new Card(data, ".card-template", handleCardClick, handleClickDeleteCard);
  const readyCard = card.generateCard();

  return readyCard;
}

//Удаление карточки пользователем
function handleClickDeleteCard() {
  popupDeleteCard.openPopup();
}

const userData = new UserInfo({
  name: ".profile__name",
  about: ".profile__about",
});

const cardGallery = new Section({renderer: (cardData) => {
    const newCard = createCard(cardData);

    cardGallery.addItem(newCard);
  }
}, ".gallery__list");

//API part
const api = new Api (apiConfig);

//Создание исходных карточек от сервера
api.getCards().then((cards) => {
  cardGallery.renderItems(cards);
});

//Загрузка данных пользователя с сервера
api.getUserData().then((data)=> {
  userData.setUserInfo(data);
});

//Экземпляры попапов
//Попап с формой редактирования профиля
const popupEdit = new PopupWithForm(".popup_type_edit-form", (data) => {
  api.editUserData(data).then((res) => userData.setUserInfo(res));
  
  popupEdit.closePopup();
});

popupEdit.setEventListeners();
editBtn.addEventListener("click", handleClickEditBtn);

//Попап с формой добавления карточки пользователем
const addFormPopup = new PopupWithForm(".popup_type_add-new-card", (newCardData) => {
  api.addNewCard(newCardData).then((res) => {
    const userNewCard = createCard(res);
    cardGallery.addItem(userNewCard);

    addFormPopup.closePopup();
  })
});

addFormPopup.setEventListeners();
addCardBtn.addEventListener("click", handleClickAddCardBtn);

//Попап полноразмерного просмотра фото
const popupFullSizeImg = new PopupWithImage(".popup_type_fullscreen-img");

popupFullSizeImg.setEventListeners();

//Попап подтверждения удаления
const popupDeleteCard = new Popup(".popup_type_delete-card");

popupDeleteCard.setEventListeners();
