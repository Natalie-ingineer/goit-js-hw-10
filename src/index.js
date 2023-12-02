import { fetchBreeds } from './cat-api';

import { fetchCatByBreed } from './cat-api';

const select = document.querySelector('.breed-select');
const div = document.querySelector('.cat-info');

const loader = document.querySelector('.loader');
const errorMessage = document.querySelector('.error');

fetchBreeds()
  .then(data => select.insertAdjacentHTML('beforeend', createMarkup(data)))
  .catch(err => console.log(err));

function createMarkup(arr) {
  return arr
    .map(({ id, name }) => `<option value="${id}">${name}</option>`)
    .join('');
}

// loader.addEventListener('click', onLoader);

// loader.style.display = 'none';
// errorMessage.style.display = 'none';

select.addEventListener('change', () => {
  const selectedCat = select.value;
  fetchCatByBreed(selectedCat)
    .then(info => div.insertAdjacentHTML('beforeend', createMarkupCat(info)))
    .catch(err => console.log(err));
});

function createMarkupCat(data) {
  const cat = data[0].breeds[0]; // Тут може знадобитися адаптація залежно від формату відповіді API

  if (!cat) {
    return 'Немає даних про кота'; // або інше повідомлення про відсутність даних
  }

  const { name, description, temperament } = cat;

  return `
    <img src="${data[0].url}" alt="${name}" weight="350">
    <h2>${name}</h2>
    <p>${description}</p>
    <p>${temperament}</p>
  `;
}

// function onLoader() {
//   currentPage += 1;
//   fetchBreeds(currentPage)
//     .then(data => select.insertAdjacentHTML('beforeend', createMarkup(data)))
//     .catch(err => console.log(err));
// }
