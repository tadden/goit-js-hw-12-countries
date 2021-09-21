import './sass/main.scss';
import API from './js/fetchCountries';
import getRefs from './js/get-refs';
import countryCard from './templates/country-card.hbs';
import countryList from './templates/country-list.hbs';

const refs = getRefs();


function renderCountryCard(country) {
    const markupCard = countryCard(country)
    refs.cardContainer.insertAdjacentHTML('afterbegin', markupCard);
}

function renderCountryList (country) {
    const markupList = countryList(country);
    refs.cardContainer.insertAdjacentHTML('afterbegin', markupList)
}


refs.searchForm.addEventListener('input', onInputChange)


function onInputChange(e) {
    const searchQuery = e.target.value;

    API.getfetchCountries(searchQuery).then(renderCountryCard)
}


