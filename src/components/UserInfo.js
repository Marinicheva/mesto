export default class UserInfo {
  constructor({name, about, avatar}) {
    this._userName = document.querySelector(name);
    this._userAbout = document.querySelector(about);
    this._userAvatar = document.querySelector(avatar);
    this.userInfo = {};
  }

  //Сохранение исходных данных пользователя с сервера
  initUserInfo(data) {
    this.userInfo['name'] = data.name;
    this.userInfo['about'] = data.about;
    this.userId = data._id;
    this._userAvatar.src = data.avatar;

    return this.userInfo;
  }

  getUserInfo() {
    this.userInfo['name'] = this._userName.textContent;
    this.userInfo['about'] = this._userAbout.textContent;

    console.log(this.userInfo);

    return this.userInfo;
  }

  setUserInfo(data) {
    this._userName.textContent = data['name'];
    this._userAbout.textContent = data['about'];
  }

  updateUserAvatar(newData) {
    this._userAvatar.src = newData.avatar; 
  }
}