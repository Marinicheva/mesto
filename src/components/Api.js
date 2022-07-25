export default class Api {
  constructor({url, token, method}) {
    this._url = url,
    this._token = token;
  }

  //Получение данных о пользователе
  getUserData() {
    return fetch(`${this._url}users/me`, {
      method: "GET",
      headers: {
        authorization: this._token,
      },
    })
    .then((res) => {
      return res.json();
    })
  }
  
  //Получение карточек с сервера
  getCards() {
    return fetch(`${this._url}cards`, {
      method: 'GET',
      headers: {
        authorization: this._token,
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          Promise.reject(`Ошибка: ${res.code}`);
        }
      })
  }
}