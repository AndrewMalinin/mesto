export default class Popup {
  constructor(popupSelector) {
    this._popupElement = document.querySelector(popupSelector);
    // При использовании .bind() создается новая ссылка на функцию, поэтому
    // при использовании addEventListener(event, handler.bind()), в слушатель попадет ссылка
    // не на функцию handler, а другая ссылка, поэтому при removeEventLister(event, handler)
    // на самом деле не удаляется handler.
    //https://stackoverflow.com/questions/11565471/removing-event-listener-which-was-added-with-bind
    this._handleEscCloselink = this._handleEscClose.bind(this);
  }

  _handleEscClose(e) {
    if (e.key === 'Escape') {
      this.close();
    }
  }

  setEventListeners() {
    // Вешаем обработчики на событие mousedown, а не на click, чтобы убрать неприятный баг
    // при котором mousedown внутри формы и mouseup вне формы(мышка отводится в сторону во время набора текста),
    // приводило к закрытию формы
    this._popupElement.addEventListener('mousedown', (e)=>{
      if (e.target.classList.contains('popup') ||
          e.target.classList.contains('popup__close-button')){
        this.close();
      }
    });
  }

  open() {
    this._popupElement.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscCloselink);
  }

  close() {
    this._popupElement.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscCloselink);
  }
}
