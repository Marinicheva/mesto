export default class Card {
  constructor(data, templateSelector, handleOpenViewPopup) {
    this._title = data['place-name'];
    this._url = data['place-link'];
    this._templateSelector = templateSelector;
    this._handleOpenViewPopup = handleOpenViewPopup;
  }

  _getTemplate() {
    const card = document.querySelector(this._templateSelector)
      .content
      .querySelector('.gallery__item')
      .cloneNode(true);
    return card;
  }

  _handleLikeClick(evt) {
    evt.target.classList.toggle('gallery__like-btn_active');
  }

  _handleDeleteClick() {
    this._cardItem.remove();
  }

  _handleclickImage() {
    this._handleOpenViewPopup({
      link: this._url,
      name: this._title
    });
  }

  _setEvenetListeners() {
    this._likeBtn.addEventListener('click', (evt) => {
      this._handleLikeClick(evt);
    });

    this._deleteBtn.addEventListener('click', () => {
      this._handleDeleteClick();
    });

    this._cardImage.addEventListener('click', (evt) => {
      this._handleclickImage();
    });
  }

  generateCard() {
    this._cardItem = this._getTemplate();

    this._likeBtn = this._cardItem.querySelector('.gallery__like-btn');
    this._deleteBtn = this._cardItem.querySelector('.gallery__delete-btn');
    this._cardImage = this._cardItem.querySelector('.gallery__img');
    this._cardTitle = this._cardItem.querySelector('.gallery__img-caption');

    this._setEvenetListeners();

    this._cardTitle.textContent = this._title;
    this._cardImage.src = this._url;
    this._cardImage.alt = `Пользовательское фото места ${this._title}`;

    return this._cardItem;
  }
}