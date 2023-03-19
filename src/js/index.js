import FetchApiService from './fetchCountries';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import listOfCountries from '../templates/listOfCountries.hbs';
import countryData from '../templates/countryData.hbs';

const DEBOUNCE_DELAY = 300;
const fetchApiService = new FetchApiService();
const refs = {
  inputEl: document.querySelector('[id="search-box"]'),
  containerEl: document.querySelector('.country-info'),
  listOfCountriesEl: document.querySelector('.country-list'),
};
Notiflix.Notify.init({ position: 'center-top' });

refs.inputEl.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));

function onInput(e) {
  const country = e.target.value.trim();

  if (!country) {
    resetOutput();
    return;
  }

  fetchApiService.country = country;
  fetchApiService.fetchCountries().then(onSuccess).catch(onError);
}

function onSuccess(res) {
  resetOutput();

  if (res.status === 404) {
    throw new Error();
  } else if (res.length > 10) {
    Notiflix.Notify.info(
      'Too many matches found. Please enter a more specific name.'
    );
  } else if (res.length >= 2 && res.length < 10) {
    refs.listOfCountriesEl.innerHTML = listOfCountries(res);
  } else {
    refs.containerEl.innerHTML = countryData(res[0]);
  }
}

function onError() {
  resetOutput();
  Notiflix.Notify.failure('Oops, there is no country with that name');
}

function resetOutput() {
  refs.listOfCountriesEl.innerHTML = '';
  refs.containerEl.innerHTML = '';
}
