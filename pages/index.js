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
  profileName,
  profileDescription,
  popupEdit
} from '../utils/constants.js';

import Card from '../components/Card.js';
import Section from '../components/Section.js';
import Popup from '../components/Popup.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import FormValidator from '../components/FormValidator.js';

//Заполнение формы редактирования профиля
function handleFillEditPopup() {
  userName.value = profileName.textContent;
  userDescription.value = profileDescription.textContent;
}

//Сохранение новых данных профиля
//i!!!!!!!!!!!!!!!!!!!!!!!!!!
function handleEditProfileSubmit(evt) {
  evt.preventDefault();

  profileName.textContent = userName.value;
  profileDescription.textContent = userDescription.value;

  closePopup(popupEdit);
}


//Открытие полноразмерного просмотра фото
function handleCardClick({name, link}) {
  const popupFullSizeImg = new PopupWithImage('.popup_type_fullscreen-img');
  popupFullSizeImg.setEventListeners();

  popupFullSizeImg.openPopup({name, link});
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

//Попап редактирования данных пользователя
//Дополнить Сабмит
editBtn.addEventListener('click', () => {
  formValidation[editForm.name].resetValidation();

  const popupEdit = new Popup('.popup_type_edit-form');

  popupEdit.setEventListeners();
  popupEdit.openPopup();
});


//Попап добавления карточки пользователем (НАЧАЛО)
//ГОТОВОЕ!!!!
addCardBtn.addEventListener('click', () => {
  formValidation[addCardForm.name].resetValidation();
  
  //Экз класса popupWithForm
  const addFormPopup = new PopupWithForm('.popup_type_add-new-card', (data) => {
    //при сабмите создаем экз класса Section для рендера новой карточки
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
  addFormPopup.openPopup();
});

//Редактирование профиля
editForm.addEventListener('submit', handleEditProfileSubmit);

//Создание исходных карточек (НАЧАЛО)
//ГОТОВОЕ!!!!
//Рендер картинок в DOM - класс Section
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