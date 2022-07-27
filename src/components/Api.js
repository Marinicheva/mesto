export default class Api {
  constructor({url, headers}) {
    this._url = url,
    this._headers = headers;
  }

  //Получение данных о пользователе
  getUserData() {
    return fetch(`${this._url}users/me`, {
      method: "GET",
      headers: this._headers,
    })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      Promise.reject(`Ошибка: ${res.status}. Данные о пользователе с сервера не получены`);
    })
  }

  //Редактирование данных профиля
  updateUserData(newData) {
    return fetch(`${this._url}users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify(
        {
          "name": newData.name,
          "about": newData.about
        }
      )
    })
    .then((res) => {
      if (res.ok) {
        return res.json();
      } 
      Promise.reject(`Ошибка: ${res.status}. Данные пользователя не отредактированы`);
    })
  }

  //Обновление аватарки
  updateUserAvatar(avatarData) {
    return fetch(`${this._url}users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        "avatar": avatarData.avatar,
      })
    })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      Promise.reject(`Ошибка: ${res.status}. Аватар пользователя не обновлен`);
    })
  }
  
  //Получение карточек с сервера
  getCards() {
    return fetch(`${this._url}cards`, {
      method: 'GET',
      headers: this._headers,
    })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      Promise.reject(`Ошибка: ${res.status}. Карточки с сервера не пришли`);
    })
  }

  //Добавление новой карточки
  addNewCard(cardData) {
    return fetch(`${this._url}cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
          "name": cardData.name,
          "link": cardData.link
        })
    })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      Promise.reject(`Ошибка: ${res.status}. Карточка не добавлена.`);
    })
  }

  //Поставить лайк
  addLike(cardID) {
    return fetch(`${this._url}/cards/${cardID}/likes`, {
      method: "PUT",
      headers: this._headers,
    }
    ).then((res) => {
      if (res.ok) {
        return res.json();
      }
      Promise.reject(`Ошибка: ${res.status}.Лайк не поставлен`);
    })
  }

  //Убрать лайк
  removeLike(cardID) {
    return fetch(`${this._url}/cards/${cardID}/likes`, {
      method: "DELETE",
      headers: this._headers,
    }
    ).then((res) => {
      if (res.ok) {
        // console.log(res,"Unliked");
        return res.json();
      }
      Promise.reject(`Ошибка: ${res.status}.Лайк не убран`);
    })
  }

  //Удалить карточку
  removeCardData(cardID) {
    return fetch(`${this._url}cards/${cardID}`, {
      method: "DELETE",
      headers: this._headers,
    })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      Promise.reject(`Ошибка: ${res.status}. Карточка не удалена`);
    })
  }
}