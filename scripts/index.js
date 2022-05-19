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

const closeBtns = document.querySelectorAll('.modal__close');

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

function showFullScreen(name, link) {
    const fullScreenItem = document.createElement('div');
    fullScreenItem.classList.add('modal__fullscreen-container');
    fullScreenItem.innerHTML = `<img src="${link}" alt="Пользовательское фото места ${name} в полноэкранном просмотре" class="modal__img-fullscreen">
    <h2 class="modal__fullscreen-caption">${name}</h2>
    <button class="modal__close" type="button"></button>`;

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
closeBtns.forEach(item => {
    const modalNeedBeClose = item.parentElement.parentElement;
    item.addEventListener('click', () => {
        console.log('was click');
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

/*Лайк И удление карточек*/
cardsList.addEventListener('click', (evt) => {
    const target = evt.target;

    if ( target.classList.contains('gallery__like-btn') ) {
        target.classList.toggle('gallery__like-btn_active');
    } else if ( target.classList.contains('gallery__delete-btn') ) {
        target.parentElement.remove();
    }
});

/*Просмотр фотографий*/
const imgs = document.querySelectorAll('.gallery__img');
imgs.forEach(item => {
    item.addEventListener('click', () => {
        const imgNameContainer = item.parentElement.querySelector('.gallery__img-caption');
        const imgName = imgNameContainer.textContent;
        const imgLink = item.src;

        showFullScreen(imgName, imgLink);
        openModal(popupFullScreen);
    });
});

/*Закрытие полэкранного просмотра*/
popupFullScreen.addEventListener('click', (evt) => {
    if ( evt.target.classList.contains('modal__close') ) {
        closeModal(popupFullScreen);
        const fullScreenImg = popupFullScreen.querySelector('.modal__fullscreen-container');
        fullScreenImg.remove();
    }
});