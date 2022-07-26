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
      } else {
        Promise.reject(`Ошибка: ${res.code}. Данные о пользователе с сервера не получены`);//Может вынести ошибки в индекс
      }
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
      } else {
        Promise.reject(`Ошибка: ${res.code}. Данные пользователя не отредактированы`);//Может вынести ошибки в индекс
      }
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
      } else {
        Promise.reject(`Ошибка: ${res.code}. Аватар пользователя не обновлен`);//Может вынести ошибки в индекс
      }
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
      } else {
        Promise.reject(`Ошибка: ${res.code}. Карточки с сервера не пришли`);//Может вынести ошибки в индекс
      }
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
      } else {
        console.log('Карточка не добавлена!');//Может вынести ошибки в индекс
      }
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
        console.log(res);
        return res.json();
      } else {
        Promise.reject(`Ошибка: ${res.code}.Лайк не поставлен`);
      }
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
        console.log(res);
        return res.json();
      } else {
        Promise.reject(`Ошибка: ${res.code}.Лайк не снят`);
      }
    })
  }

  //Удалить карточку
  removeCard(cardID) {
    return fetch(`${this._url}cards/${cardID}`, {
      method: "DELETE",
      headers: this._headers,
    })
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        Promise.reject(`Ошибка: ${res.code}.Карточка не удалена`);
      }
    })

  }
}