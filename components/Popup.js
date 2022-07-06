import { ESC_CODE } from "../utils/constants.js";

export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
  }

  openPopup() {
    this._popup.classList.add('popup_opened');
  }

  closePopup() {
    this._popup.classList.remove('popup_opened');
  }

  _handleEscClose(evt) {
    if (evt.key === ESC_CODE) {
      this.closePopup();
    }
    
  }

  _handleOverlayClose() {
    if (this._popup.classList.contains('popup_opened')) {
      this.closePopup();
    }
  }

  setEventListeners() {
    const btnClose = this._popup.querySelector('.popup__close');
    btnClose.addEventListener('click', () => this.closePopup());

    this._popup.addEventListener('mousedown', () => this._handleOverlayClose());

    document.addEventListener('keydown', (evt) => this._handleEscClose(evt)); //Как удалить слушатель здесь????
  }
}