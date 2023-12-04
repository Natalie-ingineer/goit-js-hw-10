import axios from 'axios';

import SlimSelect from 'slim-select';

import '/node_modules/slim-select/dist/slimselect.css';

import '/node_modules/slim-select/dist/slimselect.min.js';

axios.defaults.headers.common['x-api-key'] =
  'live_QnYFBW48Rw6I7bGfsFA1QTbYdWtKQKT86j8h8KpF4TCTSz8rp4W4DFTADxItBVig';

const BASE_URL = 'https://api.thecatapi.com/v1/';
const END_POINTS = 'breeds';

const KEY =
  'live_QnYFBW48Rw6I7bGfsFA1QTbYdWtKQKT86j8h8KpF4TCTSz8rp4W4DFTADxItBVig';

const page = 1;

export function fetchBreeds() {
  return fetch(`${BASE_URL}${END_POINTS}?api_key=${KEY}`).then(responce => {
    if (!responce.ok) {
      throw new Error(responce.statusText);
    }

    new SlimSelect({
      select: '#selectElement',
    });
    return responce.json();
    // page += 1;
  });
}

export function fetchCatByBreed(breedId) {
  const BASE_URL = 'https://api.thecatapi.com/v1/images/search';

  return fetch(
    `${BASE_URL}?api_key=${KEY}&breed_ids=${breedId}&page=${page}`
  ).then(responce => {
    if (!responce.ok) {
      throw new Error(responce.statusText);
    }
    return responce.json();
  });
}
