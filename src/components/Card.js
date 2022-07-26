export default class Card {
  constructor(data, templateSelector, handleOpenViewPopup, handleClickDeleteCard, userId) {
    this._title = data["name"];
    this._url = data["link"];
    this._likes = data["likes"];
    this._cardID = data["_id"];
    this._ownerId = data["owner"]["_id"];
    this._userID = userId;
    this._templateSelector = templateSelector;
    this._handleOpenViewPopup = handleOpenViewPopup;
    this._handleClickDeleteCard = handleClickDeleteCard;
  }

  _getTemplate() {
    const card = document
      .querySelector(this._templateSelector)
      .content.querySelector(".gallery__item")
      .cloneNode(true);
    return card;
  }

  _handleLikeClick(evt) {
    if ( evt.target.classList.contains("gallery__like-btn_active") ) {
      evt.target.classList.remove("gallery__like-btn_active")
      this._likeCounter.textContent = +this._likeCounter.textContent === 1 ? null : +this._likeCounter.textContent - 1;
    } else  {
      evt.target.classList.add("gallery__like-btn_active")
      this._likeCounter.textContent = +this._likeCounter.textContent + 1;
    }
  }

  _handleclickImage() {
    this._handleOpenViewPopup({
      link: this._url,
      name: this._title,
    });
  }

  _setEvenetListeners() {
    this._likeBtn.addEventListener("click", (evt) => {
      this._handleLikeClick(evt);
    });

    this._deleteBtn.addEventListener("click", () => {
      this._handleClickDeleteCard(this._cardID);
    });

    this._cardImage.addEventListener("click", () => {
      this._handleclickImage();
    });
  }

  removeCard() {
    this._cardItem.remove();
    this._cardItem = null;
  }

  generateCard() {
    this._cardItem = this._getTemplate();

    this._likeBtn = this._cardItem.querySelector(".gallery__like-btn");
    this._deleteBtn = this._cardItem.querySelector(".gallery__delete-btn");
    this._cardImage = this._cardItem.querySelector(".gallery__img");
    this._cardTitle = this._cardItem.querySelector(".gallery__img-caption");
    this._likeCounter = this._cardItem.querySelector(".gallery__like-counter");

    this._setEvenetListeners();

    if(this._ownerId !== this._userID) {
      this._deleteBtn.classList.add("gallery__delete-btn_hide");
    }

    this._cardTitle.textContent = this._title;
    this._cardImage.src = this._url;
    this._cardImage.alt = `Пользовательское фото места ${this._title}`;

    this._likeCounter.textContent = this._likes.length > 0 ? this._likes.length : null;
 
    return this._cardItem;
  }
}
