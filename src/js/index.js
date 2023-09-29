import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';
import Notiflix from 'notiflix';
import 'notiflix/dist/notiflix-3.2.6.min.css';
import { fetchBreeds, fetchCatByBreed } from './cat-api';

document.addEventListener('DOMContentLoaded', async () => {
  console.log('Document loaded');

  try {
    const breeds = await fetchBreeds();

    const breedSelect = document.querySelector('.breed-select');
    let select;

    select = new SlimSelect({
      select: breedSelect,
      data: breeds.map(breed => ({
        text: breed.name,
        value: breed.id,
      })),
    });

    breedSelect.addEventListener('change', event => {
      console.log('onChange event', event);
      console.log('onChange event - selected value', event.target.value);
      displayCatInfo(event.target.value);
    });

    console.log('SlimSelect initialized: ', select);
  } catch (error) {
    Notiflix.Notify.failure(
      'Oops! Something went wrong! Try reloading the page!'
    );
  }

  function displayCatInfo(breedId) {
    console.log('About to fetch cat by breed');
    console.log('displayCatInfo', breedId);

    Notiflix.Loading.hourglass('Loading data, please wait...');

    fetchCatByBreed(breedId)
      .then(cat => {
        console.log('Fetched cat info', cat);
        Notiflix.Loading.remove();
        const catInfo = document.querySelector('.cat-info');
        catInfo.innerHTML = `
          <img src="${cat.url}" alt="${cat.breeds[0].name}">
          <div class="description">
            <h2>${cat.breeds[0].name}</h2>
            <p>${cat.breeds[0].description}</p>
            <p>${cat.breeds[0].temperament}</p>
          </div>
        `;
        console.log(catInfo);
      })
      .catch(error => {
        console.error('fetchCatByBreed error', error.response);
        Notiflix.Loading.remove();
        Notiflix.Notify.failure(
          'Oops! Something went wrong! Try reloading the page!'
        );
      });
  }
});
