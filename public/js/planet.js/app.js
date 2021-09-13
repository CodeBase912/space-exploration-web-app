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
  const planetInfo = {
    sun: {
      planetGenerator: [4, 0, 0, 0, 'Sun', '../img/sun.jpg', '', 0, 0],
      data: {
        paragraph:
          'The Sun is the star at the center of the Solar System. It is a nearly perfect sphere of hot plasma, heated to incandescence by nuclear fusion reactions in its core, radiating the energy mainly as visible light, ultraviolet light, and infrared radiation. It is by far the most important source of energy for life on Earth. Its diameter is about 1.39 million kilometres, or 109 times that of Earth. Its mass is about 330,000 times that of Earth; it accounts for about 99.86% of the total mass of the Solar System.',
        paragraph2:
          "The Sun's core fuses about 600 million tons of hydrogen into helium every second, converting 4 million tons of matter into energy every second as a result. This energy, which can take between 10,000 and 170,000 years to escape the core, is the source of the Sun's light and heat. When hydrogen fusion in its core has diminished to the point at which the Sun is no longer in hydrostatic equilibrium, its core will undergo a marked increase in density and temperature while its outer layers expand, eventually transforming the Sun into a red giant.",
        paragraph3:
          'It is calculated that the Sun will become sufficiently large to engulf the current orbits of Mercury and Venus, and render Earth uninhabitable – but not for about five billion years. After this, it will shed its outer layers and become a dense type of cooling star known as a white dwarf, and no longer produce energy by fusion, but still glow and give off heat from its previous fusion',
      },
      atmosphere:
        '74.9% hydrogen, 23.8% helium, 0.6% oxygen, 0.3% carbon, 0.2% neon, and 0.2% iron',
      climate:
        'Temperatures vary from  1.57 x 10<sup>7</sup> <sup>o</sup>C in the core to 5 505<sup>o</sup>C on the surface',
    },
    mercury: {
      planetGenerator: [4, 0, 0, 0, 'Mercury', '../img/mercury.jpg', '', 0, 0],
      data: {
        paragraph:
          "Mercury is the smallest planet in the Solar System and the closest to the Sun. Its orbit around the Sun takes 87.97 Earth days, the shortest of all the Sun's planets. This proximity to the Sun means the planet can only be seen near the western horizon after sunset or the eastern horizon before sunrise, usually in twilight. Mercury rotates in a way that is unique in the Solar System. It is tidally locked with the Sun in a 3:2 spin–orbit resonance,[17] meaning that relative to the fixed stars, it rotates on its axis exactly three times for every two revolutions it makes around the Sun.[a][18] As seen from the Sun, in a frame of reference that rotates with the orbital motion, it appears to rotate only once every two Mercurian years. An observer on Mercury would therefore see only one day every two Mercurian years.",
        paragraph2:
          'Having almost no atmosphere to retain heat, Mercury has surface temperatures that vary diurnally more than on any other planet in the Solar System. It never rises above -94 °C at the poles, due to the absence of an atmosphere and a steep temperature gradient between the equator and the poles',
      },
      atmosphere: 'Sadly Mercury has no atmosphere',
      climate:
        'Temperatures vary from −173 °C at night to 427 °C during the day across the equatorial regions',
    },
    venus: {
      planetGenerator: [4, 0, 0, 0, 'Venus', '../img/venus.jpg', '', 0, 30],
      data: {
        paragraph:
          "Venus is the second planet from the Sun. It is named after the Roman goddess of love and beauty. As the brightest natural object in Earth's night sky after the Moon, Venus can cast shadows and can be, on rare occasions, visible to the naked eye in broad daylight. Venus lies within Earth's orbit, and so never appears to venture far from the Sun, either setting in the west just after dusk or rising in the east a little while before dawn. It takes longer for Venus to rotate about its axis than any other planet in the Solar System, and does so in the opposite direction to all but Uranus. This means the Sun rises in the west and sets in the east. Venus does not have any moons, a distinction it shares only with Mercury among the planets in the Solar System.",
        paragraph2:
          "Venus is a terrestrial planet and is sometimes called Earth's \"sister planet\" because of their similar size, mass, proximity to the Sun, and bulk composition. It is radically different from Earth in other respects. Venus has the densest atmosphere of the four terrestrial planets. The atmospheric pressure at the planet's surface is about 92 times the sea level pressure of Earth, or roughly the pressure at 900 meters underwater on Earth. The CO2-rich atmosphere generates the strongest greenhouse effect in the Solar System, creating surface temperatures of at least 462 °C. This makes Venus's surface hotter than Mercury's, even though Venus is nearly twice Mercury's distance from the Sun. Venus been identified by scientists as a warning and research object linked to climate change on Earth",
      },
      atmosphere:
        '96.5% carbon dioxide, 3.5% nitrogen and traces of other gases including sulfur dioxide',
      climate:
        'Temperatures vary from 438 °C to 482 °C making it the hottest planet in the Solar System',
    },
    earth: {
      planetGenerator: [4, 0, 0, 0, 'Earth', '../img/globe.png', '', 0, 60],
      data: {
        paragraph:
          "Earth is the third planet from the Sun and the only astronomical object known to harbour and support life. About 29.2% of Earth's surface is land consisting of continents and islands. The remaining 70.8% is covered with water, mostly by oceans, seas, gulfs, and other salt-water bodies, but also by lakes, rivers, and other freshwater, which together constitute the hydrosphere. Much of Earth's polar regions are covered in ice. Earth's outer layer is divided into several rigid tectonic plates that migrate across the surface over many millions of years, while its interior remains active with a solid iron inner core, a liquid outer core that generates Earth's magnetic field, and a convective mantle that drives plate tectonics.",
        paragraph2:
          "Earth's atmosphere consists mostly of nitrogen and oxygen. More solar energy is received by tropical regions than polar regions and is redistributed by atmospheric and ocean circulation. Greenhouse gases also play an important role in regulating the surface temperature. A region's climate is not only determined by latitude, but also by elevation and proximity to moderating oceans, among other factors.",
        paragraph3:
          "Earth's gravity interacts with other objects in space, especially the Moon, which is Earth's only natural satellite. Earth's axis of rotation is tilted with respect to its orbital plane, producing seasons on Earth. The gravitational interaction between Earth and the Moon causes tides, stabilizes Earth's orientation on its axis, and gradually slows its rotation. Earth is the densest planet in the Solar System and the largest and most massive of the four rocky planets.",
      },
      atmosphere: '78% nitrogen, 21% oxygen, 0.9% argon, and 0.1% other gases',
      climate:
        'Temperature on the surface is about 14 °C or 15 °C, depending on the reference',
    },
    mars: {
      planetGenerator: [4, 0, 0, 0, 'Mars', '../img/mars.jpg', '', 0, 20],
      data: {
        paragraph:
          'Mars is the fourth planet from the Sun and the second-smallest planet in the Solar System, being larger than only Mercury. Mars is often referred to as the "Red Planet". This refers to the effect of the iron oxide prevalent on Mars\'s surface, which gives it a reddish appearance distinctive among the astronomical bodies visible to the naked eye. Mars is a terrestrial planet with a thin atmosphere, with surface features reminiscent of the impact craters of the Moon and the valleys, deserts and polar ice caps of Earth.',
        paragraph2:
          'The days and seasons are comparable to those of Earth, because the rotational period as well as the tilt of the rotational axis relative to the ecliptic plane are similar. Mars is the site of Olympus Mons, the largest volcano and highest known mountain on any planet in the Solar System, and of Valles Marineris, one of the largest canyons in the Solar System. The smooth Borealis basin in the Northern Hemisphere covers 40% of the planet and may be a giant impact feature. Mars has two moons, Phobos and Deimos, which are small and irregularly shaped. With Earth-made rovers exploring the surface and Earth-made satellites orbiting the planet, Mars is the most actively explored planet in the Solar System besides Earth.',
      },
      atmosphere: '96% carbo dioxide, 1.93% argon and 1.89% nitrogen',
      climate:
        'Temperatures vary from -178<sup>o</sup> C to 24<sup>o</sup>C in equatorial summer',
    },
    jupiter: {
      planetGenerator: [
        4,
        0,
        0,
        0,
        'Jupiter',
        '../img/jupiter.jpg',
        '',
        0,
        -30,
      ],
      data: {
        paragraph:
          "Jupiter is the fifth planet from the Sun and the largest in the Solar System. It is a gas giant with a mass more than two and a half times that of all the other planets in the Solar System combined, but slightly less than one-thousandth the mass of the Sun. Jupiter is the third-brightest natural object in the Earth's night sky after the Moon and Venus. It has been observed since pre-historic times and is named after the Roman god Jupiter, the king of the gods, because of its observed size.",
        paragraph2:
          "Jupiter likely has a rocky core, but like the other giant planets, Jupiter lacks a well-defined solid surface. The on-going contraction of its interior generates heat greater than the amount received from the Sun. Because of its rapid rotation, the planet's shape is that of an oblate spheroid; it has a slight but noticeable bulge around the equator. The outer atmosphere is visibly segregated into several bands at different latitudes, with turbulence and storms along their interacting boundaries. A prominent result of this is the Great Red Spot, a giant storm that is known to have existed since at least the 17th century, when it was first seen by telescope.",
        paragraph3:
          "Surrounding Jupiter is a faint planetary ring system and a powerful magnetosphere. Jupiter's magnetic tail is nearly 800 million km long, covering the entire distance to Saturn's orbit. Jupiter has 80 known moons and possibly many more, including the four large Galilean moons discovered by Galileo Galilei in 1610. Ganymede, the largest of these, has a diameter greater than that of the planet Mercury.",
      },
      atmosphere:
        '90% hydrogen and 10% helium, with a few traces of other gases',
      climate: 'Temperatures vary from -100 °C to -160 °C on the surface',
    },
    saturn: {
      planetGenerator: [
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
      data: {
        paragraph:
          'Saturn is the sixth planet from the Sun and the second-largest in the Solar System, after Jupiter. It is a gas giant with an average radius of about nine and a half times that of Earth. It only has one-eighth the average density of Earth',
        paragraph2:
          "The planet's most famous feature is its prominent ring system, which is composed mostly of ice particles, with a smaller amount of rocky debris and dust. At least 82 moons are known to orbit Saturn, of which 53 are officially named; this does not include the hundreds of moonlets in its rings. Titan, Saturn's largest moon and the second largest in the Solar System, is larger than the planet Mercury, although less massive, and is the only moon in the Solar System to have a substantial atmosphere.",
        paragraph3:
          "Saturn's interior is most likely composed of a core of iron–nickel and rock (silicon and oxygen compounds). Its core is surrounded by a deep layer of metallic hydrogen, an intermediate layer of liquid hydrogen and liquid helium, and finally a gaseous outer layer. Saturn has a pale yellow hue due to ammonia crystals in its upper atmosphere. An electrical current within the metallic hydrogen layer is thought to give rise to Saturn's planetary magnetic field, which is weaker than the Earth's. Wind speeds on Saturn can reach 1,800 km/h, higher than on Jupiter but not as high as on Neptune.",
      },
      atmosphere:
        '96.3% hydrogen, 3.25% helium, 0.45% methane and a trace of other elements',
      climate: 'Temperatures vary from about -185 °C to -122 °C',
    },
    uranus: {
      planetGenerator: [
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
      data: {
        paragraph:
          'Uranus is the seventh planet from the Sun. It has the third-largest planetary radius and fourth-largest planetary mass in the Solar System. Uranus is similar in composition to Neptune, and both have bulk chemical compositions which differ from that of the larger gas giants Jupiter and Saturn. For this reason, scientists often classify Uranus and Neptune as "ice giants" to distinguish them from the other giant planets. Uranus\'s atmosphere is similar to Jupiter\'s and Saturn\'s in its primary composition of hydrogen and helium, but it contains more "ices" such as water, ammonia, and methane, along with traces of other hydrocarbons. It has the coldest planetary atmosphere in the Solar System and has a complex, layered cloud structure with water thought to make up the lowest clouds and methane the uppermost layer of clouds. The interior of Uranus is mainly composed of ices and rock.',
        paragraph2:
          'Like the other giant planets, Uranus has a ring system, a magnetosphere, and numerous moons. The Uranian system has a unique configuration because its axis of rotation is tilted sideways, nearly into the plane of its solar orbit. Its north and south poles, therefore, lie where most other planets have their equators. In 1986, images from Voyager 2 showed Uranus as an almost featureless planet in visible light, without the cloud bands or storms associated with the other giant planets. Voyager 2 remains the only spacecraft to visit the planet. Observations from Earth have shown seasonal change and increased weather activity as Uranus approached its equinox in 2007. Wind speeds can reach 900 km/h.',
        paragraph3:
          'Like the classical planets, Uranus is visible to the naked eye, but it was never recognised as a planet by ancient observers because of its dimness and slow orbit. Sir William Herschel first observed Uranus on 13 March 1781, leading to its discovery as a planet, expanding the known boundaries of the Solar System for the first time in history and making Uranus the first planet classified as such with the aid of a telescope.',
      },
      atmosphere:
        '83% hydrogen, 15% helium, 2.3% methane and a trace of other elements',
      climate: 'Temperatures vary from about −224 °C to 47 °C',
    },
    neptune: {
      planetGenerator: [4, 0, 0, 0, 'Neptune', '../img/neptune.jpg', '', 0, 40],
      data: {
        paragraph:
          'Neptune is the eighth and farthest known Solar planet from the Sun. In the Solar System, it is the fourth-largest planet by diameter, the third-most-massive planet, and the densest giant planet. It is 17 times the mass of Earth, slightly more massive than its near-twin Uranus. Neptune is denser and physically smaller than Uranus because its greater mass causes more gravitational compression of its atmosphere. Neptune has a faint and fragmented ring system (labelled "arcs"), which was discovered in 1984, then later confirmed by Voyager 2. The planet orbits the Sun once every 164.8 years at an average distance of 30.1 AU (Astronomical Units) or 4.5 billion km.',
        paragraph2:
          'Like Jupiter and Saturn, Neptune\'s atmosphere is composed primarily of hydrogen and helium, along with traces of hydrocarbons and possibly nitrogen, though it contains a higher proportion of "ices" such as water, ammonia and methane. However, similar to Uranus, its interior is primarily composed of ices and rock. Uranus and Neptune are normally considered "ice giants" to emphasise this distinction. Traces of methane in the outermost regions in part account for the planet\'s blue appearance, though an unknown component is believed to color Neptune a deeper blue compared to Uranus.',
        paragraph3:
          "Neptune is not visible to the unaided eye and is the only planet in the Solar System found by mathematical prediction rather than by empirical observation. Unexpected changes in the orbit of Uranus led Alexis Bouvard to deduce that its orbit was subject to gravitational perturbation by an unknown planet. After Bouvard's death, the position of Neptune was predicted from his observations, independently, by John Couch Adams and Urbain Le Verrier. Neptune was subsequently observed with a telescope on 23 September 1846 by Johann Galle within a degree of the position predicted by Le Verrier.",
      },
      atmosphere: '80% hydrogen and 19% helium and trace amounts of methane',
      climate:
        'Temperatures vary from approximately -218 °C to -200 °C making it the coldest planet in the Solar System',
    },
  };

  /**
   * Add Planet to the scene
   */

  const planetName = document.querySelector('#planet-name');
  const activePlanetName = planetName.innerHTML.toLowerCase();
  const planetObj = new Planet(...planetInfo[activePlanetName].planetGenerator);
  const planetBody = planetObj.createPlanet();
  planetObj.addRings();
  planetObj.addOrbits();
  const planetLocation = planetObj.setPlanetOrbitPosition();
  const planet = planetObj.planet;
  console.log(planetObj.planet);
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
    planet.children[1].rotation.y += 0.004;
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
        document.querySelectorAll('.user-age')[0].innerHTML = user.age;
      } else {
        // Otherwise enter the calculated data
        document.querySelectorAll('.user-age')[0].innerHTML = userAge;
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
        document.querySelectorAll('.user-age')[1].innerHTML = user.weight;
      } else {
        // Otherwise enter the calculated data
        document.querySelectorAll('.user-age')[1].innerHTML = userWeight;
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
        document.querySelectorAll('.user-age')[0].innerHTML = user.age;
      } else {
        // Otherwise enter the calculated data
        document.querySelectorAll('.user-age')[0].innerHTML = userAge;
      }
      // Update the HTML DOM element that displays user's weight
      document.querySelectorAll('.user-wrapper')[1].style.opacity = 1;
      document.querySelectorAll('.user-wrapper')[1].style.pointerEvents = 'all';
      document.querySelectorAll('.user-age-on-planet')[1].innerHTML =
        planetName.innerHTML;
      // If the planet is Earth display the user's input data
      if (planetName.innerHTML == 'Earth') {
        document.querySelectorAll('.user-age')[1].innerHTML = user.weight;
      } else {
        // Otherwise enter the calculated data
        document.querySelectorAll('.user-age')[1].innerHTML = userWeight;
      }
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

  const planetAtmosphere = document.querySelector('#atmosphere');
  const planetClimate = document.querySelector('#climate');
  const planetContent = document.querySelector('.planet-content');
  let content = [];
  Object.entries(planetInfo[activePlanetName].data).map((paragraph) => {
    content.push('<p>' + paragraph[1] + '</p>');
  });

  planetContent.innerHTML = content.join('');
  planetAtmosphere.innerHTML = planetInfo[activePlanetName].atmosphere;
  planetClimate.innerHTML = planetInfo[activePlanetName].climate;
}
