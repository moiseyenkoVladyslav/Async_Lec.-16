'use strict';
const countriesContainer = document.querySelector('.countries');
const btn = document.querySelector('.btn-country');

const renderCountry = function (data, clasName = ``) {
  const html = `<article class="country ${clasName}">
  <img class="country__img" src="${data.flag}" />
  <div class="country__data">
    <h3 class="country__name">${data.name}</h3>
    <h4 class="country__region">${data.region}</h4>
    <p class="country__row"><span>👫</span>${(
      +data.population / 1000000
    ).toFixed(1)}</p>
    <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
    <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
  </div>
</article>`;
  countriesContainer.insertAdjacentHTML(`beforeend`, html);
  //Good usecase to put below line into - .finally() Method
  // countriesContainer.style.opacity = 1;
};

const whereAmI = function (lat, lng) {
  const request = fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);

  // const request2 = fetch(`https://restcountries.com/v2/name/portugal`);
  // console.log(request, request2);

  request
    .then(response => {
      console.log(response);
      if (!response.ok) throw new Error(`${errorMsg} (${response.status})`);
      return response.json();
    })
    .then(data => {
      console.log(data);
      console.log(`You are in ${data.city}, ${data.country}.`);
      console.log(data.country);
      const requestApiGeo2 = fetch(
        `https://restcountries.com/v2/name/${data.country}`
      );
      console.log(requestApiGeo2);
      return requestApiGeo2;
    })
    .then(dataCountry => {
      return dataCountry.json();
    })
    .then(dataCountryRender => {
      console.log(dataCountryRender[0]);
      renderCountry(dataCountryRender[0]);
    })
    .catch(err => {
      console.log(`${err} 🔥🔥🔥`);
      renderError(`Something went wrong! ${err.message}`);
    })
    .finally(() => {
      countriesContainer.style.opacity = 1;
    });

  // .catch(error => {
  //   console.log(`${error}`);
  // })

  // request.then(response=>{
  //   if (response.status != 200) {
  //     throw new Error(`Somethng goes wrong`);
  //   }
  //   return response.json();
  // }).then(data =>{
  //    console.log(data.country);

  //  })
  //  console.log(countryWhereIAm);
  //   // const requestGeoLocApi ;
  //   return countryWhereIAm;
};
//Test Data :
//§ Coordinates 1: 52.508, 13.381
//Coordinates 2: 19.037, 72.873
//Coordinates 3: -33.933, 18.474
whereAmI(52.508, 13.381);
whereAmI(19.037, 72.873);
whereAmI(-33.933, 18.474);
