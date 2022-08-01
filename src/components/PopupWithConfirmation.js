import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector, handleConfirmation, renderLoading) {
    super(popupSelector);

    this._btnApprove = this._popup.querySelector('.popup__btn-delete');

    this._handleConfirmation = handleConfirmation;
    this.renderLoading = renderLoading.bind(this._btnApprove);
  }

  openPopup(idDeletedCard, removeCard) {
    super.openPopup();
    this._idDeletedCard = idDeletedCard;
    this.removeCard = removeCard;
  }

  setEventListeners() {
    super.setEventListeners();

    this._btnApprove.addEventListener('click', () => {
      // this.renderLoading(true, "Удаление...");
      this._handleConfirmation(this._idDeletedCard);
    });
  }
}