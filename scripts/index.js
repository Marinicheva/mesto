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


function openModal(modal) {
    modal.classList.add('modal_opened');
}

function closeModal(modal) {
    modal.classList.remove('modal_opened');
}

function handleFillEditModal() {
    userName.value = profileName.textContent;
    userDescription.value = profileDescription.textContent;
    openModal(modalEdit);
}

function hasInvalidInput(form) {
    const inputsList = Array.from(form.querySelectorAll('.modal__input'));
    return inputsList.some((item) =>  {
        return !item.validity.valid;
    }); 
}

function handleEditProfileSubmit(evt) {
    evt.preventDefault();
    if ( !hasInvalidInput(editForm) ) {
        
        profileName.textContent = userName.value;
        profileDescription.textContent = userDescription.value;

        closeModal(modalEdit);
    }
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

function handleCreateUserCardSubmit(evt) {
    evt.preventDefault();

    const newCard = {};
    newCard.name = inputPlaceName.value;
    newCard.link = inputPlaceLink.value;

    renderCard(newCard, cardsList);
    addCardForm.reset();

    closeModal(modalAddCard);
}

function renderCard(cardData, parent) {
    const newCard = createCard(cardData);
    parent.prepend(newCard);
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

function toggleButtonState(input, button) {
    if ( !input.validity.valid ) {
        button.classList.add('modal__btn_inactive');
    } else {
        button.classList.remove('modal__btn_inactive');
    }
}

/*Функции отображения ошибки при вводе*/
function showInputError(form, inputElement) {
    inputElement.classList.add('form__input_type_error');

    const errorMessage = form.querySelector(`.${inputElement.id}-input-error`);
    const button = form.querySelector('.modal__btn');

    errorMessage.textContent = inputElement.validationMessage;
    toggleButtonState(inputElement, button);
}

/*Функции скрытия ошибки при вводе*/
function hideInputError(form, inputElement) {
    inputElement.classList.remove('form__input_type_error');

    const errorMessage = form.querySelector(`.${inputElement.id}-input-error`);
    const button = form.querySelector('.modal__btn');

    errorMessage.textContent = '';
    toggleButtonState(inputElement, button);
}

/*Проверка состояния валидности инпута*/
function isValid(form, inputElement) {
    if (!inputElement.validity.valid) {
        showInputError(form, inputElement);
    } else {
        hideInputError(form, inputElement);
    }
}

/*функция установки обработчика событий на все поля формы*/
function setEventListener(form) {
    const inputsList = Array.from(form.querySelectorAll('.modal__input'));
    inputsList.forEach(input => {
        input.addEventListener('input', () => {
            isValid(form, input);
        });
    });
}

function anableValidation() {
    const formList = document.querySelectorAll('.modal__form');
    formList.forEach(form => setEventListener(form) );
}

function removeErrors(modal) {
    const inputsList = Array.from(modal.querySelectorAll('.modal__input'));
    const button = modal.querySelector('.modal__btn');

    inputsList.forEach(input => hideInputError(modal, input));
    button.classList.remove('modal__btn_inactive');
}
 
/*Динамическое создание карточек*/
 initialCards.forEach(item => renderCard(item, cardsList));


/*Обработка событий для открытия модальных окон*/ 
editBtn.addEventListener('click', handleFillEditModal);

addCardBtn.addEventListener('click', () => openModal(modalAddCard));


/*Закрытие модальных окон*/
closeBtnEditModal.addEventListener('click', () => {
    closeModal(modalEdit);
    removeErrors(modalEdit);
});

closeBtnAddCardModal.addEventListener('click', () => {
    closeModal(modalAddCard);
});

closeBtnFullScreenModal.addEventListener('click', () => {
    closeModal(modalFullScreen);
});


/*Редактирование профиля*/
editForm.addEventListener('submit',  handleEditProfileSubmit);


/*Создание новой карточки*/
addCardForm.addEventListener('submit', handleCreateUserCardSubmit);

/*Валидация форм*/
anableValidation();