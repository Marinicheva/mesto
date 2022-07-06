import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleSubmitForm) {
    super(popupSelector);
    this._handleSubmitForm = handleSubmitForm;
    this._popupForm = this._popup.querySelector('.popup__form');
  }

  _getInputValues() {
    const inputValues = {};
    const inputsList = this._popupForm.querySelectorAll('.popup__input');

    inputsList.forEach(input => {
      inputValues[input.name] = input.value;
    });

    return inputValues;
  }

  setEventListeners() {
    super.setEventListeners();

    this._popupForm.addEventListener('submit', (evt) => {
      evt.preventDefault();

      const data = this._getInputValues();
      
      this._handleSubmitForm(data);
      this.closePopup();
    });
  }

  closePopup() {
    super.closePopup()
    this._popupForm.reset();
  }
}