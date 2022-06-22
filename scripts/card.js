class Card {
  constructor(data, templateSelector) {
    this._title = data.name;
    this._url = data.link;
    this._templateSelector = templateSelector;
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

  _handleShowFullImg() {
    const modalFullScreen = document.querySelector('.modal_type_fullscreen-img');
    const fullScreenImg = modalFullScreen.querySelector('.modal__img-fullscreen');
    const fullScreenCaption = modalFullScreen.querySelector('.modal__fullscreen-caption');

    fullScreenImg.src = this._url;
    fullScreenImg.alt = `Пользовательское фото места ${this._title}`;
    fullScreenCaption.textContent = this._title;
  }

  _setEvenetListeners() {
    const likeBtn = this._cardItem.querySelector('.gallery__like-btn');
    const deleteBtn = this._cardItem.querySelector('.gallery__delete-btn');
    const cardImage = this._cardItem.querySelector('.gallery__img');

    likeBtn.addEventListener('click', (evt) => {
      this._handleLikeClick(evt);
    });

    deleteBtn.addEventListener('click', () => {
      this._handleDeleteClick();
    });

    cardImage.addEventListener('click', () => {
      this._handleShowFullImg();
    });
  }

  generateCard() {
    this._cardItem = this._getTemplate();
    this._setEvenetListeners();
    
    const cardTitle = this._cardItem.querySelector('.gallery__img-caption');
    const cardImg = this._cardItem.querySelector('.gallery__img');

    cardTitle.textContent = this._title;
    cardImg.src = this._url;
    cardImg.alt = `Пользовательское фото места ${this._title}`;

    return this._cardItem;
  }
}

export default Card;