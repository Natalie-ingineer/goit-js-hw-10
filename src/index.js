import { fetchBreeds } from './cat-api';

import { fetchCatByBreed } from './cat-api';

const select = document.querySelector('.breed-select');

import SlimSelect from 'slim-select';

import '/node_modules/slim-select/dist/slimselect.css';

import '/src/loader.css';

const div = document.querySelector('.cat-info');

const loader = document.querySelector('.loader');
const errorMessage = document.querySelector('.error');

loader.addEventListener('click', onLoaderVisible);

loader.style.display = 'none';
errorMessage.style.display = 'none';

fetchBreeds()
  .then(function (data) {
    select.insertAdjacentHTML('beforeend', createMarkup(data));

    new SlimSelect({
      select: '.breed-select',
    });
  })
  .catch(err => errorHandler());

function createMarkup(arr) {
  return arr
    .map(({ id, name }) => `<option value="${id}">${name}</option>`)
    .join('');
}

select.addEventListener('change', () => {
  onLoaderVisible();
  const selectedCat = select.value;
  ResetPage();
  ClearPage();
  fetchCatByBreed(selectedCat)
    .then(info => div.insertAdjacentHTML('beforeend', createMarkupCat(info)))
    .catch(err => console.log(err));
});

function createMarkupCat(data) {
  const cat = data[0].breeds[0];

  const { name, description, temperament } = cat;

  onLoaderHidden();
  return `
  <img src="${data[0].url}" alt="${name}" width="350">
  <h2>${name}</h2>
  <p>${description}</p>
  <p>${temperament}</p>
  `;
}

function onLoaderVisible() {
  select.style.display = 'none';
  loader.style.display = 'block';
  loader.textContent = '';
  div.style.display = 'none';
}

// console.log('hello');

function onLoaderHidden() {
  loader.style.display = 'none';
  // select.style.display = 'block';
  div.style.display = 'block';
}

function ResetPage() {
  page = 1;
}

function ClearPage() {
  div.innerHTML = '';
}

function errorHandler() {
  errorMessage.style.display = 'block';
  loader.style.display = 'none';
  select.style.display = 'none';
  div.style.display = 'none';
}
