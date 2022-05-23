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



function handleOpenModal(popup) {
    popup.classList.add('modal_opened');
}

function handleCloseModal(popup) {
    popup.classList.remove('modal_opened');
}

function handleFillEditModal() {
    userName.value = profileName.textContent;
    userDescription.value = profileDescription.textContent;
    handleOpenModal(modalEdit);
}

function handleEditProfileSubmit(evt) {
    evt.preventDefault();
    profileName.textContent = userName.value;
    profileDescription.textContent = userDescription.value;

    handleCloseModal(modalEdit);
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
        handleshowFullScreen(cardImg, cardCaption);
    });

    btnLikeCard.addEventListener('click', () => {
        handleLikeCard(btnLikeCard);
    });

    btnDeleteCard.addEventListener('click', () => {
        handleDeleteCard(btnLikeCard);
    });

    return cardItem;
}

function handleCreateUserCardSubmit(evt) {
    evt.preventDefault();

    const newCard = {};
    newCard.name = inputPlaceName.value;
    newCard.link = inputPlaceLink.value;

    renderCard(newCard);
    addCardForm.reset();

    handleCloseModal(modalAddCard);
}

function renderCard(cardData) {
    const newCard = createCard(cardData);
    cardsList.prepend(newCard);
}

function handleshowFullScreen(img, caption) {
    const fullScreenImg = modalFullScreen.querySelector('.modal__img-fullscreen');
    const fullScreenCaption = modalFullScreen.querySelector('.modal__fullscreen-caption');

    fullScreenImg.src = img.src;
    fullScreenImg.alt = img.alt;
    fullScreenCaption.textContent = caption.textContent;
    
    handleOpenModal(modalFullScreen);
}

function handleLikeCard(element) {
    element.classList.toggle('gallery__like-btn_active');
}

function handleDeleteCard(element) {
    element.closest('.gallery__item').remove();
}

/*Динамическое создание карточек*/
 initialCards.forEach(item => renderCard(item));


/*Обработка событий для открытия модальных окон*/ 
editBtn.addEventListener('click', handleFillEditModal);

addCardBtn.addEventListener('click', () => handleOpenModal(modalAddCard));


/*Закрытие модальных окон*/
closeBtnEditModal.addEventListener('click', () => {
    handleCloseModal(modalEdit);
});

closeBtnAddCardModal.addEventListener('click', () => {
    handleCloseModal(modalAddCard);
});

modalFullScreen.addEventListener('click', () => {
    handleCloseModal(modalFullScreen);
});


/*Редактирование профиля*/
editForm.addEventListener('submit',  handleEditProfileSubmit);


/*Создание новой карточки*/
addCardForm.addEventListener('submit', handleCreateUserCardSubmit);