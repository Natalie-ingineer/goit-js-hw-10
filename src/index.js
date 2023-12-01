import axios from 'axios';

axios.defaults.headers.common['x-api-key'] =
  'live_QnYFBW48Rw6I7bGfsFA1QTbYdWtKQKT86j8h8KpF4TCTSz8rp4W4DFTADxItBVig';

const BASE_URL = 'https://api.thecatapi.com/v1/';
const END_POINTS = 'breeds';
const END_POINTS_Img = 'images/search';
const KEY =
  'live_QnYFBW48Rw6I7bGfsFA1QTbYdWtKQKT86j8h8KpF4TCTSz8rp4W4DFTADxItBVig';

// import { fetchBreeds } from './cat-api';
// fetchBreeds();
const select = document.querySelector('.breed-select');
const div = document.querySelector('.cat-info');
const loader = document.querySelector('.loader');
const errorMessage = document.querySelector('.error');

let breedId = '';

select.addEventListener('click', fetchBreeds);

select.addEventListener('submit', event => {
  console.log(event.currentTarget.elements);
});

loader.addEventListener('search', onLoader);

loader.style.display = 'none';
errorMessage.style.display = 'none';

function onLoader() {
  currentPage += 1;
  fetchBreeds(currentPage)
    .then(data => select.insertAdjacentHTML('beforeend', createMarkup(data)))
    .catch(err => console.log(err));
}

function fetchBreeds() {
  return fetch(`${BASE_URL}${END_POINTS}?api_key=${KEY}`).then(responce => {
    if (!responce.ok) {
      throw new Error(responce.statusText);
    }
    return responce.json();
  });
}
fetchBreeds()
  .then(data => select.insertAdjacentHTML('beforeend', createMarkup(data)))
  .catch(err => console.log(err));

function createMarkup(arr) {
  return arr
    .map(({ id, name }) => `<option value="${id}">${name}</option>`)
    .join('');
}

// function onHandlerSearch(e) {
//   e.preventDefault();
//   let search = e.currentTarget.elements;
//   console.log(search.value);
// }

// function fetchCatByBreed(breedId) {
//   breedId = currentTarget.elements.value;
//   return fetch(`${BASE_URL}${END_POINTS_Img}?breed_ids=${breedId}`).then(
//     responce => {
//       if (!responce.ok) {
//         throw new Error(responce.statusText);
//       }
//       return responce.json();
//     }
//   );
// }
// fetchCatByBreed()
//   .then(data => console.log(data))
//   .catch(err => console.log(err));
