'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

const renderCountry = (data, className = "") => {
  const html = ` 
    <article class="country ${className} ">
    <img class="country__img" src="${data.flags.png}" />
    <div class="country__data">
    <h3 class="country__name">${data.name.common}</h3>
    <h4 class="country__region"> ${data.region} </h4>
    <p class="country__row"><span>👫</span>${data.population}</p>
    <p class="country__row"><span>🗣️</span>${Object.values(data.languages).join(
      ', '
    )}</p>
    <p class="country__row"><span>💰</span>${Object.values(data.currencies)
      .map(currency => currency.name)
      .join(', ')}</p>
    </div>
    </article>
    `;
  // console.log(html);
  countriesContainer.insertAdjacentHTML('beforeend', html);
  countriesContainer.style.opacity = 1;
};

const getCountryAndNebhour = country => {
  // AJAX call to country 1
  const request = new XMLHttpRequest();
  request.open('GET', `https://restcountries.com/v3.1/name/${country}`);
  request.send();
  // console.log(request.responseText);

  request.addEventListener('load', () => {
    const [data] = JSON.parse(request.responseText);
    console.log(data);

    // render country 1
    renderCountry(data);

    // Get neibhour country (2)
    const neighbors = data.borders;
    console.log('neibhour countries are: ' , neighbors);
    

    if (!neighbors || neighbors.length === 0) {
      console.log("No neighbors found!");
      return;
    } 

    // find first neighbor;
    const firstNeighbor = neighbors[0];
    console.log("Fetching neigbor:", firstNeighbor);
    


    // AJAX call country 2
    const request2 = new XMLHttpRequest();
    request2.open('GET', `https://restcountries.com/v3.1/alpha/${firstNeighbor}`);
    request2.send();

    request2.addEventListener('load', () => {
        // console.log(neighbors);
        const [data2] = JSON.parse(request2.responseText);
        console.log("Neighbor data:",  data2);
        
        renderCountry(data2, 'neighbour')
    });
  });
};

getCountryAndNebhour('mongolia');



