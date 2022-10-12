import './css/styles.css';
var debounce = require('lodash.debounce');
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import API from './fetchCountries';
import * as classes from './sass/index.scss';

import infoCountryTpl from './templates/country.hbs';

const DEBOUNCE_DELAY = 300;

const refs = {
  input: document.querySelector('#search-box'),
  list: document.querySelector('.country-list'),
  info: document.querySelector('.country-info'),
};

refs.input.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY));

function onSearch(event) {
  const searchCountry = event.target.value.trim();

  API.fetchCountries(searchCountry)
    .then(data => {

      if (searchCountry == '') {
        clearData();
        return;
      }

      if (data.length > 10) {
        clearData();
        Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
        return;
      }

      if (data.length > 1 && data.length <= 10) {
        renderListCountries(data);
        return;
      }

      renderInfoOfCountry(data);
    })
    .catch(onFetchError);
}

function renderListCountries(countries) {
  clearData();

  let countryList = countries
    .map(country => {
      return `<li class="country-list__item">
        <img class="country-list__img" src="${country.flags.svg}" alt="${country.name.common}" width="30">
        <p class="country-list__title">${country.name.common}</p>
      </li>`;
    })
    .join('');

  refs.list.insertAdjacentHTML('afterbegin', countryList);
}

function renderInfoOfCountry(country) {
  clearData();

  const img = country[0].flags.svg;
  const name = country[0].name.common;
  const capital = country[0].capital.toString();
  const population = country[0].population;
  const languages = Object.values(country[0].languages);

  const countryInfo = {
    img,
    name,
    capital,
    population,
    languages,
  };

  const info = infoCountryTpl(countryInfo);
  refs.info.insertAdjacentHTML('afterbegin', info);
}

function onFetchError() {
  Notify.failure('Oops, there is no country with that name');
}

function clearData() {
  refs.info.innerHTML = '';
  refs.list.innerHTML = '';
}