const initialCards = [
    {
        name: 'Карачаевск',
        link: './images/photo-1.jpg',
    },
    {
        name: 'Гора Эльбрус',
        link: './images/photo-2.jpg',
    },
    {
        name: 'Домбай',
        link: './images/photo-3.jpg',
    },
    {
        name: 'Калуга',
        link: './images/photo-4.jpg',
    },
    {
        name: 'Санкт-Петербург',
        link: './images/photo-5.jpg',
    },
    {
        name: 'Калининград',
        link: './images/photo-6.jpg',
    },
];
const cardsList = document.querySelector('.gallery__list');

const editBtn = document.querySelector('.profile__edit-btn');
const modalEdit = document.querySelector('.modal_type_edit-form');
const editForm = modalEdit.querySelector('.modal__form_type-edit');
const userName = modalEdit.querySelector('.modal__input-name');
const userDescription = modalEdit.querySelector('.modal__input-description');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');

const addCardBtn = document.querySelector('.profile__add-btn');
const modalAddCard = document.querySelector('.modal_type_add-new-card');
const addCardForm = modalAddCard.querySelector('.modal__form_type-add-card');
const inputPlaceName = addCardForm.querySelector('.modal__input-place-name');
const inputPlaceLink = addCardForm.querySelector('.modal__input-place-link');

const closeBtn = document.querySelectorAll('.modal__close');

let currentUserName = profileName.textContent;
let currentUserDescription = profileDescription.textContent;



function openModal(popup) {
    userName.value = currentUserName;
    userDescription.value = currentUserDescription;
    popup.classList.add('modal_opened');
}

function closeModal(popup) {
    popup.classList.remove('modal_opened');
}

function editProfile(evt) {
    evt.preventDefault();
    profileName.textContent = userName.value;
    profileDescription.textContent = userDescription.value;

    currentUserName = userName.value;
    currentUserDescription = userDescription.value;
    closeModal(modalEdit);
}

function createCard(name, link) {
    const template = document.querySelector('.card-template').content;
    const cardTemplate = template.querySelector('.gallery__item').cloneNode(true);
    
    cardTemplate.querySelector('.gallery__img').src = link;
    cardTemplate.querySelector('.gallery__img').alt = `Пользовательское фото места ${name}`;
    cardTemplate.querySelector('.gallery__img-caption').textContent = name;

    cardsList.prepend(cardTemplate);
}

/*Динамическое создание карточек*/
initialCards.forEach(item => {
    const cardName = item.name;
    const cardLink = item.link;
    
    createCard(cardName, cardLink);
});

/*Обработка событий для открытия модальных окон*/ 
editBtn.addEventListener('click', () => openModal(modalEdit));
addCardBtn.addEventListener('click', () => openModal(modalAddCard));

/*Обработка событий для закрытия модальных окон*/
closeBtn.forEach(item => {
    const modalNeedBeClose = item.parentElement.parentElement;
    item.addEventListener('click', () => {
        closeModal(modalNeedBeClose);
    });
});

/*Редактирование профиля*/
editForm.addEventListener('submit',  editProfile);

/*Создание новой карточки*/
addCardForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const newPlace = inputPlaceName.value;
    const newLink = inputPlaceLink.value;

    createCard(newPlace, newLink);
    inputPlaceName.value = '';
    inputPlaceLink.value ='';

    closeModal(modalAddCard);
});

/*Лайк карточек*/
const likeBtns = document.querySelectorAll('.gallery__like-btn');
likeBtns.forEach(item => {
    item.addEventListener('click', () => {
        item.classList.toggle('gallery__like-btn_active');
    });
});