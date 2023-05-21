import './css/styles.css';
import Notiflix from 'notiflix';
var debounce = require('lodash.debounce');
const DEBOUNCE_DELAY = 300;

function fetchCountries(name) {
  const BASE_URL = 'https://restcountries.com/v3.1';

  return fetch(`${BASE_URL}/name/${name}?fields=flags,name,capital,population,languages`)
    .then(response => {
      if (!response.ok) {
        throw new Error(response.statusText)
      }
      return response.json()
    })
}

const list = document.querySelector('.country-list')
const div = document.querySelector('.country-info')
const search = document.querySelector('#search-box');
search.addEventListener('input', debounce(onSerch, DEBOUNCE_DELAY))


function onSerch() {
  div.innerHTML = ''
  list.innerHTML= ''
  fetchCountries(search.value).then(data => {
    console.log(data);
    if (data.length <= 1) {
      div.insertAdjacentHTML("beforeend", createMarkupDiv(data))     
    } else if(data.length > 1 && data.length < 10) {
      list.insertAdjacentHTML("beforeend", createMarkupList(data))
    } else {
      Notiflix.Notify.info("Too many matches found. Please enter a more specific name.")
    }
  
  }).catch(err => {
    Notiflix.Notify.failure("Oops, there is no country with that name")
    console.log(err);
  })
}


function createMarkupDiv(arr) {

  return arr.map(({ flags: { svg, alt }, name: { common }, capital, population, languages }) => {
    const arr = []
    for (let key in languages) {
      arr.push(languages[key])
    }
    const line = arr.join(', ')
    let lang = ''
    if (arr.length === 1) {
      lang = 'language'
    } else if (arr.length > 1) {
      lang = 'languages'
    }
   return `<img class="single-img" src="${svg}" alt="${alt}"><h2>${common}</h2><h3>Capital: ${capital}</h3><p>population: ${population}</p><p>${lang}: ${line}</p>`
  }).join(' ')
}


function createMarkupList(arr) {
  return arr.map(({ flags: { svg, alt }, name: {common} }) => {
    return `<li class="list-item"><img class="list-img" src="${svg}" alt="${alt}"><p>${common}</p></li>`
  }).join(' ')
  
}

