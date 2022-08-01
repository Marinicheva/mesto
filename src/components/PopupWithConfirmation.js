import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector, renderLoading) {
    super(popupSelector);
    this.renderLoading = renderLoading.bind(this._submitBtn);
  }

  setConfirmedAction(actionConfirmed) {
    this._actionConfirmed = actionConfirmed;
  }

  setEventListeners() {
    super.setEventListeners();
    
    this._submitBtn.addEventListener('click', () => {
      this.renderLoading(true, "Удаление...")
      this._actionConfirmed();
    });
  }
}