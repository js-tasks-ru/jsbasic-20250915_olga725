export default class StepSlider {
  constructor({ steps, value = 0 }) {
    this.steps = steps;
    this.value = value;

    this.elem = document.createElement("div");
    this.elem.className = "slider";

    this.elem.innerHTML = `
      <div class="slider__thumb" style="left: 50%;">
          <span class="slider__value">${this.value}</span>
      </div>
      <div class="slider__progress" style="width: 50%;"></div>
      <div class="slider__steps">
        ${' '.repeat(steps).split('').map((_, i) => 
          `<span ${this.value === i ? 'class="slider__step-active"' : '' }></span>`
        ).join('')}
      </div>`;

    this.thumb = this.elem.querySelector('.slider__thumb');
    this.progress = this.elem.querySelector('.slider__progress');
    this.stepsContainer = this.elem.querySelector('.slider__steps');
    this.valueSpan = this.elem.querySelector('.slider__value');
    this.elem.addEventListener('click', this.onClick.bind(this));
    this.thumb.addEventListener('pointerdown', this.onPointerDown.bind(this));

    this._pointerMove = this.onPointerMove.bind(this);
    this._pointerUp = this.onPointerUp.bind(this);

    this.updateSlider();
  }

  onClick (event) {
    let clickX = event.clientX - this.elem.getBoundingClientRect().left;
    let leftRelative = clickX / this.elem.offsetWidth;

    let segments = this.steps - 1;
    let approximateValue = leftRelative * segments
    let newValue = Math.round(approximateValue);
    this.valuePercents = newValue / segments * 100;

    if (this.value !== newValue) {
      this.value = newValue;
      this.updateSlider();

      this.elem.dispatchEvent(new CustomEvent('slider-change', {
        detail: this.value,  // значение 0, 1, 2, 3, 4
        bubbles: true  // событие всплывает - это понадобится в дальнейшем
      }));
    }
  }
    
  updateSlider() {
    this.valueSpan.textContent = this.value;

    this.thumb.style.left = `${this.valuePercents}%`;

    this.progress.style.width = `${this.valuePercents}%`;

    const spans = this.stepsContainer.querySelectorAll('span');
    spans.forEach((span, index) => {
      span.className = index === this.value ? 'slider__step-active' : '';
    });
  }

  onPointerDown() {
    this.elem.classList.add('slider_dragging');
    this.elem.style.zIndex = 9999;

    document.addEventListener('pointermove', this._pointerMove);
    document.addEventListener('pointerup', this._pointerUp);
  }

  onPointerMove(event) {
    const sliderRect = this.elem.getBoundingClientRect();

    let leftX = event.clientX - sliderRect.left;
    if (leftX < 0) leftX = 0;
    if (leftX > sliderRect.width) leftX = sliderRect.width;

    this.valuePercents = (leftX / sliderRect.width) * 100;

    this.thumb.style.left = `${this.valuePercents}%`;
    this.progress.style.width = `${this.valuePercents}%`;

    const approximateIndex = Math.round((this.valuePercents / 100) * (this.steps - 1));
    if (this.value !== approximateIndex) {
      this.value = approximateIndex;
    }

    this.updateSlider();

  }

  onPointerUp() {
    this.valueSpan.textContent = this.value;

    const percents = (this.value / (this.steps - 1)) * 100;

    this.thumb.style.left = `${percents}%`;
    this.progress.style.width = `${percents}%`;

    const spans = this.stepsContainer.querySelectorAll('span');
    spans.forEach((span, index) => {
      span.className = index === this.value ? 'slider__step-active' : '';
    });
    
    document.removeEventListener('pointermove', this._pointerMove);
    document.removeEventListener('pointerup', this._pointerUp);
    this.elem.classList.remove('slider_dragging');

    this.elem.dispatchEvent(new CustomEvent('slider-change', {
      detail: this.value,
      bubbles: true
    }));
  }
}