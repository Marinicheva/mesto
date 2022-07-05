import {
  validationConfig,
  formValidation,
  initialCards,
  editBtn,
  addCardBtn,
  closeButtons,
  editForm,
  cardsList,
  addCardForm,
  userName,
  userDescription,
  profileName,
  profileDescription,
  modalEdit,
  modalAddCard,
  ESC_CODE
} from '../utils/constants.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';

//Открытие и закрытие модальных окон
function openModal(modal) {
  modal.classList.add('modal_opened');

  document.addEventListener('keydown', closeModalByEsc);
  document.addEventListener('mousedown', closeModalByOverlayClick);
}

function closeModal(modal) {
  modal.classList.remove('modal_opened');

  document.removeEventListener('keydown', closeModalByEsc);
  document.removeEventListener('mousedown', closeModalByOverlayClick);
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

//Заполнение формы редактирования профиля
function handleFillEditModal() {
  userName.value = profileName.textContent;
  userDescription.value = profileDescription.textContent;
}

//Сохранение новых данных профиля
function handleEditProfileSubmit(evt) {
  evt.preventDefault();

  profileName.textContent = userName.value;
  profileDescription.textContent = userDescription.value;

  closeModal(modalEdit);
}

//Создание экземпляра Card
function createNewCard(cardData) {
  const card = new Card(cardData, '.card-template', handleOpenViewModal);
  const newCard = card.generateCard();

  return newCard;
}

//Рендер полученного экземпляра Card
function renderCard(cardItem, parent) {
  parent.prepend(cardItem);
}

//Открытие полноразмерного просмотра
function handleOpenViewModal({
  name,
  link
}) {
  fullScreenImg.src = link;
  fullScreenImg.alt = `Пользовательское фото места ${name}`;
  fullScreenCaption.textContent = name;

  openModal(modalFullScreen);
}

//Создание карточки с данными от пользователя
function handleCreateUserCardSubmit(evt) {
  evt.preventDefault();

  const newCardData = {};
  newCardData.name = inputPlaceName.value;
  newCardData.link = inputPlaceLink.value;

  const card = createNewCard(newCardData);

  renderCard(card, cardsList);

  closeModal(modalAddCard);
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
editBtn.addEventListener('click', () => {
  handleFillEditModal();
  formValidation[editForm.name].resetValidation();
  openModal(modalEdit);
});

addCardBtn.addEventListener('click', () => {
  addCardForm.reset();
  formValidation[addCardForm.name].resetValidation();
  openModal(modalAddCard);
});

//Закрытие модальных окон
closeButtons.forEach((button) => {
  const modal = button.closest('.modal');
  button.addEventListener('click', () => closeModal(modal));
});

//Редактирование профиля
editForm.addEventListener('submit', handleEditProfileSubmit);

//Создание экзмепляров класса Card для исходных карточек
initialCards.forEach(item => {
  const card = createNewCard(item);
  renderCard(card, cardsList);
});

//Создание новой карточки с данными от пользователя
addCardForm.addEventListener('submit', handleCreateUserCardSubmit);