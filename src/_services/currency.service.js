import { config } from '../_helpers';

export const currencyService = {
    setCurrency,
    // getCurrency
};

function setCurrency(val) {
    localStorage.setItem('currency',JSON.stringify(val));
}

// function getCurrency() {
//     let curr = localStorage.getItem('currency');
//     if(curr===null|| curr === undefined) localStorage.setItem('currency',JSON.stringify('USD'));
//     return localStorage.getItem('currency');
// }
