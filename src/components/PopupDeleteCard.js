import Popup from "./Popup.js";

export default class PopupDeleteCard extends Popup {
  constructor(popupSelector, handleConfirmation) {
    super(popupSelector);

    this._handleConfirmation = handleConfirmation;
    this._btnApprove = this._popup.querySelector('.popup__btn-delete');
  }

  openPopup(idDeletedCard, removeCard) {
    super.openPopup();
    this._idDeletedCard = idDeletedCard;
    this._removeCard = removeCard;
  }

  setEventListeners() {
    super.setEventListeners();

    this._btnApprove.addEventListener('click', (evt) => {
      evt.preventDefault();
      this._handleConfirmation(this._idDeletedCard, this._removeCard);
    });
  }
}