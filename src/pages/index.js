import "./index.css";
import {
  formValidation,
  validationConfig,
  addCardBtn,
  editBtn,
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
import Api from "../components/Api.js";


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
  const userCurrentData = userData.getUserInfo();
  popupEdit.setInputsValues(userCurrentData);

  formValidation[popupEdit.popupForm.getAttribute("name")].resetValidation();
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

function renderLoading(isLoading, message = "Подождите...") {
  const btnName = this.getAttribute("data-name");

  if (isLoading) {
    this.textContent = message;
    this.classList.add("popup__btn_inactive");
    this.disabled = true;
  } else {
    this.textContent = btnName;
    this.disabled = false;
    this.classList.remove("popup__btn_inactive");
  }
}

//Изменение лайка при клике
function handleClickLikeBtn(cardID, isLiked, getLikes) {
  if (isLiked) {
    api.removeLike(cardID)
    .then((data) => data.likes)
    .then((likes) => getLikes(likes))
    .catch((err) => console.log(err));
  } else {
    api.addLike(cardID)
    .then((data) => data.likes)
    .then((likes) => getLikes(likes))
    .catch((err) => console.log(err));
  }
}

//Коллбэк клика на кнопку удаления карточки
function handleClickDeleteCard(card, removeCard) {
  popupWithConfirmation.openPopup();

  popupWithConfirmation.setConfirmedAction(() => {
    api.removeCardData(card._id)
    .then(() => removeCard())
    .then(() => popupWithConfirmation.renderLoading(false))
    .then(() => popupWithConfirmation.closePopup())
    .catch((err) => console.log(err))
  });
}

//Функция для создания новой карточки
function createCard(data) {
  const userID = userData.userId;
  const card = new Card(data, ".card-template", handleCardClick, handleClickDeleteCard, handleClickLikeBtn, userID);
  const readyCard = card.generateCard();

  return readyCard;
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
const initUserData = api.getUserData();
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
}, renderLoading);

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
  .finally(() => addFormPopup.renderLoading(false))
}, renderLoading);

addFormPopup.setEventListeners();
addCardBtn.addEventListener("click", handleClickAddCardBtn);

//Попап полноразмерного просмотра фото
const popupFullSizeImg = new PopupWithImage(".popup_type_fullscreen-img");
popupFullSizeImg.setEventListeners();

//Попап подтверждения удаления
const popupWithConfirmation = new PopupWithConfirmation(".popup_type_delete-card", renderLoading);
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
}, renderLoading);
popupUpdateAvatar.setEventListeners();

updateAvatarBtn.addEventListener('click', handleClickUpdateBtn);