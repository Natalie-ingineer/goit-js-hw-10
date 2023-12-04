import axios from 'axios';

import SlimSelect from 'slim-select';

import '/node_modules/slim-select/dist/slimselect.css';

import '/node_modules/slim-select/dist/slimselect.min.js';

axios.defaults.headers.common['x-api-key'] =
  'live_QnYFBW48Rw6I7bGfsFA1QTbYdWtKQKT86j8h8KpF4TCTSz8rp4W4DFTADxItBVig';

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

const BASE_URL = 'https://api.thecatapi.com/v1/';
const END_POINTS = 'breeds';

const KEY =
  'live_QnYFBW48Rw6I7bGfsFA1QTbYdWtKQKT86j8h8KpF4TCTSz8rp4W4DFTADxItBVig';

export function fetchBreeds() {
  return fetch(`${BASE_URL}${END_POINTS}?api_key=${KEY}`).then(responce => {
    if (!responce.ok) {
      throw new Error(responce.statusText);
    }

    new SlimSelect({
      select: '#selectElement',
    });
    return responce.json();
  });
}

export function fetchCatByBreed(breedId) {
  const BASE_URL = 'https://api.thecatapi.com/v1/images/search';

  return fetch(`${BASE_URL}?api_key=${KEY}&breed_ids=${breedId}`).then(
    responce => {
      if (!responce.ok) {
        throw new Error(responce.statusText);
      }
      return responce.json();
    }
  );
}
