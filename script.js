'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

const renderError = function (msg) {
  countriesContainer.insertAdjacentText(`beforeend`, msg);
  // countriesContainer.style.opacity = 1;
};
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
  // countriesContainer.style.opacity = 1;
};
///////////////////////////////////////

/*
//LEction 1


const getCountryData = function (country) {
  const request = new XMLHttpRequest();
  request.open(`GET`, `https://restcountries.com/v2/name/${country}`);
  request.send();

  request.addEventListener(`load`, function () {
    console.log(this.responseText);

    const [data] = JSON.parse(this.responseText);
    console.log(data);

    const html = `<article class="country">
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
    countriesContainer.style.opacity = 1;
  });
};

//OldScholl AjaxCall
getCountryData(`portugal`);
getCountryData(`usa`);
getCountryData(`russia`);
*/

/*

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
  countriesContainer.style.opacity = 1;
};

const getCountryAndNeighbourData = function (country) {
  //AJAX call country 1
  const request = new XMLHttpRequest();
  request.open(`GET`, `https://restcountries.com/v2/name/${country}`);
  request.send();

  request.addEventListener(`load`, function () {
    console.log(this.responseText);

    const [data] = JSON.parse(this.responseText);
    console.log(data);

    //Render Country 1
    renderCountry(data);

    //
    //Get Neighbour country 2
    //
    const [neighbour] = data.borders;

    if (!neighbour) return;

    const request2 = new XMLHttpRequest();
    request2.open(`GET`, `https://restcountries.com/v2/alpha/${neighbour}`);
    request2.send();

    request2.addEventListener(`load`, function () {
      const data2 = JSON.parse(this.responseText);
      console.log(data2);

      renderCountry(data2, `neighbour`);
    });
  });
};
// getCountryAndNeighbourData(`portugal`);
getCountryAndNeighbourData(`usa`);

// "Callback-Hell"
setTimeout(() => {
  console.log(`1sec parsed`);
  setTimeout(() => {
    console.log(`2sec parsed`);
    setTimeout(() => {
      console.log(`3sec parsed`);
    }, 1000);
  }, 1000);
}, 1000);
*/

//////////////////////////////////////
//Promisses and the Fetch API
//////////////////////////////////////

// const request = new XMLHttpRequest();
// request.open(`GET`, `https://restcountries.com/v2/name/${country}`);
// request.send();

const request = fetch(`https://restcountries.com/v2/name/portugal`);
console.log(request);

/*
const getCountryData = function (country) {
  //Immediately
  fetch(`https://restcountries.com/v2/name/${country}`)
    .then(function (response) {
      console.log(response);
      //Its important to return .json(), so the return value of .then()will be also a promise
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      renderCountry(data[0]);
    });
};
getCountryData(`portugal`);
*/
const getJSON = function (url, errorMsg = `Something went wrong`) {
  return fetch(url).then(response => {
    if (!response.ok) throw new Error(`${errorMsg} (${response.status})`);
    return response.json();
  });
};

// const getCountryData = function (country) {
//   //Immediately
//   fetch(`https://restcountries.com/v2/name/${country}`)
//     //Its important to return .json(), so the return value of .then()will be also a promise
//     .then(response => {
//       console.log(response);
//       if (!response.ok)
//         throw new Error(`Country not found! (${response.status}) `);
//       return response.json();
//     })
//     .then(data => {
//       renderCountry(data[0]);
//       // const neighbour = data[0].borders[0];
//       const neighbour = `sada`;

//       if (!neighbour) return;

//       //country2
//       return fetch(`https://restcountries.com/v2/alpha/${neighbour}`);
//     })
//     //Important Step - for each sten each .then() method
//     .then(response => {
//       if (!response.ok)
//         throw new Error(`Country not found! (${response.status}) `);
//       return response.json();
//     })
//     .then(data => renderCountry(data, `neighbour`))
//     .catch(err => {
//       console.log(`${err} 🔥🔥🔥`);
//       renderError(`Something went wrong! ${err.message}`);
//     })
//     .finally(() => {
//       countriesContainer.style.opacity = 1;
//     });
// };

const getCountryData = function (country) {
  //Immediately

  getJSON(`https://restcountries.com/v2/name/${country}`, `Country not found`)
    .then(data => {
      renderCountry(data[0]);

      const neighbour = data[0].borders?.[0];
      console.log(neighbour);

      if (!neighbour) throw new Error(`No neighbour found!`);

      //country2
      return getJSON(
        `https://restcountries.com/v2/alpha/${neighbour}`,
        `Country not found`
      );
    })
    //Important Step - for each sten each .then() method

    .then(data => renderCountry(data, `neighbour`))
    .catch(err => {
      console.log(`${err} 🔥🔥🔥`);
      renderError(`Something went wrong! ${err.message}`);
    })
    .finally(() => {
      countriesContainer.style.opacity = 1;
    });
};
// getCountryData(`portugal`);
// getCountryData(`germany`);

btn.addEventListener(`click`, function () {
  getCountryData(`portugal`);
});

getCountryData(`australia`);

console.log(`Test start`);
setTimeout(() => console.log(`0 sec timer`), 0);
Promise.resolve(`Resolved promise 1`).then(res => console.log(res));
Promise.resolve(`Resolved promise 2`).then(res => {
  for (let i = 0; i < 10000000000; i++) {}
  console.log(res);
});
console.log(`Test End`);
