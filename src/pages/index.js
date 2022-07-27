import "./index.css";
import {
  formValidation,
  validationConfig,
  editBtn,
  addCardBtn,
  updateAvatarBtn,
  apiConfig
} from "../utils/constants.js";

import UserInfo from "../components/UserInfo.js";
import Section from "../components/Section.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupDeleteCard from "../components/PopupDeleteCard";
import Api from "../components/Api";


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

//Коллбэк клика на кнопку обновления аватара
function handleClickUpdateBtn() {
  formValidation[popupUpdateAvatar.popupForm.getAttribute("name")].resetValidation();
  popupUpdateAvatar.openPopup();
}

//Коллбэк клика на кнопку добавления новой карточки
function handleClickAddCardBtn() {
  formValidation[addFormPopup.popupForm.getAttribute("name")].resetValidation();
  addFormPopup.openPopup();
}

//Изменение лайка при клике
function addLike(cardID, renderer, likeContainer) {
  api.addLike(cardID)//ВАЖНО!!!! Везде добавить блок catch с выводом сообщения в консоль
  .then((data) => {return data.likes})
  .then((likes) => renderer(likes, likeContainer));
}

function removeLike(cardID, renderer, likeContainer) {
  api.removeLike(cardID)
  .then((data) => {return data.likes})
  .then((likes) => renderer(likes, likeContainer));
}

//Функция для создания новой карточки
function createCard(data) {
  const userID = userData.userInfo.userId;
  const card = new Card(data, ".card-template", handleCardClick, handleClickDeleteCard, addLike, removeLike, userID);
  const readyCard = card.generateCard();

  return readyCard;
}

//Коллбэк клика на кнопку удаления карточки
function handleClickDeleteCard(cardID, removeCard) {
  popupDeleteCard.openPopup(cardID, removeCard);
}

//Создание класса UserInfo
const userData = new UserInfo({
  name: ".profile__name",
  about: ".profile__about",
  avatar: ".profile__photo",
});

//Создание класса Section
const cardGallery = new Section({renderer: (cardData) => {
    const newCard = createCard(cardData);

    cardGallery.addItem(newCard);
  }
}, ".gallery__list");


//Создание класса API
const api = new Api (apiConfig);

//Создание исходных данных для загрузки от сервера
const initUserData = api.getUserData().then((res) => userData.initUserInfo(res));
const initCards = api.getCards();


Promise.all([initUserData, initCards]).then((res) => {
  userData.setUserInfo(res[0]);
  cardGallery.renderItems(res[1]);
});


//Экземпляры попапов
//Попап с формой редактирования профиля
const popupEdit = new PopupWithForm(".popup_type_edit-form", (data) => {
  api.updateUserData(data).then((res) => userData.setUserInfo(res));
  
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
const popupDeleteCard = new PopupDeleteCard(".popup_type_delete-card", (cardID, removeCard) => { 
  console.log("Сейчас удалим")
  api.removeCardData(cardID)
  .then((res) => removeCard());
});
popupDeleteCard.setEventListeners();

//Попап обновления аватара
const popupUpdateAvatar = new PopupWithForm(".popup_type_update-avatar", (avatar) => {
  api.updateUserAvatar(avatar).then((data) => {
    userData.updateUserAvatar(data);
    popupUpdateAvatar.closePopup();
  })
});
popupUpdateAvatar.setEventListeners();

updateAvatarBtn.addEventListener('click', handleClickUpdateBtn);