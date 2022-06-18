const validateConfig = {
  formSelector: '.modal__form',
  inputSelector: '.modal__input',
  submitButtonSelector: '.modal__btn',
  inactiveButtonClass: 'modal__btn_inactive',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'modal__input-error_visible'
};

function showInputError(form, input, config) {
  input.classList.add(config.inputErrorClass);

  const errorMessage = form.querySelector(`.${input.id}-input-error`);
  errorMessage.textContent = input.validationMessage;
  errorMessage.classList.add(config.errorClass);

}

function hideInputError(form, input, config) {
  input.classList.remove(config.inputErrorClass);

  const errorMessage = form.querySelector(`.${input.id}-input-error`);
  errorMessage.classList.remove(config.errorClass);
  errorMessage.textContent = '';
}

function isValid(form, input, config) {
  if (!input.validity.valid) {
    showInputError(form, input, config);
  } else {
    hideInputError(form, input, config);
  }
}

function hasInvalidInput(inputList) {
  return inputList.some(input => {
    return !input.validity.valid;
  });
}

function toggleButtonState(inputList, button, config) {
  if (hasInvalidInput(inputList)) {
    button.disabled = true;
    button.classList.add(config.inactiveButtonClass);
  } else {
    button.disabled = false;
    button.classList.remove(config.inactiveButtonClass);
  }
}

function setEventListener(form, config) {
  const inputList = Array.from(form.querySelectorAll(config.inputSelector));
  const buttonSubmit = form.querySelector(config.submitButtonSelector);
  toggleButtonState(inputList, buttonSubmit, config);

  inputList.forEach(input => {
    input.addEventListener('input', () => {
      isValid(form, input, config);
      toggleButtonState(inputList, buttonSubmit, config);
    });
  });
}

function enableValidation(config) {
  const formList = Array.from(document.querySelectorAll(config.formSelector));

  formList.forEach(form => {
    form.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });

    setEventListener(form, config);
  });
}

function removeErrors(modal, config) {
  const inputsList = Array.from(modal.querySelectorAll(config.inputSelector));
  const button = modal.querySelector(config.submitButtonSelector);
  toggleButtonState(inputsList, button, config);

  inputsList.forEach(input => {
    hideInputError(modal, input, config);
  });
}

enableValidation(validateConfig);