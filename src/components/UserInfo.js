export default class UserInfo {
  constructor({name, description}) {
    this._userName = document.querySelector(name);
    this._userDescription = document.querySelector(description);
    
  }

  getUserInfo() {
    this.userData = {};
    this.userData['name'] = this._userName.textContent;
    this.userData['about'] = this._userDescription.textContent;

    return this.userData;
  }

  setUserInfo(data) {
    this._userName.textContent = data['name'];
    this._userDescription.textContent = data['about'];
  }
}