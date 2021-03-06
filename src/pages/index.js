import "./index.css";
import {
  initialCards,
  formValidation,
  validationConfig,
  editBtn,
  addCardBtn,
} from "../utils/constants.js";

import UserInfo from "../components/UserInfo.js";
import Section from "../components/Section.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";

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
  formValidation[popupEdit.popupForm.name].resetValidation();

  const userCurrentData = userData.getUserInfo();

  popupEdit.setInputsValues(userCurrentData);
  popupEdit.openPopup();
}

//Коллбэк клика на кнопку добавления новой карточки
function handleClickAddCardBtn() {
  formValidation[addFormPopup.popupForm.name].resetValidation();
  addFormPopup.openPopup();
}

//Функция для создания новой карточки
function createCard(data) {
  const card = new Card(data, ".card-template", handleCardClick);
  const readyCard = card.generateCard();

  return readyCard;
}

const userData = new UserInfo({
  name: ".profile__name",
  description: ".profile__description",
});

//Создание исходных карточек
const cardGallery = new Section(
  {
    items: initialCards,
    renderer: (cardData) => {
      const newCard = createCard(cardData);

      cardGallery.addItem(newCard);
    },
  },
  ".gallery__list"
);

cardGallery.renderItems();

//Включение валидации
enableValidation(validationConfig);

//Экземпляры попапов
//Попап с формой редактирования профиля
const popupEdit = new PopupWithForm(".popup_type_edit-form", (data) => {
  userData.setUserInfo(data);
  popupEdit.closePopup();
});

popupEdit.setEventListeners();
editBtn.addEventListener("click", handleClickEditBtn);

//Попап с формой добавления карточки пользователем
const addFormPopup = new PopupWithForm(".popup_type_add-new-card", (data) => {
  const userNewCard = createCard(data);
  cardGallery.addItem(userNewCard);

  addFormPopup.closePopup();
});

addFormPopup.setEventListeners();
addCardBtn.addEventListener("click", handleClickAddCardBtn);

//Попап полноразмерного просмотра фото
const popupFullSizeImg = new PopupWithImage(".popup_type_fullscreen-img");

popupFullSizeImg.setEventListeners();
