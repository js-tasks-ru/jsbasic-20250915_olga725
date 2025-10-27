import createElement from '../../assets/lib/create-element.js';

export default class RibbonMenu {
  constructor(categories) {
      this.categories = categories;
      this.render();
      this.initialize();
  }

  get elem() {
    return this._elem;
  }

  render() {

    this._elem = createElement(`
      <div class="ribbon">
        <button class="ribbon__arrow ribbon__arrow_left">
          <img src="../../assets/images/icons/angle-icon.svg" alt="icon" />
        </button>
        <nav class="ribbon__inner"></nav>
        <button class="ribbon__arrow ribbon__arrow_right ribbon__arrow_visible">
          <img src="../../assets/images/icons/angle-icon.svg" alt="icon" />
        </button>
      </div>
    `);

    for (let category of this.categories) {
      let categoryElem = createElement(`<a href="#" class="ribbon__item"></a>`);
      categoryElem.textContent = category.name; // insert as text, not as HTML!
      categoryElem.dataset.id = category.id;
      this._elem.querySelector('.ribbon__inner').append(categoryElem);
    }

    this.nav = this._elem.querySelector('nav.ribbon__inner');
    this.arrowLeft = this._elem.querySelector('button.ribbon__arrow_left');
    this.arrowRight = this._elem.querySelector('button.ribbon__arrow_right');
    this._elem.querySelector('.ribbon__item').classList.add('ribbon__item_active');
  }

  initialize() {
    this.arrowLeft.addEventListener('click', () => this.scrollLeft());
    this.arrowRight.addEventListener('click', () => this.scrollRight());

    this._elem.querySelector('.ribbon__inner').addEventListener('scroll', () =>
      this.updateArrows()
    );

    this.nav.addEventListener('click', (event) => {
      if (event.target.tagName !== 'A') return;

      event.preventDefault();
      const clickedLink = event.target;
      this.itemLinks.forEach(itemLink =>
        itemLink.classList.toggle('ribbon__item_active', itemLink === clickedLink)
      );

      const categoryId = clickedLink.dataset.id;
      const eventSelect = new CustomEvent('ribbon-select', {
        detail: categoryId,
        bubbles: true
      });
      this._elem.dispatchEvent(eventSelect);
    });
  }

  scrollLeft() {
    const inner = this._elem.querySelector('.ribbon__inner');
    inner.scrollBy(-350, 0);
  }

  scrollRight() {
    const inner = this._elem.querySelector('.ribbon__inner');
    inner.scrollBy(350, 0);
  }

  updateArrows() {
    const inner = this._elem.querySelector('.ribbon__inner');
    const scrollLeft = inner.scrollLeft;
    const scrollWidth = inner.scrollWidth;
    const clientWidth = inner.clientWidth;
    const scrollRight = scrollWidth - scrollLeft - clientWidth;

    if (inner.scrollLeft > 0) {
      this.arrowLeft.classList.add('ribbon__arrow_visible');
    } else {
      this.arrowLeft.classList.remove('ribbon__arrow_visible');
    }

    scrollRight = scrollRight < 1 ? 0 : scrollRight;
    if (scrollRight > 0) {
      this.arrowRight.classList.add('ribbon__arrow_visible');
    } else {
      this.arrowRight.classList.remove('ribbon__arrow_visible');
    }

  }
}
