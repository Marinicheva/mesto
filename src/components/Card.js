export default class Card {
  constructor(
    data,
    templateSelector,
    handleOpenViewPopup,
    handleClickDeleteCard,
    handleClickLikeBtn,
    userId
  ) {
    this.cardData = data;
    this._ownerId = data["owner"]["_id"];
    this._userId = userId;
    this._templateSelector = templateSelector;
    this._handleOpenViewPopup = handleOpenViewPopup;
    this._handleClickDeleteCard = handleClickDeleteCard;
    this._handleClickLikeBtn = handleClickLikeBtn;
  }

  _getTemplate() {
    const card = document
      .querySelector(this._templateSelector)
      .content.querySelector(".gallery__item")
      .cloneNode(true);
    return card;
  }

  _setLikeBtnState(isLiked) {
    if (isLiked) {
      this._likeBtn.classList.add("gallery__like-btn_active");
    } else {
      this._likeBtn.classList.remove("gallery__like-btn_active");
    }
  }

  _renderLikesCounter() {
    this._isLiked = this.cardData.likes.some((item) => item["_id"] === this._userId);
    this._setLikeBtnState(this._isLiked);

    this._likeCounter.textContent =
    this.cardData.likes.length > 0 ? this.cardData.likes.length : null;
  }

  getLikesArr(likes) {
    this.cardData.likes = likes;
    this._renderLikesCounter();
  }

  removeCard() {
    this._cardItem.remove();
  }

  _handleclickImage() {
    this._handleOpenViewPopup({
      link: this.cardData.link,
      name: this.cardData.name,
    });
  }

  _setEvenetListeners() {
    this._likeBtn.addEventListener("click", () => {
      this._handleClickLikeBtn(
        this.cardData._id,
        this._isLiked,
        this.getLikesArr.bind(this)
      );
    });

    this._deleteBtn.addEventListener("click", () => {
      this._handleClickDeleteCard(this.cardData, this.removeCard.bind(this));
    });

    this._cardImage.addEventListener("click", () => {
      this._handleclickImage();
    });
  }

  generateCard() {
    this._cardItem = this._getTemplate();

    this._likeBtn = this._cardItem.querySelector(".gallery__like-btn");
    this._deleteBtn = this._cardItem.querySelector(".gallery__delete-btn");
    this._cardImage = this._cardItem.querySelector(".gallery__img");
    this._cardTitle = this._cardItem.querySelector(".gallery__img-caption");
    this._likeCounter = this._cardItem.querySelector(".gallery__like-counter");

    this._setEvenetListeners();

    if (this._ownerId !== this._userId) {
      this._deleteBtn.classList.add("gallery__delete-btn_hide");
    }

    this._renderLikesCounter();

    this._cardTitle.textContent = this.cardData.name;
    this._cardImage.src = this.cardData.link;
    this._cardImage.alt = `Пользовательское фото места ${this.cardData.name}`;

    return this._cardItem;
  }
}
