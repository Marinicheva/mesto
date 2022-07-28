import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector, handleConfirmation) {
    super(popupSelector);

    this._handleConfirmation = handleConfirmation;
    this._btnApprove = this._popup.querySelector('.popup__btn-delete');
  }

  openPopup(removedCard, idDeletedCard) {
    super.openPopup();
    this._idDeletedCard = idDeletedCard;
    this._removedCard = removedCard;
  }

  setEventListeners() {
    super.setEventListeners();

    this._btnApprove.addEventListener('click', (evt) => {
      evt.preventDefault();
      this.renderLoading(true);
      this._handleConfirmation(this._removedCard, this._idDeletedCard);
    });
  }
}