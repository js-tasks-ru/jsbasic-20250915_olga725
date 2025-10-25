import createElement from '../../assets/lib/create-element.js';

export default class Modal {
  constructor() {
    this._modal = createElement(`
      <div class="modal">
        <div class="modal__overlay"></div>
        <div class="modal__inner">
          <div class="modal__header">
            <button type="button" class="modal__close">
              <img src="/assets/images/icons/cross-icon.svg" alt="close-icon" />
            </button>
            <h3 class="modal__title">Заголовок</h3>
          </div>
          <div class="modal__body"></div>
        </div>
      </div>
    `);

    this._closeButton = this._modal.querySelector('.modal__close');
    this._titleElem = this._modal.querySelector('.modal__title');
    this._bodyContainer = this._modal.querySelector('.modal__body');
    this._closeButton.addEventListener('click', () => this.close());

    this._escHandler = (evt) => {
      if (evt.code === 'Escape') {
        this.close();
      }
    };
  }

  open() {
    if (!document.body.contains(this._modal)) {
      document.body.classList.add('is-modal-open');
      document.body.append(this._modal);
      document.addEventListener('keydown', this._escHandler);
    }
  }

  close() {
    if (document.body.contains(this._modal)) {
      this._modal.remove();
      document.body.classList.remove('is-modal-open');
      document.removeEventListener('keydown', this._escHandler);
    }
  }

  setTitle(title) {
    this._titleElem.textContent = title;
  }

  setBody(node) {
    this._bodyContainer.innerHTML = ''; 
    this._bodyContainer.append(node);
  }
}
