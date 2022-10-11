import './css/styles.css';

const DEBOUNCE_DELAY = 300;

function fetchCountry(country) {
  return fetch(`https://restcountries.com/v3.1/name/${country}`).then(response => response.json());
}

fetchCountry('poland').then(data => data.country);