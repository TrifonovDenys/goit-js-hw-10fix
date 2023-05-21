export default function fetchCountries(name) {
  const BASE_URL = 'https://restcountries.com/v3.1';

  return fetch(`${BASE_URL}/name/${name}?fields=flags,name,capital,population,languages`)
    .then(response => {
      if (!response.ok) {
        throw new Error(response.statusText)
      }
      return response.json()
    })
}