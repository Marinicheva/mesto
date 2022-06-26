import initialCards from './initialCards.js';
import Card from './card.js';
import {
  FormValidator,
  validationConfig
} from './formValidator.js';

const ESC_CODE = 'Escape';
const cardsList = document.querySelector('.gallery__list');

const addCardBtn = document.querySelector('.profile__add-btn');
const modalAddCard = document.querySelector('.modal_type_add-new-card');
const addCardForm = modalAddCard.querySelector('.modal__form_type_add-card');
const inputPlaceName = addCardForm.querySelector('.modal__input-place-name');
const inputPlaceLink = addCardForm.querySelector('.modal__input-place-link');
const closeBtnAddCardModal = modalAddCard.querySelector('.modal__close');

const editBtn = document.querySelector('.profile__edit-btn');
const modalEdit = document.querySelector('.modal_type_edit-form');
const editForm = modalEdit.querySelector('.modal__form_type_edit');
const userName = modalEdit.querySelector('.modal__input-name');
const userDescription = modalEdit.querySelector('.modal__input-description');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
const closeBtnEditModal = modalEdit.querySelector('.modal__close');

const modalFullScreen = document.querySelector('.modal_type_fullscreen-img');
const closeBtnFullScreenModal = modalFullScreen.querySelector('.modal__close');
const fullScreenImg = modalFullScreen.querySelector('.modal__img-fullscreen');
const fullScreenCaption = modalFullScreen.querySelector('.modal__fullscreen-caption');

const formsNeedValidation = Array.from(document.querySelectorAll('.modal_need-validation'));

/*Открытие и закрытие модальных окон*/
function openModal(modal) {
  modal.classList.add('modal_opened');

  document.addEventListener('keydown', closeModalByEsc);
  document.addEventListener('mousedown', closeModalByOverlayClick);
}

function closeModal(modal) {
  modal.classList.remove('modal_opened');

  document.removeEventListener('keydown', closeModalByEsc);
  document.removeEventListener('click', closeModalByOverlayClick);
}

function closeModalByEsc(evt) {
  if (evt.key === ESC_CODE) {
    const openedModal = document.querySelector('.modal_opened');
    closeModal(openedModal);
  }
}

function closeModalByOverlayClick(evt) {
  const openedModal = evt.target;
  if (openedModal.classList.contains('modal_opened')) {
    closeModal(openedModal);
  }
}

/*Очистка формы от ошибок*/
function cleanForm(modal) {
  const form = modal.querySelector(validationConfig.formSelector);

  removeErrors(form);
  setButtonSubmitState(form);
}

/*Удаление элементов ошибки*/
function removeErrors(form) {
  const errors = Array.from(form.querySelectorAll(`.${validationConfig.inputErrorClass}`));

  errors.forEach(item => {
    item.classList.remove(validationConfig.inputErrorClass);
    item.nextElementSibling.classList.remove(validationConfig.errorClass);
  });
}

/*Установка состояния кнопки сабмита*/
function setButtonSubmitState(form) {
  const buttonSubmit = form.querySelector(validationConfig.submitButtonSelector);

  if (form.checkValidity()) {
    buttonSubmit.classList.remove('modal__btn_inactive');
    buttonSubmit.disabled = false;
  } else {
    buttonSubmit.classList.add('modal__btn_inactive');
    buttonSubmit.disabled = true;
  }
}

/*Заполнение формы редактирования профиля*/
function handleFillEditModal() {
  userName.value = profileName.textContent;
  userDescription.value = profileDescription.textContent;
}

/*Сохранение новых данных профиля*/
function handleEditProfileSubmit(evt) {
  evt.preventDefault();

  profileName.textContent = userName.value;
  profileDescription.textContent = userDescription.value;

  closeModal(modalEdit);
}

/*Создание экземпляра Card*/
function createNewCard(cardData) {
  const card = new Card(cardData, '.card-template', handleOpenViewModal);
  const newCard = card.generateCard();

  return newCard;
}

/*Рендер полученного экземпляра Card*/
function renderCard(cardItem, parent) {
  parent.prepend(cardItem);
}

/*Открытие полноразмерного просмотра*/
function handleOpenViewModal({
  name,
  link
}) {
  fullScreenImg.src = link;
  fullScreenImg.alt = `Пользовательское фото места ${name}`;
  fullScreenCaption.textContent = name;

  openModal(modalFullScreen);
}

/*Создание карточки с данными от пользователя*/
function handleCreateUserCardSubmit(evt) {
  evt.preventDefault();

  const newCardData = {};
  newCardData.name = inputPlaceName.value;
  newCardData.link = inputPlaceLink.value;

  const Card = createNewCard(newCardData);
  renderCard(Card, cardsList);

  closeModal(modalAddCard);
}

/*Обработчики событий*/
/*Открытие модальных окон*/
editBtn.addEventListener('click', () => {
  handleFillEditModal();
  cleanForm(modalEdit);
  openModal(modalEdit);
});

addCardBtn.addEventListener('click', () => {
  cleanForm(modalAddCard);
  addCardForm.reset();
  openModal(modalAddCard);
});

/*Закрытие модальных окон*/
closeBtnEditModal.addEventListener('click', () => {
  closeModal(modalEdit);
});

closeBtnAddCardModal.addEventListener('click', () => {
  closeModal(modalAddCard);
});

closeBtnFullScreenModal.addEventListener('click', () => {
  closeModal(modalFullScreen);
});

/*Редактирование профиля*/
editForm.addEventListener('submit', handleEditProfileSubmit);

/*Создание экзмепляров класса Card для исходных карточек*/
initialCards.forEach(item => {
  const card = createNewCard(item);
  renderCard(card, cardsList);
});

/*Создание новой карточки с данными от пользователя*/
addCardForm.addEventListener('submit', handleCreateUserCardSubmit);

/*Запуск валидации форм*/
formsNeedValidation.forEach(form => {
  const formValidation = new FormValidator(validationConfig, form);
  formValidation.enableValidation();
});