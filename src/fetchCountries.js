const BASE_URL = 'https://restcountries.com/v3.1';
const OPTIONSEARCH = 'fields=name,capital,population,flags,languages';

function fetchCountries(countries) {
  return fetch(`${BASE_URL}/name/${countries}?${OPTIONSEARCH}`).then(response =>
    response.json()
  );
}

export default { fetchCountries };
