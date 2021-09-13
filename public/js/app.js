// Import three.js modules
import * as THREE from './three.module.js';
import { OrbitControls } from './OrbitControls.js';
// Import Our Custom component
import Planet from './components/Planets.js';
import { createAsteroidBelt } from './components/Asteriods.js';
import { createStars } from './components/Stars.js';
// Import Utility functions
import {
  moveCameraForward,
  moveCameraBackward,
} from './Util/cameraMovements.js';
import {
  updateInfo,
  handleInputEvent,
  saveUserInput,
  getUserData,
  scrollFunction,
} from './Util/Utils.js';
import { renderPlanet } from './planet.js/app.js';
import './planet.js/app.js';

// --------------------------------------------------------------------------
// Handle the user's input data (when user enter's their age and weight)
// --------------------------------------------------------------------------

// Select the necessary HTML DOM elements
const main = document.getElementsByTagName('main')[0];
const userInputContainer = document.querySelector('#user-input-tab');
const ageInput = document.querySelector('#age-input');
const weightInput = document.querySelector('#weight-input');
const inputErrorMessage = document.querySelector('#error-msg');
const userInputSubmitBtn = document.querySelector('#user-input-submit');
const userInputSkipBtn = document.querySelector('#user-input-skip');

// Initially the user should not be able to interact with the main
// app, i.e. they should either enter their age & weight details or
// skip that step in order to interact with the app
main.style.pointerEvents = 'none';

// Handle the user input
ageInput.addEventListener('input', (event) =>
  handleInputEvent(event, ageInput, weightInput, inputErrorMessage)
);
weightInput.addEventListener('input', (event) =>
  handleInputEvent(event, weightInput, ageInput, inputErrorMessage)
);
userInputSubmitBtn.addEventListener('click', () =>
  saveUserInput(ageInput.value, weightInput.value)
);
userInputSkipBtn.addEventListener('click', () => {
  inputErrorMessage.style.display = 'none';
  userInputContainer.style.display = 'none';
  main.style.pointerEvents = 'all';
});

// --------------------------------------------------------------------------
// Create and render the three.js scene as well as the its objects
// (planets, stars, etc.)
// --------------------------------------------------------------------------

const canvas = document.querySelector('.webgl');
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  20000
);

