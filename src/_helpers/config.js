const siteUrl = 'https://metals-api.com';
const apiUrl = siteUrl+ '/api';
const accessKey ='7w2vft1sxd4n49ewyrtx17ek9448617f6t7te6gwcolmm0cc0ywn34kmc5ou';
const currencies = ['USD','EUR','GBP','AUD','JPY'];
const metals = [
    {
       name:'Gold',
       value:'XAU'
    },
    {
        name:'Silver',
        value:'XAG'
    },
    {
        name:'Platinum',
        value:'XPT'
    },
    {
        name:'Palladium',
        value:'XPD'
    },
    {
        name:'Rhenium',
        value:'XRH'
    }
];

export const config = {
    siteUrl,
    apiUrl,
    accessKey,
    currencies,
    metals
};
