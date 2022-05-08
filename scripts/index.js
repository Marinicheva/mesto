const editBtn = document.querySelector('.profile__edit-btn');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');

const modal = document.querySelector('.modal');
const closeBtn = modal.querySelector('.modal__close');
const userName = modal.querySelector('.modal__input-name');
const userDescription = modal.querySelector('.modal__input-description');
const editForm = modal.querySelector('.modal__form');

let currentUserName = profileName.textContent;
let currentUserDescription = profileDescription.textContent;

function openModal() {
    userName.value = currentUserName;
    userDescription.value = currentUserDescription;
    modal.classList.add('modal_opened');
}

function closeModal() {
    modal.classList.remove('modal_opened');
}

function editProfile(evt) {
    evt.preventDefault();
    profileName.textContent = userName.value;
    profileDescription.textContent = userDescription.value;

    currentUserName = userName.value;
    currentUserDescription = userDescription.value;
    closeModal();
}

/*Обработка событий для открытия и закрытия модального окна*/
editBtn.addEventListener('click', openModal);

closeBtn.addEventListener('click', closeModal);

/*Обработка события отправки формы*/
editForm.addEventListener('submit',  editProfile);
