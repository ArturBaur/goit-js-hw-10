'use strict';
console.log('Starting script');

import Notiflix from 'notiflix';
import 'notiflix/dist/notiflix-3.2.6.min.css';
import axios from 'axios';

axios.defaults.headers.common['x-api-key'] =
  'live_BTZZIdRHYd6aMz2TQTqV9qlighgFZHzfYMJoTkkRJXL5XjXtEIJ6n43IFfrYdhNs';

async function fetchBreeds() {
  try {
    console.log('fetchBreeds called');
    const response = await axios.get('https://api.thecatapi.com/v1/breeds');
    console.log('axios get completed', response.data);
    return response.data;
  } catch (error) {
    console.log('fetchBreeds error', error.response);
    Notiflix.Notify.failure(
      'Oops! Something went wrong! Try reloading the page!'
    );
    throw error;
  }
}

async function fetchCatByBreed(breedId) {
  try {
    console.log('displayCatInfo', breedId);
    console.log(`Fetching cat for breed: ${breedId}`);
    const response = await axios.get(
      `https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`
    );
    return response.data[0];
  } catch (error) {
    console.error('fetchCatByBreed error', error.response);
    Notiflix.Notify.failure(
      'Oops! Something went wrong! Try reloading the page!'
    );
    throw error;
  }
}

export { fetchBreeds, fetchCatByBreed };
