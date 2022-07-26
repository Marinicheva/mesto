export default class UserInfo {
  constructor({name, about}) {
    this._userName = document.querySelector(name);
    this._userAbout = document.querySelector(about);
    
  }

  getUserInfo() {
    this.userData = {};
    this.userData['name'] = this._userName.textContent;
    this.userData['about'] = this._userAbout.textContent;

    return this.userData;
  }

  setUserInfo(data) {
    this._userName.textContent = data['name'];
    this._userAbout.textContent = data['about'];
  }
}