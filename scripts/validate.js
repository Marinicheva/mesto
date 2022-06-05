const validateConfig = {
    formSelector: '.modal__form',
    inputSelector: '.modal__input',
    submitButtonSelector: '.modal__btn',
    inactiveButtonClass: 'modal__btn_inactive',
    inputErrorClass: 'form__input_type_error',
    errorClass: 'modal__input-error_visible'
};

function toggleButtonState(input, button, config) {
    if ( !input.validity.valid ) {
        button.classList.add(config.inactiveButtonClass);
        button.disabled = true;
    } else {
        button.classList.remove(config.inactiveButtonClass);
        button.disabled = false;
    }
}

function showInputError(form, inputElement, config) {
    inputElement.classList.add(config.inputErrorClass);

    const errorMessage = form.querySelector(`.${inputElement.id}-input-error`);
    const button = form.querySelector(config.submitButtonSelector);

    errorMessage.classList.add(config.errorClass);
    errorMessage.textContent = inputElement.validationMessage;
    toggleButtonState(inputElement, button, config);
}

function hideInputError(form, inputElement, config) {
    inputElement.classList.remove(config.inputErrorClass);

    const errorMessage = form.querySelector(`.${inputElement.id}-input-error`);
    const button = form.querySelector(config.submitButtonSelector);

    errorMessage.classList.remove(config.errorClass);
    errorMessage.textContent = '';
    toggleButtonState(inputElement, button, config);
}

function isValid(form, inputElement, config) {
    if (!inputElement.validity.valid) {
        showInputError(form, inputElement, config);
    } else {
        hideInputError(form, inputElement, config);
    }
}

function setEventListener(form, config) {
    const inputsList = Array.from(form.querySelectorAll(config.inputSelector));
    inputsList.forEach(input => {
        input.addEventListener('input', () => {
            isValid(form, input, config);
        });
    });
}

function enableValidation(config) {
    const formList = document.querySelectorAll(config.formSelector);
    formList.forEach(form => setEventListener(form, config) );
}

function removeErrors(modal, config) {
    const inputsList = Array.from(modal.querySelectorAll(config.inputSelector));
    const button = modal.querySelector(config.submitButtonSelector);

    inputsList.forEach(input =>  {
        hideInputError(modal, input, config);
        toggleButtonState(input, button, config);
    });
}

/*Валидация форм*/
enableValidation(validateConfig);