const validationConfig = {
  formSelector: '.modal__form',
  inputSelector: '.modal__input',
  submitButtonSelector: '.modal__btn',
  inactiveButtonClass: 'modal__btn_inactive',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'modal__input-error_visible'
};

class FormValidator {
  constructor(dataConfig, formElement) {
    this._form = formElement;
    this._inputSelector = dataConfig.inputSelector;
    this._inputList = Array.from(this._form.querySelectorAll(this._inputSelector));

    this._submitButtonSelector = dataConfig.submitButtonSelector;
    this._buttonSubmit = this._form.querySelector(this._submitButtonSelector);
    this._inactiveButtonClass = dataConfig.inactiveButtonClass;

    this._inputErrorClass = dataConfig.inputErrorClass;
    this._errorClass = dataConfig.errorClass;
  }

  _hasInvalidInput() {
    return this._inputList.some(input => {
      return !input.validity.valid;
    }); 
  }

  _toggleButtonState() {
    if ( this._hasInvalidInput() ) {
      this._buttonSubmit.disabled = true;
      this._buttonSubmit.classList.add(this._inactiveButtonClass);
    } else {
      this._buttonSubmit.disabled = false;
      this._buttonSubmit.classList.remove(this._inactiveButtonClass);
    }
  }

  _showInputError(input) {
    input.classList.add(this._inputErrorClass);
  
    const errorMessage = this._form.querySelector(`.${input.id}-input-error`);
    errorMessage.textContent = input.validationMessage;
    errorMessage.classList.add(this._errorClass);
  }

  _hideInputError(input) {
    input.classList.remove(this._inputErrorClass);
  
    const errorMessage = this._form.querySelector(`.${input.id}-input-error`);
    errorMessage.classList.remove(this._errorClass);
    errorMessage.textContent = '';
  }

  _isValid(input) {
    if (!input.validity.valid) {
      this._showInputError(input);
    } else {
      this._hideInputError(input);
    }
  }

  _setEventListeners() {
    this._toggleButtonState();

    this._inputList.forEach(input => {
      input.addEventListener('input', () => {
        this._isValid(input);
        this._toggleButtonState();
      });
    });
  }

  enableValidation() {
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });

    this._setEventListeners();
  }

  showMe() {
    console.log(this._form);
    console.log(this._inputList);
  }
}

export {FormValidator, validationConfig};