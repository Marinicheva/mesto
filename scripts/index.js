import initialCards from './cards.js';
import Card from './card.js';

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

function closeModalByEsc(evt) {
    if (evt.key === ESC_CODE) {
        const openedModal = document.querySelector('.modal_opened');
        closeModal(openedModal);
        removeErrors(openedModal, validateConfig);
      }
}

function closeModalByOverlayClick(evt) {
    const openedModal = evt.target;
    if (openedModal.classList.contains('modal_opened')) {
        closeModal(openedModal);
    }
}

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


function handleFillEditModal() {
    userName.value = profileName.textContent;
    userDescription.value = profileDescription.textContent;
    removeErrors(modalEdit, validateConfig);
    openModal(modalEdit);
}

function handleEditProfileSubmit(evt) {
    evt.preventDefault();
    
    profileName.textContent = userName.value;
    profileDescription.textContent = userDescription.value;

    closeModal(modalEdit);
}


function renderCard(cardItem, parent) {
    parent.prepend(cardItem);
}

initialCards.forEach(item => {
    const card = new Card(item, '.card-template');
    const newCard = card.generateCard();

    newCard.addEventListener('click', (evt) => {
        if ( evt.target.classList.contains('gallery__img') ) {
            openModal(modalFullScreen);
        }
    });
    
    renderCard(newCard, cardsList);
  });


function disableButton(button) {
    button.classList.add('modal__btn_inactive'); 
    button.disabled = true;
}

function fillFullScreenModal({name, link}) {
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

    /*Этот код !!!повторяется!!! в обходе массива данных исходный карточек*/
    const card = new Card(newCardData, '.card-template');
    const newCard = card.generateCard();

    const buttonSubmit = modalAddCard.querySelector('.modal__btn');

    renderCard(newCard, cardsList);

    disableButton(buttonSubmit);

    addCardForm.reset();

    closeModal(modalAddCard);
}
 
/*Обработка событий для открытия модальных окон*/ 
editBtn.addEventListener('click', handleFillEditModal);

addCardBtn.addEventListener('click', () => {
    const buttonSubmit = modalAddCard.querySelector('.modal__btn');
    disableButton(buttonSubmit);
    
    openModal(modalAddCard);
});


/*Закрытие модальных окон*/
closeBtnEditModal.addEventListener('click', () => {
    closeModal(modalEdit);
});

closeBtnAddCardModal.addEventListener('click', () => {
    addCardForm.reset();
    removeErrors(modalAddCard, validateConfig);
    closeModal(modalAddCard);
});

closeBtnFullScreenModal.addEventListener('click', () => {
    closeModal(modalFullScreen);
});

/*Редактирование профиля*/
editForm.addEventListener('submit',  handleEditProfileSubmit);

/*Создание новой карточки*/
addCardForm.addEventListener('submit', handleCreateUserCardSubmit);

export {fillFullScreenModal};