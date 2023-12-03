import { fetchBreeds } from './cat-api';

import { fetchCatByBreed } from './cat-api';

const select = document.querySelector('.breed-select');
const div = document.querySelector('.cat-info');

const loader = document.querySelector('.loader');
const errorMessage = document.querySelector('.error');

loader.addEventListener('click', onLoaderVisible);

loader.style.display = 'none';
errorMessage.style.display = 'none';

fetchBreeds()
  .then(data => select.insertAdjacentHTML('beforeend', createMarkup(data)))
  .catch(err => console.log(err));

function createMarkup(arr) {
  return arr
    .map(({ id, name }) => `<option value="${id}">${name}</option>`)
    .join('');
}

select.addEventListener('change', () => {
  onLoaderVisible();
  const selectedCat = select.value;
  fetchCatByBreed(selectedCat)
    .then(info => div.insertAdjacentHTML('beforeend', createMarkupCat(info)))
    .catch(err => console.log(err));
});

function createMarkupCat(data) {
  const cat = data[0].breeds[0];

  const { name, description, temperament } = cat;

  onLoaderHidden();
  return `
  <img src="${data[0].url}" alt="${name}" weight="350">
  <h2>${name}</h2>
  <p>${description}</p>
  <p>${temperament}</p>
  `;
}

function onLoaderVisible() {
  select.style.display = 'none';
  loader.style.display = 'block';
  div.style.display = 'none';
}

console.log('hello');

function onLoaderHidden() {
  loader.style.display = 'none';
  select.style.display = 'block';
  div.style.display = 'block';
}
