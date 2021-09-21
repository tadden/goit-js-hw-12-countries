import './sass/main.scss';
import API from './js/fetchCountries';
import getRefs from './js/get-refs';
import countryCard from './templates/country-card.hbs';
import countryList from './templates/country-list.hbs';




import debounce from 'lodash.debounce';
import"@pnotify/core/dist/PNotify.css";
import"@pnotify/core/dist/BrightTheme.css";
import { error, info, defaultStack, defaultModules } from '@pnotify/core/dist/PNotify.js';
import * as PNotifyMobile from '@pnotify/mobile/dist/PNotifyMobile.js';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/mobile/dist/PNotifyMobile.css';
import { delay } from 'lodash';

defaultModules.set(PNotifyMobile, {});

const refs = getRefs();


refs.searchForm.addEventListener('input', debounce(onInputChange, 500))


function renderCountryCard(country) {
    const markupCard = countryCard(country)
    refs.cardContainer.insertAdjacentHTML('afterbegin', markupCard);
}

function renderCountryList (country) {
    const markupList = countryList(country);
    refs.cardContainer.insertAdjacentHTML('afterbegin', markupList)
}


function onInputChange(e) {
    const searchQuery = e.target.value;
    API.getfetchCountries(searchQuery).then(renderCountryCard)
}


