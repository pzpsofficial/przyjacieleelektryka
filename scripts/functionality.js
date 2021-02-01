const burger = document.querySelector('.header__burger');
const nav = document.querySelector('.header__nav');

nav.addEventListener('click', (e) => {
  const el = e.target;
  if (el.classList.contains('header__nav__a')) {
    setTimeout(() => {
      nav.classList.remove('active');
    }, 700);
  }
});

burger.addEventListener('click', (e) => {
  nav.classList.toggle('active');
});

const copy = document.querySelector('#copy');
const number = document.querySelector('#bank-number');

copy.addEventListener('click', (e) => {
  window.navigator.clipboard.writeText(number.textContent);
  copy.style.color = '#212121';
});
