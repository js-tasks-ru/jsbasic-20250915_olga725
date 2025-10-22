import createElement from '../../assets/lib/create-element.js';

export default class ProductCard {
  constructor(product) {
    this.product = product;
    this._container = this.render();
    this.addEventListeners();
  }
  get elem() {
    return this._container;
  }

  render() {
    const productImage = `/assets/images/products/${this.product.image}`;
    const productPrice = `${this.product.price.toFixed(2)}`;

    const html = `
      <div class="card" data-id="${this.product.id}">
        <div class="card__top">
          <img class="card__image" alt="product" src="${productImage}">
          <span class="card__price">€${productPrice}</span>
        </div>
        <div class="card__body">
          <div class="card__title">${this.product.name}</div>
          <button type="button" class="card__button">
            <img src="/assets/images/icons/plus-icon.svg" alt="icon">
          </button>
        </div>
      </div>
    `;
    return createElement(html);
  }

  addEventListeners() {
    const button = this.elem.querySelector('.card__button');
    button.addEventListener('click', () => {
      this.elem.dispatchEvent(new CustomEvent('product-add', {
        detail: this.product.id,
        bubbles: true,
      }));
    });
  }
}