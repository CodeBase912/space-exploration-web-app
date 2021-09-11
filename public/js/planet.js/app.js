import * as THREE from '../three.module.js';
import { OrbitControls } from '../OrbitControls.js';
import Planet from '../components/Planets.js';
import { createAsteroidBelt } from '../components/Asteriods.js';
import { createStars } from '../components/Stars.js';
import {
  moveCameraForward,
  moveCameraBackward,
} from '../Util/cameraMovements.js';
import { updateInfo } from '../Util/Utils.js';
import { formatNumber } from '../Util/Utils.js';
import { getUserData } from '../app.js';
import '../tween.umd.js';

export function renderPlanet() {
  const canvasWrapper = document.querySelector('.canvas-wrapper');
  const width = canvasWrapper.getBoundingClientRect().width;
  const height = canvasWrapper.getBoundingClientRect().height;
  const canvas = document.querySelector('#weglPlanet');
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 20000);

  const renderer = new THREE.WebGLRenderer({
    alpha: true,
    antialia: true,
    canvas: canvas,
  });
  renderer.setSize(width, height);
  renderer.setPixelRatio(window.devicePixelRatio);

  // Place the planets' info in a variable
  const planetGeneratorInfo = {
    sun: [4, 0, 0, 0, 'Sun', '../img/sun.jpg', '', 0, 0],
    mercury: [4, 0, 0, 0, 'Mercury', '../img/mercury.jpg', '', 0, 0],
    venus: [4, 0, 0, 0, 'Venus', '../img/venus.jpg', '', 0, 30],
    earth: [4, 0, 0, 0, 'Earth', '../img/globe.jpg', '', 0, 60],
    mars: [4, 0, 0, 0, 'Mars', '../img/mars.jpg', '', 0, 20],
    jupiter: [4, 0, 0, 0, 'Jupiter', '../img/jupiter.jpg', '', 0, -30],
    saturn: [
      4,
      4,
      7,
      80.3,
      'Saturn',
      '../img/saturn.jpg',
      '../img/saturn-rings.jpg',
      0,
      50,
    ],
    uranus: [
      4,
      4,
      7,
      80.3,
      'Uranus',
      '../img/uranus.jpg',
      '../img/uranus-rings.jpg',
      0,
      80,
    ],
    neptune: [4, 0, 0, 0, 'Neptune', '../img/neptune.jpg', '', 0, 40],
  };

  /**
   * Add Planet to the scene
   */

  const planetName = document.querySelector('#planet-name');
  const activePlanetName = planetName.innerHTML.toLowerCase();
  const planetObj = new Planet(...planetGeneratorInfo[activePlanetName]);
  const planetBody = planetObj.createPlanet();
  planetObj.addRings();
  planetObj.addOrbits();
  const planetLocation = planetObj.setPlanetOrbitPosition();
  const planet = planetObj.planet;
  if (planetObj.name == 'Uranus') {
    planet.rotation.y = 59;
  }
  scene.add(planet);

  /**
   * Add Lights to the scene
   */

  const pointLight = new THREE.PointLight(0xffffff, 1, 500);
  pointLight.position.x = 0;
  pointLight.position.y = 0;
  pointLight.position.z = 30;
  scene.add(pointLight);

  const pointLight2 = new THREE.AmbientLight(0xffffff, 0.4, 500);
  pointLight2.position.x = 0;
  pointLight2.position.y = 0;
  pointLight2.position.z = -30;
  scene.add(pointLight2);

  /**
   * Camera position
   */

  camera.position.x = 0;
  camera.position.y = 0;
  camera.position.z = 14;
  // camera.lookAt(0,0,0);

  /**
   * Add Orbital Controls
   */

  let controls = new OrbitControls(camera, renderer.domElement);
  controls.target.set(0, 0, 0);
  controls.enableZoom = false;
  controls.enablePan = false;

  function animate() {
    requestAnimationFrame(animate);

    planetBody.rotation.y += 0.003;
    renderer.render(scene, camera);

    TWEEN.update();
  }
  animate();

  /**
   * Set the planetInfoTab Data
   */

  const user = getUserData();
  const planetGravity = document.querySelector('#planet-gravity');
  const planetYear = document.querySelector('#planet-year');

  console.log(planetGravity);

  if (user.age && (!user.weight || user.weight == '')) {
    // Only the user's age is given
    if (planetName.innerHTML == 'Sun') {
      document.querySelectorAll('.user-wrapper')[0].style.opacity = 0;
      document.querySelectorAll('.user-wrapper')[0].style.pointerEvents =
        'none';
      document.querySelectorAll('.user-wrapper')[1].style.opacity = 0;
      document.querySelectorAll('.user-wrapper')[1].style.pointerEvents =
        'none';
    } else {
      // Define the user's age on the planet
      const userAge = formatNumber(
        (user.age * 365) / parseFloat(planetYear.innerHTML)
      );
      // Hide the HTML DOM element that displays user's weight
      document.querySelectorAll('.user-wrapper')[1].style.opacity = 0;
      document.querySelectorAll('.user-wrapper')[1].style.pointerEvents =
        'none';
      // Update the HTML DOM element that displays user's age
      document.querySelectorAll('.user-wrapper')[0].style.opacity = 1;
      document.querySelectorAll('.user-wrapper')[0].style.pointerEvents = 'all';
      document.querySelectorAll('.user-age-on-planet')[0].innerHTML =
        planetName.innerHTML;
      // If the planet is Earth display the user's input data
      if (planetName.innerHTML == 'Earth') {
        document.querySelectorAll('#user-age')[0].innerHTML = user.age;
      } else {
        // Otherwise enter the calculated data
        document.querySelectorAll('#user-age')[0].innerHTML = userAge;
      }
    }
  } else if (user.weight && (!user.age || user.age == '')) {
    // Only the user's weight is given
    if (planetName.innerHTML == 'Sun') {
      document.querySelectorAll('.user-wrapper')[0].style.opacity = 0;
      document.querySelectorAll('.user-wrapper')[0].style.pointerEvents =
        'none';
      document.querySelectorAll('.user-wrapper')[1].style.opacity = 0;
      document.querySelectorAll('.user-wrapper')[1].style.pointerEvents =
        'none';
    } else {
      // Define the user's weight on the planet
      const userWeight = formatNumber(
        (user.weight / 9.8) * parseFloat(planetGravity.innerHTML)
      );
      // Hide the HTML DOM element that displays user's age
      document.querySelectorAll('.user-wrapper')[0].style.opacity = 0;
      document.querySelectorAll('.user-wrapper')[0].style.pointerEvents =
        'none';
      // Update the HTML DOM element that displays user's weight
      document.querySelectorAll('.user-wrapper')[1].style.opacity = 1;
      document.querySelectorAll('.user-wrapper')[1].style.pointerEvents = 'all';
      document.querySelectorAll('.user-age-on-planet')[1].innerHTML =
        planetName.innerHTML;
      // If the planet is Earth display the user's input data
      if (planetName.innerHTML == 'Earth') {
        document.querySelectorAll('#user-age')[1].innerHTML = user.weight;
      } else {
        // Otherwise enter the calculated data
        document.querySelectorAll('#user-age')[1].innerHTML = userWeight;
      }
    }
  } else if (user.age && user.weight) {
    // Both the user's age and weight are given
    if (planetName.innerHTML == 'Sun') {
      document.querySelectorAll('.user-wrapper')[0].style.opacity = 0;
      document.querySelectorAll('.user-wrapper')[0].style.pointerEvents =
        'none';
      document.querySelectorAll('.user-wrapper')[1].style.opacity = 0;
      document.querySelectorAll('.user-wrapper')[1].style.pointerEvents =
        'none';
    } else {
      // Define the user's age on the planet
      const userAge = formatNumber(
        (user.age * 365) / parseFloat(planetYear.innerHTML)
      );
      // Define the user's weight on the planet
      const userWeight = formatNumber(
        (user.weight / 9.8) * parseFloat(planetGravity.innerHTML)
      );
      // Update the HTML DOM element that displays user's age
      document.querySelectorAll('.user-wrapper')[0].style.opacity = 1;
      document.querySelectorAll('.user-wrapper')[0].style.pointerEvents = 'all';
      document.querySelectorAll('.user-age-on-planet')[0].innerHTML =
        planetName.innerHTML;
      // If the planet is Earth display the user's input data
      if (planetName.innerHTML == 'Earth') {
        document.querySelectorAll('#user-age')[0].innerHTML = user.age;
      } else {
        // Otherwise enter the calculated data
        document.querySelectorAll('#user-age')[1].innerHTML = userAge;
      }
      document.querySelectorAll('#user-age')[0].innerHTML = userAge;
      // Update the HTML DOM element that displays user's weight
      document.querySelectorAll('.user-wrapper')[1].style.opacity = 1;
      document.querySelectorAll('.user-wrapper')[1].style.pointerEvents = 'all';
      document.querySelectorAll('.user-age-on-planet')[1].innerHTML =
        planetName.innerHTML;
      // If the planet is Earth display the user's input data
      if (planetName.innerHTML == 'Earth') {
        document.querySelectorAll('#user-age')[1].innerHTML = user.weight;
      } else {
        // Otherwise enter the calculated data
        document.querySelectorAll('#user-age')[1].innerHTML = userWeight;
      }
      document.querySelectorAll('#user-age')[1].innerHTML = userWeight;
    }
  } else {
    // Both the user's age and weight are not given
    // Hide the HTML DOM element that displays user's age
    document.querySelectorAll('.user-wrapper')[0].style.opacity = 0;
    document.querySelectorAll('.user-wrapper')[0].style.pointerEvents = 'none';
    // Hide the HTML DOM element that displays user's weight
    document.querySelectorAll('.user-wrapper')[1].style.opacity = 0;
    document.querySelectorAll('.user-wrapper')[1].style.pointerEvents = 'none';
  }

  const planetInfoTabTitle = document
    .querySelector('.content-wrapper')
    .querySelector('h1');
  planetInfoTabTitle.innerHTML = planetName.innerHTML;
}
