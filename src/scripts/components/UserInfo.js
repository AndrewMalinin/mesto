
export default class UserInfo {
  constructor(userNameSelector, userStatusSelector) {
    this._userNameElement = document.querySelector(userNameSelector);
    this._userStatusElement = document.querySelector(userStatusSelector);
    this._userName = this._userNameElement.textContent;
    this._userStatus = this._userStatusElement.textContent;
  }

  setUserInfo({name, status}) {
    this._userName = name;
    this._userStatus = status;
    this._update();
  }

  getUserInfo() {
    return {
      name: this._userName,
      status: this._userStatus
    }
  }

  _update() {
    this._userNameElement.textContent = this._userName;
    this._userStatusElement.textContent = this._userStatus;
  }
}
