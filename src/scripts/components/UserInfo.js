import { avatarEmpty } from "../utils/constants";

export default class UserInfo {
  constructor({userNameSelector, userStatusSelector, avatarSelector, userId}) {
    this._userId = userId;
    this._userNameElement = document.querySelector(userNameSelector);
    this._userStatusElement = document.querySelector(userStatusSelector);
    this._avatar = document.querySelector(avatarSelector);
    this._userName = this._userNameElement.textContent;
    this._userStatus = this._userStatusElement.textContent;
    this._avatarSrc = avatarEmpty;
  }

  setUserInfo({name, status, avatarLink, userId}) {
    this._userName = name;
    this._userStatus = status;
    this._avatarSrc = avatarLink;
    this._userId = userId === undefined ? this._userId : userId;
    this._update();
  }

  getUserInfo() {
    return {
      name: this._userName,
      status: this._userStatus,
      avatarLink: this._avatarSrc,
      userId: this._userId
    }
  }

  _update() {
    this._userNameElement.textContent = this._userName;
    this._userStatusElement.textContent = this._userStatus;
    if (this._avatar.src !== this._avatarSrc) {
      this._avatar.src = this._avatarSrc;
    }
  }
}
