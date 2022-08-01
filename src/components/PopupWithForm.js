import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleSubmitForm) {
    super(popupSelector);
    
    this._handleSubmitForm = handleSubmitForm;
    this.popupForm = this._popup.querySelector(".popup__form");
    this._inputsList = this.popupForm.querySelectorAll(".popup__input");
  }

  _getInputValues() {
    this._inputValues = {};

    this._inputsList.forEach((input) => {
      this._inputValues[input.name] = input.value;
    });

    return this._inputValues;
  }

  renderLoading(isLoading, message) {
    this._btnName = this._submitBtn.getAttribute("data-name");

    if (isLoading) {
      this._submitBtn.textContent = message;
      this._submitBtn.disabled = true;
      this._submitBtn.classList.add("popup__btn_inactive");
    } else {
      this._submitBtn.textContent = this._btnName;
      this._submitBtn.classList.remove("popup__btn_inactive");
    }
  }

  setInputsValues(data) {
    this._inputsList.forEach((input) => {
      input.value = data[input.name];
    });
  }

  setEventListeners() {
    super.setEventListeners();

    this.popupForm.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this.renderLoading(true, "Сохранение...");
      
      this._handleSubmitForm(this._getInputValues());
    });
  }

  closePopup() {
    super.closePopup();
    this.popupForm.reset();
  }
}
