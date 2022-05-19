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

const addCardBtn = document.querySelector('.profile__add-btn');
const modalAddCard = document.querySelector('.modal_type_add-new-card');
const addCardForm = modalAddCard.querySelector('.modal__form_type_add-card');
const inputPlaceName = addCardForm.querySelector('.modal__input-place-name');
const inputPlaceLink = addCardForm.querySelector('.modal__input-place-link');

const editBtn = document.querySelector('.profile__edit-btn');
const modalEdit = document.querySelector('.modal_type_edit-form');
const editForm = modalEdit.querySelector('.modal__form_type_edit');
const userName = modalEdit.querySelector('.modal__input-name');
const userDescription = modalEdit.querySelector('.modal__input-description');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
let currentUserName = profileName.textContent;
let currentUserDescription = profileDescription.textContent;

const closeBtn = document.querySelectorAll('.modal__close');

// const imgs = document.querySelectorAll('.gallery__img');
const popupFullScreen = document.querySelector('.modal_type_fullscreen-img');

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
    const cardTemplate = document.querySelector('.card-template').content;
    const cardItem = cardTemplate.querySelector('.gallery__item').cloneNode(true);
    
    cardItem.querySelector('.gallery__img').src = link;
    cardItem.querySelector('.gallery__img').alt = `Пользовательское фото места ${name}`;
    cardItem.querySelector('.gallery__img-caption').textContent = name;

    cardsList.prepend(cardItem);
}

function showFullScreen(element, name, link) {
    const fullScreenImgTemplate = document.querySelector('.fullscreen-template').content;
    const fullScreenItem = fullScreenImgTemplate.querySelector('.modal__fullscreen-container').cloneNode(true);
    
    fullScreenItem.querySelector('.modal__img-fullscreen').src = link;
    fullScreenItem.querySelector('.modal__img-fullscreen').alt = `Пользовательское фото места ${name} в полноэкранном просмотре`;
    fullScreenItem.querySelector('.modal__fullscreen-caption').textContent = name;

    popupFullScreen.append(fullScreenItem);
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

/*Лайк карточек. Не работает для новых карточек*/
const likeBtns = document.querySelectorAll('.gallery__like-btn');
likeBtns.forEach(item => {
    item.addEventListener('click', () => {
        item.classList.toggle('gallery__like-btn_active');
    });
});

/*Удаление карточек. Не работает для новых карточек*/
const deleteBtns = document.querySelectorAll('.gallery__delete-btn');
deleteBtns.forEach(item => {
    item.addEventListener('click', ()=> {
        item.parentElement.remove();
    });
});

/*Просмотр фотографий*/
const imgs = document.querySelectorAll('.gallery__img');
imgs.forEach(item => {
    item.addEventListener('click', () => {
        console.log(item);
        const imgLink = item.src;
        console.log(item.src);
        showFullScreen(item, 'smth', imgLink);
        openModal(popupFullScreen);
    });
});