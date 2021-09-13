import { getUserData } from '../app.js';

export function updateInfo(state, planets, data) {
  // Determine which planet is active
  const planetIndex = state.findIndex((element) => element == 1);
  const planet = data.bodies.find((planet) => {
    if (planet.englishName == planets[planetIndex].name) {
      return true;
    }
  });

  const planetName = document.querySelector('#planet-name');
  const moons = document.querySelector('#moons');
  const diameter = document.querySelector('#diameter');
  const mass = document.querySelector('#mass');
  const gravity = document.querySelector('#gravity');
  const orbitalPeriod = document.querySelector('#orbital-period');
  const discoveredBy = document.querySelector('#discovered-by');

  planetName.innerHTML = planet.englishName;
  if (planet.moons === null) {
    moons.innerHTML = '';
  } else {
    if (planet.moons.length > 1) {
      moons.innerHTML = planet.moons.length + ' moons';
    } else {
      moons.innerHTML = planet.moons.length + ' moon';
    }
  }

  diameter.innerHTML =
    '<span id="property-name">Diameter:</span> <br>' +
    planet.meanRadius * 2 +
    ' km';
  mass.innerHTML =
    '<span id="property-name">Mass:</span> <br>' +
    planet.mass.massValue +
    ' x 10<sup>' +
    planet.mass.massExponent +
    '</sup> kg';
  if (planet.gravity == 0) {
    gravity.innerHTML = '';
  } else {
    gravity.innerHTML =
      '<span id="property-name">Gravity:</span> <br> <span id="planet-gravity">' +
      planet.gravity +
      '</span> m.s<sup>-2</sup>';
  }
  if (planet.englishName == 'Sun') {
    orbitalPeriod.innerHTML = '';
  } else {
    orbitalPeriod.innerHTML =
      '<span id="property-name">Year:</span> <br> <span id="planet-year">' +
      planet.sideralOrbit +
      '</span> earth days';
  }
  if (planet.discoveredBy == '') {
    discoveredBy.innerHTML = '';
  } else {
    discoveredBy.innerHTML =
      '<span id="property-name">Discovered by:</span> <br>' +
      planet.discoveredBy +
      ' (' +
      planet.discoveryDate +
      ')';
  }
}

export function formatNumber(number) {
  /**About

     * @function formatNumber
       - This functions takes in an integer to format into the following: number: 1234567 -> result: 1 234 567

     * Input-Variables:
       > @param {integer} number
        - This variable is the number to format.

     * Output-Variables:
       > @param {string} result
        - This variable is the formatted number.


    */

  const splitNumber = number.toString().split('.');
  let result;
  if (splitNumber.length > 1) {
    result = splitNumber[0] + '.' + splitNumber[1].slice(0, 2);
  } else {
    result = number;
  }
  return result;
}
