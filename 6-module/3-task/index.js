import createElement from '../../assets/lib/create-element.js';

export default class Carousel {
  constructor(slides) {
    this.slides = slides;
    this._container = this._createCarousel();
    this._currentSlide = 0;
    this.arrowLeft = this._container.querySelector('.carousel__arrow_left');
    this.arrowRight = this._container.querySelector('.carousel__arrow_right');
    this._inner = this._container.querySelector('.carousel__inner');
    this._createSlides();
    this._addElementRow();
    this._updateArrows();
  }

  get elem() {
    return this._container;
  }

  _createCarousel() {
    const htmlCarusel = `
      <div class="carousel">
        <button type="button" class="carousel__arrow carousel__arrow_left">
          <img src="/assets/images/icons/angle-left-icon.svg" alt="left">
        </button>
        <div class="carousel__inner"></div>
        <button type="button" class="carousel__arrow carousel__arrow_right">
          <img src="/assets/images/icons/angle-icon.svg" alt="right";>
        </button>
      </div>
    `;
    const element = createElement(htmlCarusel);
    return element;
  }
  _createSlides() {
    this.slides.forEach(slide => {
      const htmlSlides = `
        <div class="carousel__slide" data-id="${slide.id}">
          <img src="/assets/images/carousel/${slide.image}" class="carousel__img" alt="slide">
          <div class="carousel__caption">
            <span class="carousel__price">€${slide.price.toFixed(2)}</span>
            <div class="carousel__title">${slide.name}</div>
            <button type="button" class="carousel__button">
              <img src="/assets/images/icons/plus-icon.svg" alt="icon">
            </button>
          </div>
        </div>
      `;
      const slideElement = createElement(htmlSlides);
      slideElement.dataset.id = slide.id;
      const button = slideElement.querySelector('.carousel__button');
        button.addEventListener('click', () => {
          this._container.dispatchEvent(new CustomEvent('product-add', {
            detail: slide.id,
            bubbles: true,
          }));
        });
      this._inner.appendChild(slideElement);
    });
  }

  _addElementRow() {
    this.arrowLeft.addEventListener('click', () => {
      if (this._currentSlide > 0) {
        this._currentSlide--;
        this._updateCarousel();
      }
    });
    
    this.arrowRight.addEventListener('click', () => {
      if (this._currentSlide < this.slides.length - 1) {
        this._currentSlide++;
        this._updateCarousel();
      }
    });
  }

  _updateCarousel() {
    const widthNew = this._container.querySelector('.carousel__inner').offsetWidth;
    const translateX = this._currentSlide * (-widthNew);
    this._inner.style.transform = `translateX(${translateX}px)`;
    this._updateArrows();
  }

  _updateArrows() {
    this.arrowLeft.style.display = this._currentSlide === 0 ? 'none' : '';
    this.arrowRight.style.display = this._currentSlide === this.slides.length - 1 ? 'none' : '';
  }
}
