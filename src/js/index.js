import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';
import Notiflix from 'notiflix';
import 'notiflix/dist/notiflix-3.2.6.min.css';
import { fetchBreeds, fetchCatByBreed } from './cat-api';

const catInfo = document.querySelector('.cat-info');
const breedSelect = document.querySelector('.breed-select');

Notiflix.Loading.standard('Loading...', {
  backgroundColor: 'rgba(0,0,0,0.8)',
});

window.onload = async () => {
  try {
    console.log('Window loaded');
    Notiflix.Loading.standard('Loading data, please wait...', {
      backgroundColor: 'rgba(0,0,0,0.8)',
    });

    const breeds = await fetchBreeds();

    Notiflix.Loading.remove();

    initializeBreedSelect(breeds);
  } catch (error) {
    Notiflix.Loading.remove();
    handleFetchError();
  }
};

function initializeBreedSelect(breeds) {
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
  console.log('SlimSelect data: ', select.data.getData());
}

async function displayCatInfo(breedId) {
  try {
    console.log('About to fetch cat by breed');
    console.log('displayCatInfo', breedId);
    Notiflix.Loading.standard('Loading data, please wait...', {
      backgroundColor: 'rgba(0,0,0,0.8)',
    });

    const cat = await fetchCatByBreed(breedId);

    Notiflix.Loading.remove();

    catInfo.innerHTML = `
      <img src="${cat.url}" alt="${cat.breeds[0].name}">
      <div class="description">
          <h2>${cat.breeds[0].name}</h2>
          <p>${cat.breeds[0].description}</p>
          <p>${cat.breeds[0].temperament}</p>
      </div>
    `;

    console.log(catInfo);
  } catch (error) {
    console.log(error.response);
    Notiflix.Loading.remove();
    handleFetchError();
  }
}

function handleFetchError() {
  Notiflix.Notify.failure(
    'Oops! Something went wrong! Try reloading the page!'
  );
}
