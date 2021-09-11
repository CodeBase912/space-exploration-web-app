import * as THREE from './three.module.js';
import { OrbitControls } from './OrbitControls.js';
import Planet from './components/Planets.js';
import { createAsteroidBelt } from './components/Asteriods.js';
import { createStars } from './components/Stars.js';
import {
  moveCameraForward,
  moveCameraBackward,
} from './Util/cameraMovements.js';
import { updateInfo } from './Util/Utils.js';
import { renderPlanet } from './planet.js/app.js';
import './planet.js/app.js';

// Handle the user input
const ageInput = document.querySelector('#age-input');
const weightInput = document.querySelector('#weight-input');
const inputErrorMessage = document.querySelector('#error-msg');

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
 *
 */
function handleInputEvent(event, elementInFocus, otherElement, errorMessage) {
  // Check if the user input is a number
  if (isNaN(event.target.value)) {
    // User input is not a number. Display error message
    elementInFocus.classList.add('error');
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

ageInput.addEventListener('input', (event) =>
  handleInputEvent(event, ageInput, weightInput, inputErrorMessage)
);
weightInput.addEventListener('input', (event) =>
  handleInputEvent(event, weightInput, ageInput, inputErrorMessage)
);

const prevBtn = document.querySelector('#prev-btn');
const nextBtn = document.querySelector('#next-btn');

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

/**
 * The sun
 */

const sunObj = new Planet(8, 0, 0, 0, 'Sun', '../img/sun.jpg', '', 0, 0);
const Sun = sunObj.createPlanet();
// console.log(sun);
sunObj.addOrbits();
const sunLocation = sunObj.setPlanetOrbitPosition();
const sun = sunObj.planet;

/**
 * Mercury
 */

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
// console.log(mercury);
mercuryObj.addOrbits();
const mercuryLocation = mercuryObj.setPlanetOrbitPosition();
const mercury = mercuryObj.planet;

/**
 * Venus
 */

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
// console.log(venus);
venusObj.addOrbits();
const venusLocation = venusObj.setPlanetOrbitPosition();
const venus = venusObj.planet;

/**
 * Earth
 */

const earthObj = new Planet(
  0.5,
  0,
  0,
  0,
  'Earth',
  '../img/globe.jpg',
  '',
  -35,
  60
);
const Earth = earthObj.createPlanet();
// console.log(Earth);
earthObj.addOrbits();
const earthLocation = earthObj.setPlanetOrbitPosition();
const earth = earthObj.planet;

/**
 * Mars
 */

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
// console.log(mars);
marsObj.addOrbits();
const marsLocation = marsObj.setPlanetOrbitPosition();
const mars = marsObj.planet;

/**
 * Jupiter
 */

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
// console.log(jupiter);
jupiterObj.addOrbits();
const jupiterLocation = jupiterObj.setPlanetOrbitPosition();
const jupiter = jupiterObj.planet;

/**
 * Saturn
 */

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

/**
 * Uranus
 */

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

/**
 * Neptune
 */

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

/**
 * Add Planets to the scene
 */
scene.add(sun, mercury, venus, earth, mars, jupiter, saturn, uranus, neptune);

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

/**
 * Add Lights to the scene
 */
const pointLight = new THREE.PointLight(0xffffff, 2, 500);
pointLight.position.x = 0;
pointLight.position.y = 0;
pointLight.position.z = 0;
scene.add(pointLight);

/**
 * Add Orbital Controls
 */
let controls = new OrbitControls(camera, renderer.domElement);

/**
 * Add Background Stars
 */

const stars = createStars();
scene.add(stars);

// Check out Quokka for auto console.log()

/**
 * Add Asteriod belts
 */

const innerBeltDimensions = {
  innerRadius: 80,
  beltRadius: 10,
};

const outerBeltDimensions = {
  innerRadius: 340,
  beltRadius: 20,
};

const innerAsteroidBelt = createAsteroidBelt(
  innerBeltDimensions.innerRadius,
  innerBeltDimensions.beltRadius
);
scene.add(innerAsteroidBelt);

const outerAsteroidBelt = createAsteroidBelt(
  outerBeltDimensions.innerRadius,
  outerBeltDimensions.beltRadius
);
scene.add(outerAsteroidBelt);

/**
 * Add Responsiveness
 */

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

/**
 * Camera position
 */
camera.position.x = 20;
camera.position.y = 8;
camera.position.z = 35;
camera.lookAt(0, 0, 0);
controls.target.set(0, 0, 0);

function removeOrbits() {
  for (let i = 1; i <= 8; i++) {
    scene.children[i].children[
      scene.children[i].children.length - 1
    ].material.visible = false;
  }
}

// Define the curent state
let state = [1];
for (let i = 0; i < planets.length - 1; i++) {
  state.push(0);
}

nextBtn.addEventListener('click', () => {
  moveCameraForward(camera, controls, planets, state);
  updateInfo(state, planets, data);
});

prevBtn.addEventListener('click', () => {
  moveCameraBackward(camera, controls, planets, state);
  updateInfo(state, planets, data);
});

function animate() {
  requestAnimationFrame(animate);
  // cube.rotation.x += 0.01;
  earth.children[0].rotation.y += 0.007;
  mars.children[0].rotation.y += 0.01;
  jupiter.children[0].rotation.y += 0.001;
  innerAsteroidBelt.rotation.y += 0.0005;
  outerAsteroidBelt.rotation.y += 0.0003;
  renderer.render(scene, camera);
  TWEEN.update();
}
animate();

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

    const planetName = document.querySelector('#planet-name');
    const moons = document.querySelector('#moons');
    const diameter = document.querySelector('#diameter');
    const mass = document.querySelector('#mass');
    const gravity = document.querySelector('#gravity');
    const orbitalPeriod = document.querySelector('#orbital-period');
    const discoveredBy = document.querySelector('#discovered-by');

    planetName.innerHTML = theSun.englishName;
    if (theSun.moons === null) {
      moons.innerHTML = '';
    } else {
      if (theSun.moons.length > 1) {
        moons.innerHTML = theSun.moons.length + ' moons';
      } else {
        moons.innerHTML = theSun.moons.length + ' moon';
      }
    }

    diameter.innerHTML =
      '<span>Diameter:</span> <br>' + theSun.meanRadius * 2 + ' km';
    mass.innerHTML =
      '<span>Mass:</span> <br>' +
      theSun.mass.massValue +
      ' x 10<sup>' +
      theSun.mass.massExponent +
      '</sup>';
    if (theSun.gravity == 0) {
      gravity.innerHTML = '';
    } else {
      gravity.innerHTML =
        '<span>Gravity:</span> <br>' + theSun.gravity + ' m.s<sup>-2</sup>';
    }
    orbitalPeriod.innerHTML = '';
    if (theSun.discoveredBy == '') {
      discoveredBy.innerHTML = '';
    } else {
      discoveredBy =
        '<span>Siscovered by:</span> <br>' +
        theSun.discoveredBy +
        ' (' +
        theSun.discoveryDate +
        ')';
    }
  }
};