const renderer = new THREE.WebGLRenderer({
  // alpha: true,
  antialia: true,
  canvas: canvas,
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);

// Create the Sun
const sunObj = new Planet(8, 0, 0, 0, 'Sun', '../img/sun.jpg', '', 0, 0);
const Sun = sunObj.createPlanet();
sunObj.addOrbits();
const sunLocation = sunObj.setPlanetOrbitPosition();
const sun = sunObj.planet;

// Create Mercury
const mercuryObj = new Planet(
  0.3,
  0,
  0,
  0,
  'Mercury',
  '../img/mercury.jpg',
  '',
  -13,
  0
);
const Mercury = mercuryObj.createPlanet();
mercuryObj.addOrbits();
const mercuryLocation = mercuryObj.setPlanetOrbitPosition();
const mercury = mercuryObj.planet;

// Create Venus
const venusObj = new Planet(
  0.4,
  0,
  0,
  0,
  'Venus',
  '../img/venus.jpg',
  '',
  -25,
  30
);
const Venus = venusObj.createPlanet();
venusObj.addOrbits();
const venusLocation = venusObj.setPlanetOrbitPosition();
const venus = venusObj.planet;

// Create Earth
const earthObj = new Planet(
  0.5,
  0,
  0,
  0,
  'Earth',
  '../img/globe.png',
  '',
  -35,
  60
);
const Earth = earthObj.createPlanet();
earthObj.addOrbits();
const earthLocation = earthObj.setPlanetOrbitPosition();
const earth = earthObj.planet;

// Create Mars
const marsObj = new Planet(
  0.4,
  0,
  0,
  0,
  'Mars',
  '../img/mars.jpg',
  '',
  -50,
  20
);
const Mars = marsObj.createPlanet();
marsObj.addOrbits();
const marsLocation = marsObj.setPlanetOrbitPosition();
const mars = marsObj.planet;

// Create Jupiter
const jupiterObj = new Planet(
  4,
  0,
  0,
  0,
  'Jupiter',
  '../img/jupiter.jpg',
  '',
  -110,
  -30
);
const Jupiter = jupiterObj.createPlanet();
jupiterObj.addOrbits();
const jupiterLocation = jupiterObj.setPlanetOrbitPosition();
const jupiter = jupiterObj.planet;

// Create Saturn
const saturnObj = new Planet(
  3,
  4,
  7,
  80.3,
  'Saturn',
  '../img/saturn.jpg',
  '../img/saturn-rings.jpg',
  -160,
  50
);
const Saturn = saturnObj.createPlanet();
saturnObj.addRings();
saturnObj.addOrbits();
const saturnLocation = saturnObj.setPlanetOrbitPosition();
const saturn = saturnObj.planet;

// Create Uranus
const uranusObj = new Planet(
  3,
  4,
  7,
  80.3,
  'Uranus',
  '../img/uranus.jpg',
  '../img/uranus-rings.jpg',
  -230,
  80
);
const Uranus = uranusObj.createPlanet();
uranusObj.addRings();
uranusObj.addOrbits();
const uranusLocation = uranusObj.setPlanetOrbitPosition();
const uranus = uranusObj.planet;

// Create Neptune
const neptuneObj = new Planet(
  4,
  0,
  0,
  0,
  'Neptune',
  '../img/neptune.jpg',
  '',
  -300,
  40
);
const Neptune = neptuneObj.createPlanet();
neptuneObj.addOrbits();
const neptuneLocation = neptuneObj.setPlanetOrbitPosition();
const neptune = neptuneObj.planet;

// Add the Planets to the scene
scene.add(sun, mercury, venus, earth, mars, jupiter, saturn, uranus, neptune);

// Store the planet locations in an array
const planets = [
  sunLocation,
  mercuryLocation,
  venusLocation,
  earthLocation,
  marsLocation,
  jupiterLocation,
  saturnLocation,
  uranusLocation,
  neptuneLocation,
];

// Add Lights to the scene
const pointLight = new THREE.PointLight(0xffffff, 2, 500);
pointLight.position.x = 0;
pointLight.position.y = 0;
pointLight.position.z = 0;
scene.add(pointLight);

// Add Orbital Controls
let controls = new OrbitControls(camera, renderer.domElement);
controls.enableZoom = true;
controls.enablePan = true;
controls.enableRotate = true;
controls.enableDamping = true;
controls.zoomSpeed = 0.6;
controls.panSpeed = 0.5;
controls.rotateSpeed = 0.4;
// Set the Orbit controls target
controls.target.set(0, 0, 0);

// Create the background stars and add them to the scene
const stars = createStars();
scene.add(stars);

// Create the inner asteroid belt and add it to the scene
const innerBeltDimensions = {
  innerRadius: 80,
  beltRadius: 10,
};
const innerAsteroidBelt = createAsteroidBelt(
  innerBeltDimensions.innerRadius,
  innerBeltDimensions.beltRadius
);
scene.add(innerAsteroidBelt);

// Create the outer asteriod belt and add it to the scene
const outerBeltDimensions = {
  innerRadius: 340,
  beltRadius: 20,
};
const outerAsteroidBelt = createAsteroidBelt(
  outerBeltDimensions.innerRadius,
  outerBeltDimensions.beltRadius
);
scene.add(outerAsteroidBelt);

// Set the camera position
camera.position.x = 20;
camera.position.y = 8;
camera.position.z = 35;
camera.lookAt(0, 0, 0);

/**
 * @function removeOrbits - hides the planet orbit lines
 */
function removeOrbits() {
  for (let i = 1; i <= 8; i++) {
    scene.children[i].children[
      scene.children[i].children.length - 1
    ].material.visible = false;
  }
}

// Define the curent state (the application state variable => it determines
// which planet is in focus)
let state = [1];
for (let i = 0; i < planets.length - 1; i++) {
  state.push(0);
}

/**
 * @function animate - animates the render loop of the three.js canvas
 */
function animate() {
  requestAnimationFrame(animate);
  // cube.rotation.x += 0.01;
  earth.children[0].rotation.y += 0.003;
  earth.children[1].rotation.y += 0.0045;
  mars.children[0].rotation.y += 0.01;
  jupiter.children[0].rotation.y += 0.001;
  innerAsteroidBelt.rotation.y += 0.0005;
  outerAsteroidBelt.rotation.y += 0.0003;
  renderer.render(scene, camera);
  TWEEN.update();
}
animate();

// --------------------------------------------------------------------------
// Rerender the canvas on window resize to make it responsive
// --------------------------------------------------------------------------

const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener('resize', () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update the camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // required if controls.enableDamping or controls.autoRotate are set to true
  controls.update();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

// --------------------------------------------------------------------------
// Fetch the planet data from the Solar Systen OpenData API
// --------------------------------------------------------------------------

let xhr = new XMLHttpRequest();
xhr.open('GET', 'https://api.le-systeme-solaire.net/rest/bodies/', true);

let data;
xhr.onload = function () {
  if (this.status == 200) {
    data = JSON.parse(this.responseText);
    console.log(data);

    const theSun = data.bodies.find((planet) => {
      if (planet.englishName == 'Sun') {
        return true;
      }
    });

    // Select the relevant HTML DOM elements that will display the API data
    // in the planet info tab
    const planetName = document.querySelector('#planet-name');
    const moons = document.querySelector('#moons');
    const diameter = document.querySelector('#diameter');
    const mass = document.querySelector('#mass');
    const gravity = document.querySelector('#gravity');
    const orbitalPeriod = document.querySelector('#orbital-period');
    const discoveredBy = document.querySelector('#discovered-by');

    // Set the name of the Sun in the planet info tab
    planetName.innerHTML = theSun.englishName;
    // Check if the selected planet/celestial body is the Sun
    if (theSun.moons === null) {
      // The selected planet/celestial body is the Sun and therefore has no moons
      moons.innerHTML = '';
    } else {
      // The selected planet/celestial body is not the Sun. Display the
      // number of moons the Planet has (if it has moons)
      if (theSun.moons.length > 1) {
        moons.innerHTML = theSun.moons.length + ' moons';
      } else {
        moons.innerHTML = theSun.moons.length + ' moon';
      }
    }

    // Display the diameter of the selected planet/celestial body
    diameter.innerHTML =
      '<span id="property-name">Diameter:</span> <br>' +
      theSun.meanRadius * 2 +
      ' km';

    // Display the mass of the selected planet/celestial body
    mass.innerHTML =
      '<span id="property-name">Mass:</span> <br>' +
      theSun.mass.massValue +
      ' x 10<sup>' +
      theSun.mass.massExponent +
      '</sup> kg';

    // Display the gravity of the selected planet/celestial body if it is
    // provided by the API
    if (theSun.gravity == 0) {
      gravity.innerHTML = '';
    } else {
      gravity.innerHTML =
        '<span id="property-name">Gravity:</span> <br> <span id="planet-gravity">' +
        theSun.gravity +
        '</span> m.s<sup>-2</sup>';
    }

    // Don't display the orbital period of the Sun
    orbitalPeriod.innerHTML = '';

    // Display the who discovered the selected planet/celestial body if this
    // data is provided by the API
    if (theSun.discoveredBy == '') {
      discoveredBy.innerHTML = '';
    } else {
      discoveredBy =
        '<span id="property-name">Discovered by:</span> <br>' +
        theSun.discoveredBy +
        ' (' +
        theSun.discoveryDate +
        ')';
    }
  }
};
// Send the XMLHttpRequest
xhr.send();

// --------------------------------------------------------------------------
// Select all the UI buttons and icons that need event listeners
// --------------------------------------------------------------------------

const infoBtn = document.querySelector('.Info-btn');
const closeIcon = document.querySelector('#close-icon-1');
const moreInfoBtn = document.querySelector('.more-info-btn');
const closeIcon2 = document.querySelector('#close-icon-2');
const scrollBtn = document.querySelector('#scroll-btn');
const prevBtn = document.querySelector('#prev-btn');
const nextBtn = document.querySelector('#next-btn');

// --------------------------------------------------------------------------
// Define the event handlers
// --------------------------------------------------------------------------

/**
 * @function openInfoTab - opens the planet infomation tab and hides the
 *                         info button
 */
function openInfoTab() {
  const infoTab = document.querySelector('#info-tab');

  infoTab.style.transition = '0.5s';
  infoTab.style.opacity = 1;
  infoTab.style.pointerEvents = 'all';

  infoBtn.style.transition = '0.5s';
  infoBtn.style.opacity = '0';
  infoBtn.style.pointerEvents = 'none';
}

/**
 * @function closeInfoTab - closes the planet infomation tab and displays the
 *                          info button
 */
function closeInfoTab() {
  const infoTab = document.querySelector('#info-tab');

  infoTab.style.transition = '0.5s';
  infoTab.style.opacity = 0;
  infoTab.style.pointerEvents = 'none';

  infoBtn.style.transition = '0.5s';
  infoBtn.style.opacity = '1';
  infoBtn.style.pointerEvents = 'all';
}

/**
 * @function openPlanetInfoTab - opens the specific planet information tab and
 *                               renders the selected planet in the tab
 */
function openPlanetInfoTab() {
  const planetInfoTab = document.querySelector('.planet-info-container');

  planetInfoTab.style.transition = '0.5s ease-in-out';
  planetInfoTab.style.top = '1px';
  planetInfoTab.style.height = '100vh';

  // Render the selected planet
  renderPlanet();
}

/**
 * @function closePlanetInfoTab - closes the specific planet information tab
 */
function closePlanetInfoTab() {
  const planetInfoTab = document.querySelector('.planet-info-container');

  planetInfoTab.style.transition = '0.5s ease-in-out';
  planetInfoTab.style.top = '100vh';
  planetInfoTab.style.height = '0';
}

// --------------------------------------------------------------------------
// Add event listeners to the selected UI buttons
// --------------------------------------------------------------------------

infoBtn.addEventListener('click', openInfoTab);
closeIcon.addEventListener('click', closeInfoTab);
moreInfoBtn.addEventListener('click', openPlanetInfoTab);
closeIcon2.addEventListener('click', closePlanetInfoTab);
scrollBtn.addEventListener('click', () => {
  document.querySelector('.main').smoothScroll = scrollFunction(
    document.querySelector('.content-section')
  );
});
nextBtn.addEventListener('click', () => {
  moveCameraForward(camera, controls, planets, state);
  updateInfo(state, planets, data);
});
prevBtn.addEventListener('click', () => {
  moveCameraBackward(camera, controls, planets, state);
  updateInfo(state, planets, data);
});
