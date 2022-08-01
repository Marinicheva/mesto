import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector, handleConfirmation) {
    super(popupSelector);

    this._handleConfirmation = handleConfirmation;
  }

  openPopup(idDeletedCard, removeCard) {
    super.openPopup();
    this._idDeletedCard = idDeletedCard;
    this.removeCard = removeCard;
  }

  setEventListeners() {
    super.setEventListeners();

    this._submitBtn.addEventListener('click', () => {
      this._handleConfirmation(this._idDeletedCard);
    });
  }
}