// Import planet content data
import { planetInfo } from '../planet.js/app.js';

/**
 * @function updateInfo - updates the planet information in the planet info
 *                        tab to the selected planet's data
 *
 * @param {array} state - the application state variable that determines
 *                        which planet is in focus/selected
 *
 * @param {array} planets - an array of all the planets locations in the
 *                          three.js scene
 * @param {array} data - the API data sourced via Ajax
 */
export function updateInfo(state, planets, data) {
  // Determine which planet is active
  const planetIndex = state.findIndex((element) => element == 1);
  const planet = data.bodies.find((planet) => {
    if (planet.englishName == planets[planetIndex].name) {
      return true;
    }
  });

  // Select the relevant HTML DOM elements that displays the planet's
  // data in the planet info tab
  const planetName = document.querySelector('#planet-name');
  const moons = document.querySelector('#moons');
  const diameter = document.querySelector('#diameter');
  const mass = document.querySelector('#mass');
  const gravity = document.querySelector('#gravity');
  const orbitalPeriod = document.querySelector('#orbital-period');
  const discoveredBy = document.querySelector('#discovered-by');

  // Set the selected planet's name
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

  // Set the selected planet's diameter data
  diameter.innerHTML =
    '<span id="property-name">Diameter:</span> <br>' +
    planet.meanRadius * 2 +
    ' km';

  // Set the selected planet's mass data
  mass.innerHTML =
    '<span id="property-name">Mass:</span> <br>' +
    planet.mass.massValue +
    ' x 10<sup>' +
    planet.mass.massExponent +
    '</sup> kg';

  // Set the selected planet's gravity data if it is available
  if (planet.gravity == 0) {
    gravity.innerHTML = '';
  } else {
    gravity.innerHTML =
      '<span id="property-name">Gravity:</span> <br> <span id="planet-gravity">' +
      planet.gravity +
      '</span> m.s<sup>-2</sup>';
  }

  // Check if the selected planet/celestial body is the Sun
  if (planet.englishName == 'Sun') {
    // The selected planet/celestial body is the sun and therefore has no orbital
    // period relative to the other planets in the Solar System
    orbitalPeriod.innerHTML = '';
  } else {
    // The selected planet/celestial body is not the Sun, therefore
    // Set the selected planet's orbital period (i.e. planet's year in Earht days)
    // data
    orbitalPeriod.innerHTML =
      '<span id="property-name">Year:</span> <br> <span id="planet-year">' +
      planet.sideralOrbit +
      '</span> earth days';
  }

  // Display who the planet was discovered by if this data is available
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

  const activePlanetName = document
    .querySelector('#planet-name')
    .innerHTML.toLowerCase();
  // Update the background image
  const backgroundImg = document.querySelector('.background-img');
  backgroundImg.setAttribute('src', planetInfo[activePlanetName].img);
}

/**
 * @function formatNumber - This functions takes in an integer to format into
 *                          the following: number: 12.34567 -> result: 12.34
 *
 * @param {integer} number - This variable is the number to format
 *
 * @param {string} result - This variable is the formatted number
 *
 */
export function formatNumber(number) {
  const splitNumber = number.toString().split('.');
  let result;
  if (splitNumber.length > 1) {
    result = splitNumber[0] + '.' + splitNumber[1].slice(0, 2);
  } else {
    result = number;
  }
  return result;
}

/**
 * @function handleChange - handles the triggered input event
 *
 * @param {inputEvent} event - the event that is triggered by the event listener
 *
 * @param {object} elementInFocus - the HTML DOM element that triggered the
 *                                  event
 *
 * @param {object} otherElement - the HTML DOM element that is not in focus.
 *                                Needed to determine whether to change the
 *                                style of the @param errorMessage HTML DOM
 *                                element
 *
 * @param {object} errorMessage - the HTML DOM element that displays the error
 *                                message
 */
export function handleInputEvent(
  event,
  elementInFocus,
  otherElement,
  errorMessage
) {
  // Check if the user input is a number
  if (isNaN(event.target.value)) {
    // User input is not a number. Display error message
    elementInFocus.classList.add('error');
    errorMessage.innerHTML = 'Please enter a number';
    errorMessage.style.display = 'block';
  } else {
    // User input is a number. Remove error class from alement in focus
    elementInFocus.classList.remove('error');
    // Check if the other element has an error
    if (otherElement.getAttribute('class') == 'user-input-input error') {
      // The other element has an error. Don't remove error message
      // (i.e. do nothing)
    } else {
      // The other element does not have an error. Hide the error message
      errorMessage.style.display = 'none';
    }
  }
}

/**
 * @function saveUserInput - saves the user input into local storage
 *
 * @param {number} age - the age of the user
 * @param {number} weight - the weight of the user
 */
export function saveUserInput(age, weight) {
  const main = document.getElementsByTagName('main')[0];
  const userInputContainer = document.querySelector('#user-input-tab');
  const inputErrorMessage = document.querySelector('#error-msg');
  // Check if either the age of weight is given
  if (age || weight) {
    // Check if the age and weight are numbers
    if (
      (age && !isNaN(age) && weight && !isNaN(weight)) || // If both age & weight are given & are both numbers
      (age && !isNaN(age) && !isNaN(weight)) || // If age is given & is a number & weight is not given
      (weight && !isNaN(weight) && !isNaN(age)) // If weight is given & is a number  & weight is not given
    ) {
      // Either age or weight or both are given. Save the data

      main.style.pointerEvents = 'all';
      if (age != '') {
        localStorage.setItem('age', age);
      }
      if (weight != '') {
        localStorage.setItem('weight', weight);
      }
      userInputContainer.style.display = 'none';
      inputErrorMessage.style.display = 'none';
    } else {
      // Either age or weight or both are defined but one or both is not a
      // number. Display error message
      inputErrorMessage.innerHTML = 'Please enter a number';
      inputErrorMessage.style.display = 'block';
    }
  } else {
    // No data was given. Display an error message
    inputErrorMessage.innerHTML =
      'You need to provide at least your age or weight';
    inputErrorMessage.style.display = 'block';
  }
}

/**
 * @function getUserData - gets the user's age and weight data from local
 *                         storage
 *
 * @return {object} - an object that contains the user's age and weight
 */
export function getUserData() {
  const age = localStorage.getItem('age');
  const weight = localStorage.getItem('weight');
  return { age, weight };
}

/**
 * @function scrollFunction - smoothly scrolls to a given target HTML DOM element
 *
 * @param {node} target - HTML DOM element to scroll to
 */
export function scrollFunction(target) {
  var scrollContainer = target;
  do {
    //find scroll container
    scrollContainer = scrollContainer.parentNode;
    if (!scrollContainer) return;
    scrollContainer.scrollTop += 1;
  } while (scrollContainer.scrollTop == 0);

  var targetY = 0;
  do {
    //find the top of target relatively to the container
    if (target == scrollContainer) break;
    targetY += target.offsetTop;
  } while ((target = target.offsetParent));

  const scroll = function (c, a, b, i) {
    i++;
    if (i > 30) return;
    c.scrollTop = a + ((b - a) / 30) * i;
    setTimeout(function () {
      scroll(c, a, b, i);
    }, 20);
  };
  // start scrolling
  scroll(scrollContainer, scrollContainer.scrollTop, targetY, 0);
}
