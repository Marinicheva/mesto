import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleSubmitForm) {
    super(popupSelector);
    this._handleSubmitForm = handleSubmitForm;
    this.popupForm = this._popup.querySelector('.popup__form');
    this._inputsList = this.popupForm.querySelectorAll('.popup__input');
    
  }

  _getInputValues() {
    this._inputValues = {};
    
    this._inputsList.forEach(input => {
      this._inputValues[input.name] = input.value;
    });

    return this._inputValues;
  }

  setInputsValues(data) {

    this._inputsList.forEach(input => {
      input.value = data[input.name];
    })
  }

  setEventListeners() {
    super.setEventListeners();

    this.popupForm.addEventListener('submit', (evt) => {
      evt.preventDefault();

      this._handleSubmitForm(this._getInputValues());
    });
  }

  closePopup() {
    super.closePopup();
    this.popupForm.reset();
  }
}