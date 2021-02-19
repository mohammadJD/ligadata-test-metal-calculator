const siteUrl = 'https://metals-api.com';
const apiUrl = siteUrl+ '/api';
const accessKey ='5x1vfbfh5l6n87mz9d8yk5rr133y3v4ogf8q78x4j06a225gbuabvp3ifblk';
// const accessKey ='';
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
