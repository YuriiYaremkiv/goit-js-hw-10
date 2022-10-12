import './css/styles.css';
var debounce = require('lodash.debounce');
import { Notify } from 'notiflix/build/notiflix-notify-aio';



const DEBOUNCE_DELAY = 300;

const refs = {
  input: document.querySelector('#search-box'),
  list: document.querySelector('.country-list'),
  info: document.querySelector('.country-info'),
}

refs.input.addEventListener('input', debounce(dfdfdf, DEBOUNCE_DELAY));


function fetchCountry(country) {
  return fetch(`https://restcountries.com/v3.1/name/${country}?fields=name,capital,population,flags,languages`).then(response => response.json());
}

// name.official - полное имя страны
// capital - столица
// population - население
// flags.svg - ссылка на изображение флага
// languages - массив языков

// https://restcountries.com/v2/all?fields=name,capital,currencies







function dfdfdf(event) {
  const country = event.target.value;
  
  refs.list.innerHTML = '';

  const countryes = fetchCountry(country).then((data) => {
    console.log(data)


    if (data.length > 10) {
    Notify.info('Too many matches found. Please enter a more specific name.');
    }



    if (data.length != 1) {
      renderingCountry(data);
    } else {
      rendering(data);
    }



  }).catch(console.log('Country not foundet'));

  if (countryes.length > 10) {
    Notify.info('Too many matches found. Please enter a more specific name.');
  }



}


function renderingCountry(countries) {
  console.log(countries);

  refs.list.innerHTML = '';

  let element = '';

  for (const country of countries) {
     element += `<li><img src="${country.flags.svg}" width="30" height="30">${country.name.common}</li>`;
  }

  
  console.log(element);



  refs.list.insertAdjacentHTML('afterbegin', element);

    
}



// Notify.success('Sol lucet omnibus');

// Notify.failure('Oops, there is no country with that name');


function rendering(country) {
  refs.info.innerHTML = '';
  const info = 
  `<ul>
    <li><img src="${country[0].flags.svg}" width="30" height="30">${country[0].name.common}</li>
    <li>Capital: ${country[0].capital.toString()}</li>
    <li>Population: ${country[0].population}</li>
    <li>Languages: ${Object.values(country[0].languages)}</li>
  </ul>`




  refs.info.insertAdjacentHTML('afterbegin', info);
}





const con = [
    {
        "flags": {
            "png": "https://flagcdn.com/w320/pl.png",
            "svg": "https://flagcdn.com/pl.svg"
        },
        "name": {
            "common": "Poland",
            "official": "Republic of Poland",
            "nativeName": {
                "pol": {
                    "official": "Rzeczpospolita Polska",
                    "common": "Polska"
                }
            }
        },
        "capital": [
            "Warsaw"
        ],
        "languages": {
            "pol": "Polish"
        },
        "population": 37950802
    }
]


console.log(con[0].capital.toString());