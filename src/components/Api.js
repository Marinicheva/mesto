export default class Api {
  constructor({url, token}) {
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
      if (res.ok) {
        return res.json();
      } else {
        Promise.reject(`Ошибка: ${res.code}`);
      }
    })
  }

  //Редактирование данных профиля
  editUserData(newData) {
    return fetch(`${this._url}users/me`, {
      method: "PATCH",
      headers: {
        'authorization': this._token,
        'Content-Type': 'application/json'
      },
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
        Promise.reject(`Ошибка: ${res.code}`);
      }
    })
  }
  
  //Получение карточек с сервера
  getCards() {
    return fetch(`${this._url}cards`, {
      method: 'GET',
      headers: {
        'authorization': this._token,
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

  //Добавление новой карточки
  addNewCard(cardData) {
    return fetch(`${this._url}cards`, {
      method: 'POST',
      headers: {
        'authorization': this._token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
          "name": cardData.name,
          "link": cardData.link
        })
    })
    .then((res) => {
      console.log(`res`);
      if (res.ok) {
        return res.json();
      } else {
        console.log('No work!!');
      }
    })

  }
}