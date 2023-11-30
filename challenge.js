'use strict';

const whereAmI = function (lat, lng) {
  const request = fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);

  // const request2 = fetch(`https://restcountries.com/v2/name/portugal`);
  // console.log(request, request2);
  request
    .then(response => {
      // console.log(response);
      console.log(response);

      if (response.status != 200) {
        throw new Error(`Somethng goes wrong`);
      }
      return response.json();
    })
    .then(data => {
      console.log(data);
      console.log(`You are in ${data.city}, ${data.country}.`);
      throw new Error(`Seems to be not well`);
    })
    .catch(error => {
      console.log(`${error}`);
    });
};
whereAmI(52.508, 13.381);
