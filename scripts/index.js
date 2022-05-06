document.addEventListener('DOMContentLoaded', () => {
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

    function modalClose() {
        modal.classList.remove('modal_opened');
    }

    function editProfile() {
        profileName.insertAdjacentText('afterbegin', userName.value);
        profileDescription.insertAdjacentText('afterbegin', userDescription.value);

        currentUserName = userName.value;
        currentUserDescription = userDescription.value;
    }

    function checkChanges() {
        if (userName.value === currentUserName && userDescription.value === currentUserDescription) {
            modalClose();
        } else {
            profileName.textContent = '';
            profileDescription.textContent = '';
            editProfile();
            modalClose();
        }
    }

    /*Обработка событий для открытия и закрытия модального окна*/
    editBtn.addEventListener('click', event => {
        event.preventDefault();
        openModal();
    });

    closeBtn.addEventListener('click', event => {
        event.preventDefault();
        modalClose();
    });

    document.addEventListener('keydown', (event) => {
       if (modal.classList.contains('modal_opened') && event.code === 'Escape') {
        modalClose();
       }
    });

    /*Обработка события отправки формы*/
    editForm.addEventListener('submit',  event => {
        event.preventDefault();
        checkChanges();
    });
});