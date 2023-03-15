export default class FetchApiService {
  constructor() {
    this._country = '';
  }

  fetchCountries() {
    const url = `https://restcountries.com/v3.1/name/${this._country}?fields=name,capital,population,flags,languages`;

    return fetch(url).then(response => response.json());
  }

  get country() {
    return this._country;
  }

  set country(newCountry) {
    this._country = newCountry;
  }
}
