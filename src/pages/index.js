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
import PopupWithConfirmation from "../components/PopupWithConfirmation.js";
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
  api.addLike(cardID)
  .then((data) => {return data.likes})
  .then((likes) => renderer(likes, likeContainer))
  .catch((err) => console.log(err));
}

function removeLike(cardID, renderer, likeContainer) {
  api.removeLike(cardID)
  .then((data) => {return data.likes})
  .then((likes) => renderer(likes, likeContainer))
  .catch((err) => console.log(err));
}

//Функция для создания новой карточки
function createCard(data) {
  const userID = userData.userInfo.userId;
  const card = new Card(data, ".card-template", handleCardClick, handleClickDeleteCard, addLike, removeLike, userID);
  const readyCard = card.generateCard();

  return readyCard;
}

//Коллбэк клика на кнопку удаления карточки
function handleClickDeleteCard(card, cardID) {
  popupWithConfirmation.openPopup(card, cardID);
}

//Включение валидации
enableValidation(validationConfig);

//Создание класса API
const api = new Api (apiConfig);

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

//Получение исходных данных для загрузки от сервера
const initUserData = api.getUserData().then((res) => userData.initUserInfo(res));
const initCards = api.getCards();

Promise.all([initUserData, initCards])
.then((res) => {
  userData.setUserInfo(res[0]);
  return res[1].reverse();
})
.then((data) => cardGallery.renderItems(data))
.catch((err) => console.log(err));


//Экземпляры попапов
//Попап с формой редактирования профиля
const popupEdit = new PopupWithForm(".popup_type_edit-form", (data) => {
  api.updateUserData(data)
  .then((res) => userData.setUserInfo(res))
  .then(() =>  popupEdit.closePopup())
  .catch((err) => console.log(err))
  .finally(() => popupEdit.renderLoading(false));
});

popupEdit.setEventListeners();
editBtn.addEventListener("click", handleClickEditBtn);

//Попап с формой добавления карточки пользователем
const addFormPopup = new PopupWithForm(".popup_type_add-new-card", (newCardData) => {
  api.addNewCard(newCardData)
  .then((res) => {
    const userNewCard = createCard(res);
    cardGallery.addItem(userNewCard);
  })
  .then(() => addFormPopup.closePopup())
  .finally(() => {
    addFormPopup.renderLoading(false);
  })
});

addFormPopup.setEventListeners();
addCardBtn.addEventListener("click", handleClickAddCardBtn);

//Попап полноразмерного просмотра фото
const popupFullSizeImg = new PopupWithImage(".popup_type_fullscreen-img");
popupFullSizeImg.setEventListeners();

//Попап подтверждения удаления
const popupWithConfirmation = new PopupWithConfirmation(".popup_type_delete-card", (removedCard, cardID) => { 
  api.removeCardData(cardID)
  .then(() => removedCard.remove())
  .then(() => popupWithConfirmation.closePopup())
  .catch((err) => console.log(err))
  .finally(() => popupWithConfirmation.renderLoading(false));
});
popupWithConfirmation.setEventListeners();

//Попап обновления аватара
const popupUpdateAvatar = new PopupWithForm(".popup_type_update-avatar", (avatar) => {
  api.updateUserAvatar(avatar)
  .then((data) => {
    userData.updateUserAvatar(data);
  })
  .then(() => popupUpdateAvatar.closePopup())
  .catch((err) => console.log(err))
  .finally(() => popupUpdateAvatar.renderLoading(false))
});
popupUpdateAvatar.setEventListeners();

updateAvatarBtn.addEventListener('click', handleClickUpdateBtn);