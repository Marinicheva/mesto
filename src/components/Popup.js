import { ESC_CODE } from "../utils/constants.js";

export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._btnClose = this._popup.querySelector(".popup__close");
    this._closeByEscape = this._handleEscClose.bind(this);
  }

  openPopup() {
    this._popup.classList.add("popup_opened");
    document.addEventListener("keydown", this._closeByEscape);
  }

  closePopup() {
    this._popup.classList.remove("popup_opened");
    document.removeEventListener("keydown", this._closeByEscape);
  }

  _handleEscClose(evt) {
    if (evt.key === ESC_CODE) {
      this.closePopup();
    }
  }

  _handleOverlayClose(evt) {
    if (evt.target.classList.contains("popup_opened")) {
      this.closePopup();
    }
  }

  setEventListeners() {
    this._btnClose.addEventListener("click", () => this.closePopup());
    this._popup.addEventListener("mousedown", (evt) =>
      this._handleOverlayClose(evt)
    );
  }
}