xhr.send();

const infoBtn = document.querySelector('.Info-btn');
const closeIcon = document.querySelector('#close-icon-1');
const moreInfoBtn = document.querySelector('.more-info-btn');
const closeIcon2 = document.querySelector('#close-icon-2');

function openInfoTab() {
  const infoTab = document.querySelector('#info-tab');

  infoTab.style.transition = '0.5s';
  infoTab.style.opacity = 1;
  infoTab.style.pointerEvents = 'all';

  infoBtn.style.transition = '0.5s';
  infoBtn.style.opacity = '0';
  infoBtn.style.pointerEvents = 'none';
}

function closeInfoTab() {
  const infoTab = document.querySelector('#info-tab');

  infoTab.style.transition = '0.5s';
  infoTab.style.opacity = 0;
  infoTab.style.pointerEvents = 'none';

  infoBtn.style.transition = '0.5s';
  infoBtn.style.opacity = '1';
  infoBtn.style.pointerEvents = 'all';
}

function openPlanetInfoTab() {
  const planetInfoTab = document.querySelector('.planet-info-container');

  planetInfoTab.style.transition = '0.5s ease-in-out';
  planetInfoTab.style.top = '0';
  planetInfoTab.style.height = '100%';

  renderPlanet();
}

function closePlanetInfoTab() {
  const planetInfoTab = document.querySelector('.planet-info-container');

  planetInfoTab.style.transition = '0.5s ease-in-out';
  planetInfoTab.style.top = '100vh';
  planetInfoTab.style.height = '0';
}

infoBtn.addEventListener('click', openInfoTab);
closeIcon.addEventListener('click', closeInfoTab);
moreInfoBtn.addEventListener('click', openPlanetInfoTab);
closeIcon2.addEventListener('click', closePlanetInfoTab);
