import { fetchBreeds } from './cat-api';

import { fetchCatByBreed } from './cat-api';

import SlimSelect from 'slim-select';

import '/node_modules/slim-select/dist/slimselect.css';

import '/src/loader.css';

import Notiflix from 'notiflix';

import Notiflix from 'notiflix/dist/notiflix-aio-3.2.6.min.js';

Notiflix.Notify.init({
  width: '280px',
  position: 'right-top', // 'right-top' - 'right-bottom' - 'left-top' - 'left-bottom' - 'center-top' - 'center-bottom' - 'center-center'
  distance: '10px',
  opacity: 1,
  borderRadius: '5px',
  rtl: false,
  timeout: 3000,
  messageMaxLength: 110,
  backOverlay: false,
  backOverlayColor: 'rgba(0,0,0,0.5)',
  plainText: true,
  showOnlyTheLastOne: false,
  clickToClose: false,
  pauseOnHover: true,

  ID: 'NotiflixNotify',
  className: 'notiflix-notify',
  zindex: 4001,
  fontFamily: 'Quicksand',
  fontSize: '13px',
  cssAnimation: true,
  cssAnimationDuration: 400,
  cssAnimationStyle: 'fade', // 'fade' - 'zoom' - 'from-right' - 'from-top' - 'from-bottom' - 'from-left'
  closeButton: false,
  useIcon: true,
  useFontAwesome: false,
  fontAwesomeIconStyle: 'basic', // 'basic' - 'shadow'
  fontAwesomeIconSize: '34px',

  failure: {
    background: '#ff5549',
    textColor: '#fff',
    childClassName: 'notiflix-notify-failure',
    notiflixIconColor: 'rgba(0,0,0,0.2)',
    fontAwesomeClassName: 'fas fa-times-circle',
    fontAwesomeIconColor: 'rgba(0,0,0,0.2)',
    backOverlayColor: 'rgba(255,85,73,0.2)',
  },
});

const select = document.querySelector('.breed-select');
const div = document.querySelector('.cat-info');

const loader = document.querySelector('.loader');
const errorMessage = document.querySelector('.error');

loader.addEventListener('click', onLoaderVisible);

loader.style.display = 'none';
errorMessage.style.display = 'none';
div.style.width = '450px';

fetchBreeds()
  .then(function (data) {
    select.insertAdjacentHTML('beforeend', createMarkup(data));

    new SlimSelect({
      select: '.breed-select',
    });
  })
  .catch(function () {
    select.style.display = 'none';
    loader.style.display = 'none';
    div.style.display = 'none';
    Notiflix.Notify.failure(
      'Oops! Something went wrong! Try reloading the page!'
    );
  });

function createMarkup(arr) {
  return arr
    .map(({ id, name }) => `<option value="${id}">${name}</option>`)
    .join('');
}

select.addEventListener('change', () => {
  const selectedCat = select.value;
  ClearPage();
  onLoaderVisible();
  fetchCatByBreed(selectedCat)
    .then(function (info) {
      div.insertAdjacentHTML('beforeend', createMarkupCat(info));
      onLoaderHidden();
    })
    .catch(function () {
      select.style.display = 'none';
      loader.style.display = 'none';
      div.style.display = 'none';
      Notiflix.Notify.failure(
        'Oops! Something went wrong! Try reloading the page!'
      );
    });
});

function createMarkupCat(data) {
  const cat = data[0].breeds[0];

  const { name, description, temperament } = cat;

  return `
  <img src="${data[0].url}" alt="${name}" width="450">
  <h2>${name}</h2>
  <p>${description}</p>
  <p>Temperament: ${temperament}</p>
  `;
}

function onLoaderVisible() {
  select.style.display = 'none';
  loader.style.display = 'block';
  loader.textContent = '';
  div.style.display = 'none';
}

function onLoaderHidden() {
  loader.style.display = 'none';
  div.style.display = 'block';
}

function ClearPage() {
  div.innerHTML = '';
}
