import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupImg = this._popup.querySelector(".popup__img-fullscreen");
    this._popupCaption = this._popup.querySelector(".popup__fullscreen-caption");
  }

  _clearPopup() {
    this._popupImg.src = '';
    this._popupImg.alt = '';
    this._popupCaption.textContent = '';

  }

  openPopup({ name, link }) {
    this._popupImg.src = link;
    this._popupImg.alt = `Пользовательское фото места ${name}`;
    this._popupCaption.textContent = name;

    super.openPopup();
  }

  closePopup() {
    super.closePopup();
    this._clearPopup();
  }
}
