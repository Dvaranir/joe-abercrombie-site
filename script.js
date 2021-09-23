'use-strict';

window.onbeforunload = function () {
  window.scrollTo(0, 0);
};

const catchWord =
  'If life has taught me one thing, it’s that there are no villains. Only people, doing their best.';
const nameOfAuthor = 'Joe Abercrombie';

const textShowSpeed = 5000;
const authorSignShowDelay = 1000;

// All Selected Items
const header = document.querySelector('#header');
const goTopBtnAnchor = document.querySelector('.go--top');
const goTopBtn = document.querySelector('.go--top__btn');
const introSection = document.querySelector('.section--introduction');
const allSections = document.querySelectorAll('section');
const allHiddenSections = document.querySelectorAll(
  '.section--move--down__hide'
);
const booksSection = document.querySelector('#sectionBooks');
const navPanel = document.querySelector('.nav--panel');
const introductionQuote = document.querySelector('.introduction--quote');
const authorSign = document.querySelector('.abercrombie--ref');
const carouselElements = document.querySelectorAll('.book--card');
const sliderRightArrow = document.querySelector('.slider--right__arrow');
const sliderLeftArrow = document.querySelector('.slider--left__arrow');

// Smooth scrolling to sections
const scrollToSection = function (btn, section) {
  btn.addEventListener('click', function (e) {
    e.preventDefault();
    section.scrollIntoView({ behavior: 'smooth', block: 'center' });
  });
};

// Main image appearing text function
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

// Combined appearing text function and settimeout to animate text appearing, also adding additional delay to author sign appearing
const displayMainImageText = function () {
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

// Adding event to Nav buttons from there's parent
navPanel.addEventListener('click', function (e) {
  e.preventDefault();
  if (!e.target.classList.contains('nav--btn')) return;
  const id = e.target.getAttribute('href');
  document
    .querySelector(id)
    .scrollIntoView({ behavior: 'smooth', block: 'center' });
});

// Showing lift-arrow button which smooth scrolling to nav when clicked
const showLLiftButton = function (entries) {
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

// Animating appearing of sections on scroll
const showHiddenSection = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;

  entry.target.classList.remove('section--move--down__hide');
  observer.unobserve(entry.target);
};

const hiddenElementObserver = new IntersectionObserver(showHiddenSection, {
  root: null,
  threshold: [0],
  rootMargin: '-250px',
});

allSections.forEach(section => {
  hiddenElementObserver.observe(section);
});

// Variables for slider
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

const removeClassFromElements = function (elements, cls) {
  [...elements].forEach(element => {
    element.classList.remove(cls);
  });
};

// Removing class that hides elements on specific window width
const removeClassOnWindowWidth = function (windowWidth, elements, cls) {
  if (window.innerWidth > windowWidth) return;
  removeClassFromElements(elements, cls);
};

// Scroll top on reload
window.onbeforeunload = function () {
  window.scrollTo(0, 0);
};

sliderRightArrow.addEventListener('click', nextSlide);
sliderLeftArrow.addEventListener('click', prevSlide);

carouselElements.forEach((el, i) => {
  el.style.transform = `translateX(${i * 120}%`;
});

scrollToSection(goTopBtnAnchor, header);
document.addEventListener('DOMContentLoaded', displayMainImageText);
removeClassOnWindowWidth(735, allHiddenSections, 'section--move--down__hide');
