// Import the three.js module
import * as THREE from '../three.module.js';

/**
 * @function createStars - creates the background stars for the three.js scene
 *
 * @returns {object} - a three.js object of all the stars
 */
export function createStars() {
  // --------------------------------------------------------------------------
  // Define the geometry and material of a star
  // --------------------------------------------------------------------------

  const starGeometry = new THREE.BufferGeometry();
  const starMaterial = new THREE.PointsMaterial({
    // Here we define the color of the stars
    color: 0xb4b4b4,
  });

  // --------------------------------------------------------------------------
  // Define the array that will hold all the star positions
  // --------------------------------------------------------------------------

  const starVertices = [];
  const r = 5000;

  for (let i = 0; i < 10000; i++) {
    let s = Math.random() * 360;
    let t = Math.random() * 360;
    let x = r * Math.cos(s) * Math.sin(t);
    let y = r * Math.sin(s) * Math.sin(t);
    let z = r * Math.cos(t);
    starVertices.push(x, y, z);
  }

  // In order for the stars to be visible we need to set the position
  // attribute to the starGeometry. We have to set it to a matrix. This matrix
  // has to be converted to a float32 buffer attribute, for this we need
  // use the float32BufferAttribute object provided by three.js
  starGeometry.setAttribute(
    'position',
    new THREE.Float32BufferAttribute(starVertices, 3)
  );

  // Generate the stars by joining the star geometry with the starMaterial
  const stars = new THREE.Points(starGeometry, starMaterial);

  // Return the three.js object of the generated stars
  return stars;
}
