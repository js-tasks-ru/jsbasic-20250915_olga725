import createElement from '../../assets/lib/create-element.js';

export default class RibbonMenu {
  constructor(categories) {
    this.categories = categories;
    this.render();
    this.initialize();
    this.updateArrows();
  }

  get elem() {
    return this._elem;
  }

  render() {
    this._elem = document.createElement('div');
    this._elem.className = 'ribbon';

    this.nav = document.createElement('nav');
    this.nav.className = 'ribbon__inner';

    this.arrowLeft = document.createElement('button');
    this.arrowLeft.className = 'ribbon__arrow ribbon__arrow_left ribbon__arrow_visible';
    this.arrowLeft.innerHTML = `<img src="/assets/images/icons/angle-icon.svg" alt="icon">`;

    this.arrowRight = document.createElement('button');
    this.arrowRight.className = 'ribbon__arrow ribbon__arrow_right';
    this.arrowRight.innerHTML = `<img src="/assets/images/icons/angle-icon.svg" alt="icon">`;

    this.itemLinks = [];
    for (let category of this.categories) {
      const itemLink = document.createElement('a');
      itemLink.setAttribute('href', '#');
      itemLink.className = 'ribbon__item';
      if (category.id === '' || category.id === 'all') {
        itemLink.classList.add('ribbon__item_active');
      }
      itemLink.setAttribute('data-id', category.id);
      itemLink.textContent = category.name;
      
      this.nav.appendChild(itemLink);
      this.itemLinks.push(itemLink);
      
    }

    this._elem.appendChild(this.nav);
    this._elem.appendChild(this.arrowLeft);
    this._elem.appendChild(this.arrowRight);
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

    if (scrollLeft < 1) {
      this.arrowLeft.classList.remove('ribbon__arrow_visible');
    } else {
      this.arrowLeft.classList.add('ribbon__arrow_visible');
    }

    if (scrollRight < 1) {
      this.arrowRight.classList.remove('ribbon__arrow_visible');
    } else {
      this.arrowRight.classList.add('ribbon__arrow_visible');
    }
  }
}
