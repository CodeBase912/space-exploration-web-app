// Import the three.js module
import * as THREE from '../three.module.js';

/**
 * @function createAsteroidBelt - creates the asteroid belts in the three.js
 *                                scene. The belt's shaped is a flattened
 *                                torus
 *
 * @param {number} innerRadius - the inner radius of the torus/asteroid belt
 *
 * @param {number} beltRadius - the radius of the tube of the torus, i.e. the
 *                              width of the asteriod belt
 *
 * @returns {object} - a three.js object of the asteroid belt
 */
export function createAsteroidBelt(innerRadius, beltRadius) {
  // --------------------------------------------------------------------------
  // Make a belt 3D Object as well as the asteriod geometry and material
  // --------------------------------------------------------------------------

  const belt = new THREE.Object3D();

  const asteriodGeometry = new THREE.BufferGeometry();
  const asteriodrMaterial = new THREE.PointsMaterial({
    color: 0xffffff,
    size: 0.2,
  });

  // --------------------------------------------------------------------------
  // Define an array that will hold all the asteroid positions
  // --------------------------------------------------------------------------

  const asteriodVertices = [];

  let c = innerRadius; //radius from the center of torus to center of tube
  let a = beltRadius; // radius of a tube
  for (let i = 0; i < 1000; i++) {
    let s = Math.random() * 360;
    let t = Math.random() * 360;
    let x = (c + a * Math.cos(s)) * Math.cos(t);
    let y = Math.random() * 2 * (Math.random() * 2 > 1 ? 1 : -1);
    let z = (c + a * Math.cos(s)) * Math.sin(t);
    asteriodVertices.push(x, y, z);
  }

  // In order for the asteroids to be visible we need to set the position
  // attribute to the asteroidGeometry. We have to set it to a matrix. This
  // matrix has to be converted to a float32 buffer attribute, for this we
  // need use the float32BufferAttribute object provided by three.js
  asteriodGeometry.setAttribute(
    'position',
    new THREE.Float32BufferAttribute(asteriodVertices, 3)
  );

  // Generate the asteroids by joining the star geometry with the starMaterial
  const asteriods = new THREE.Points(asteriodGeometry, asteriodrMaterial);

  // Add the generated asteroids to the asteroid belt 3D object
  belt.add(asteriods);

  // Return the asteroid belt 3D three.js object
  return belt;
}
