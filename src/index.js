import './sass/main.scss';
import API from './js/fetchCountries';
import getRefs from './js/get-refs';
import countryCard from './templates/country-card.hbs';
import countryList from './templates/country-list.hbs';

import debounce from 'lodash.debounce';

import"@pnotify/core/dist/PNotify.css";
import"@pnotify/core/dist/BrightTheme.css";
import { error, alert, defaultStack, defaultModules } from '@pnotify/core/dist/PNotify.js';
import * as PNotifyMobile from '@pnotify/mobile/dist/PNotifyMobile.js';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/mobile/dist/PNotifyMobile.css';


defaultModules.set(PNotifyMobile, {});

const refs = getRefs();



refs.searchForm.addEventListener('input', debounce(onSearch, 500))


function onSearch(e) {
    const searchQuery = e.target.value;
    API.getfetchCountries(searchQuery).then(rendering).catch(onFetchError)
}

function rendering(country) {
    if (country.status === 404) {
        refs.cardContainer.innerHTML = '';
        alert({ text: 'Check the correctness of the data entered, this country does not exist!' })
        return
    }
    else if (country.length > 10) {
        refs.cardContainer.innerHTML = ''
        error({ text: 'Too many matches found. Please enter a more specific query!' })
        return
    }
        
    else if (country.length > 1) {
        refs.cardContainer.innerHTML = countryList(country)
        return
    }
    refs.cardContainer.innerHTML = countryCard(country)
}

function onFetchError(err) {
  refs.cardContainer.innerHTML = ''
  alert({ text: 'Check the correctness of the data entered!' })
}
