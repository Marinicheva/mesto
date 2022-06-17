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
    openModal(modalEdit);
}

function handleEditProfileSubmit(evt) {
    evt.preventDefault();
    
    profileName.textContent = userName.value;
    profileDescription.textContent = userDescription.value;

    closeModal(modalEdit);
}


function createCard(cardData) {
    const cardTemplate = document.querySelector('.card-template').content;
    const cardItem = cardTemplate.querySelector('.gallery__item').cloneNode(true);
    const cardImg = cardItem.querySelector('.gallery__img');
    const cardCaption = cardItem.querySelector('.gallery__img-caption');
    const btnLikeCard = cardItem.querySelector('.gallery__like-btn');
    const btnDeleteCard = cardItem.querySelector('.gallery__delete-btn');
    
    cardImg.src = cardData.link;
    cardImg.alt = `Пользовательское фото места ${cardData.name}`;
    cardCaption.textContent = cardData.name;

    cardImg.addEventListener('click', () => {
        handleshowFullScreen(cardData);
    });

    btnLikeCard.addEventListener('click', handleLikeCard);

    btnDeleteCard.addEventListener('click', handleDeleteCard);

    return cardItem;
}

function renderCard(cardData, parent) {
    const newCard = createCard(cardData);
    parent.prepend(newCard);
}

function disableButton(button) {
    button.classList.add('modal__btn_inactive'); 
    button.disabled = true;
}

function handleCreateUserCardSubmit(evt) {
    evt.preventDefault();
    const newCard = {};
    newCard.name = inputPlaceName.value;
    newCard.link = inputPlaceLink.value;

    const buttonSubmit = modalAddCard.querySelector('.modal__btn');

    renderCard(newCard, cardsList);

    disableButton(buttonSubmit);
    addCardForm.reset();

    closeModal(modalAddCard);
}

function handleshowFullScreen(cardData) {
    fullScreenImg.src = cardData.link;
    fullScreenImg.alt = `Пользовательское фото места ${cardData.name}`;
    fullScreenCaption.textContent = cardData.name;

    openModal(modalFullScreen);
}

function handleLikeCard(evt) {
    evt.target.classList.toggle('gallery__like-btn_active');
}

function handleDeleteCard(evt) {
    evt.target.closest('.gallery__item').remove();
}
 
/*Динамическое создание карточек*/
 initialCards.forEach(item => renderCard(item, cardsList));


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
    removeErrors(modalEdit, validateConfig);
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