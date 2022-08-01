import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }

  setConfirmedAction(actionConfirmed) {
    this._actionConfirmed = actionConfirmed;
  }

  setEventListeners() {
    super.setEventListeners();
    
    this._submitBtn.addEventListener('click', () => {
      this._actionConfirmed();
    });
  }
}