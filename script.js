'use-strict';

window.onbeforunload = function () {
  window.scrollTo(0, 0);
};

const catchWord =
  'If life has taught me one thing, it’s that there are no villains. Only people, doing their best.';
const nameOfAuthor = 'Joe Abercrombie';

const textShowSpeed = 5000;
const authorSignShowDelay = 1000;

const header = document.querySelector('#header');
const goTopBtnAnchor = document.querySelector('.go--top');
const goTopBtn = document.querySelector('.go--top__btn');
const introSection = document.querySelector('.section--introduction');
const allSections = document.querySelectorAll('section');
const booksSection = document.querySelector('#sectionBooks');
const navPanel = document.querySelector('.nav--panel');
const introductionQuote = document.querySelector('.introduction--quote');
const authorSign = document.querySelector('.abercrombie--ref');
const carouselElements = document.querySelectorAll('.book--card');
const sliderRightArrow = document.querySelector('.slider--right__arrow');
const sliderLeftArrow = document.querySelector('.slider--left__arrow');

const scrollToSection = function (btn, section) {
  btn.addEventListener('click', function (e) {
    e.preventDefault();
    section.scrollIntoView({ behavior: 'smooth', block: 'center' });
  });
};

const addTextAndShowItWithDelay = function (
  insertEl,
  targetEl,
  delay = 0,
  customClass = 'strong'
) {
  [...insertEl].map(function (letter, i) {
    const id = `${customClass}--${i + 1}`;

    targetEl.insertAdjacentHTML(
      'beforeEnd',
      `<strong class='hide--element ${customClass} ${id}'>${letter}</strong>`
    );
    setTimeout(function () {
      const letter = document.querySelector(`.${id}`);
      letter.classList.remove('hide--element');
    }, i * delay);
  });
};

const displayMainImageTextText = function () {
  addTextAndShowItWithDelay(
    catchWord,
    introductionQuote,
    textShowSpeed / catchWord.length,
    'catchWord'
  );
  setTimeout(function () {
    addTextAndShowItWithDelay(nameOfAuthor, authorSign, 50, 'abercrombie--ref');
  }, textShowSpeed + authorSignShowDelay);
};

navPanel.addEventListener('click', function (e) {
  e.preventDefault();
  if (!e.target.classList.contains('nav--btn')) return;
  const id = e.target.getAttribute('href');
  document
    .querySelector(id)
    .scrollIntoView({ behavior: 'smooth', block: 'center' });
});

const showLLiftButton = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) {
    goTopBtn.classList.remove('move--down__hide');
  } else {
    goTopBtn.classList.add('move--down__hide');
  }
};

const introSectionObserver = new IntersectionObserver(showLLiftButton, {
  root: null,
  threshold: [0],
});

introSectionObserver.observe(introSection);

const showHiddenSection = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;

  entry.target.classList.remove('section--move--down__hide');
  observer.unobserve(entry.target);
};

const hiddenElementObserver = new IntersectionObserver(showHiddenSection, {
  root: null,
  threshold: [0],
  rootMargin: '-150px',
});

allSections.forEach(section => {
  hiddenElementObserver.observe(section);
});

let curSlide = 0;
let maxSlides = carouselElements.length - 1;

const goToSlide = function (slide) {
  carouselElements.forEach(
    (s, i) => (s.style.transform = `translateX(${120 * (i - slide)}%)`)
  );
};

const nextSlide = function () {
  if (curSlide === maxSlides) {
    curSlide = 0;
  } else curSlide++;

  goToSlide(curSlide);
};

const prevSlide = function () {
  if (curSlide === 0) {
    curSlide = maxSlides;
  } else curSlide--;

  goToSlide(curSlide);
};

sliderRightArrow.addEventListener('click', nextSlide);
sliderLeftArrow.addEventListener('click', prevSlide);

carouselElements.forEach((el, i) => {
  el.style.transform = `translateX(${i * 120}%`;
});

scrollToSection(goTopBtnAnchor, header);
document.addEventListener('DOMContentLoaded', displayMainImageTextText);
