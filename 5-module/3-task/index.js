function initCarousel() {
  const carouselInner = document.querySelector('.carousel__inner');
  const carouselSlide = document.querySelectorAll('.carousel__slide');
  const allSlides = carouselSlide.length;
  const arrowLeft = document.querySelector('.carousel__arrow_left');
  const arrowRight = document.querySelector('.carousel__arrow_right');

  let slide = 0;
  const slideWidth = carouselInner.offsetWidth;

  function updateCarousel() {
    const widthNew = slide * ( -slideWidth );
    carouselInner.style.transform = `translateX(${widthNew}px)`;

    if (slide == 0) {
      arrowLeft.style.display = 'none';
    } 
    else if (slide == allSlides - 1) {
      arrowRight.style.display = 'none';
    } 
    else {
      arrowRight.style.display = '';
      arrowLeft.style.display = '';
    }
  }

  arrowRight.addEventListener('click', () => {
    if (slide < allSlides - 1) {
      slide++;
      updateCarousel();
    }
  });

  arrowLeft.addEventListener('click', () => {
    if (slide > 0) {
      slide--;
      updateCarousel();
    }
  });
  updateCarousel();

}
initCarousel();