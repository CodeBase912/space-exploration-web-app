// Import the three.js module
import * as THREE from '../three.module.js';

/**
 * @classdesc the Planet class is designed to create a planet, it's orbit lines
 *            and it's rings (it the planet has rings) to be rendered in a
 *            three.js scene
 *
 *
 * @property {integer} planetRadius - represents the radius of the planet
 *
 * @property {integer} ringInnerRadius - represents the inner radius of the
 *                                       planet's rings
 *
 * @property {integer} ringOuterRadius - represents the outer radius of the
 *                                       planet's rings
 *
 * @property {integer} ringRotation - represents the rotation along the x-axis
 *                                    of the planet's rings. By default three.js
 *                                    will output the rings vertically aligned
 *                                    (parallel to the y-axis)
 *
 * @property {string} name - represents the name of the planet
 *
 * @property {string} planetTextureURL - represents the URL of the planet's
 *                                       texture
 *
 * @property {string} ringTextureURL - represents the URL of the rings's texture
 *
 * @property {integer} position - represents the planet's distance from the sun
 *
 * @property {integer} planetOrbitPosition - represents the planet's orbit
 *                                           rotation from the point where:
 *                                           x = 0,
 *                                           y = 0,
 *                                           z = @param position
 *
 */
export default class Planet {
  constructor(
    planetRadius,
    ringsInnerRadius,
    ringsOuterRadius,
    ringRotation,
    name,
    planetTextureURL,
    ringTextureURL,
    position,
    planetOrbitPosition
  ) {
    this.planetRadius = planetRadius;
    this.ringsInnerRadius = ringsInnerRadius;
    this.ringsOuterRadius = ringsOuterRadius;
    this.ringRotation = ringRotation;
    this.name = name;
    this.planetTexture = new THREE.TextureLoader().load(planetTextureURL);
    this.ringTexture = new THREE.TextureLoader().load(ringTextureURL);
    this.planet = new THREE.Object3D();
    this.position = position;
    this.planetOrbitPosition = planetOrbitPosition;
  }

  /**
   * @method createPlanet - creates a three.js 3D object of a planet
   *
   * @returns {object} - a three.js object of a planet
   */
  createPlanet() {
    // Check if the selected planet is the Sun
    if (this.name == 'Sun') {
      // The selected plane/celestial body is the Sun
      // Define the appropriate geometry for the Sun
      const planetGeometry = new THREE.SphereBufferGeometry(
        this.planetRadius,
        64,
        64
      );
      // Define the Sun's material and add it's texture
      const planetMaterial = new THREE.MeshBasicMaterial();
      planetMaterial.map = this.planetTexture;

      // Create the Sun's mesh
      const planet = new THREE.Mesh(planetGeometry, planetMaterial);

      // Add some properties to the planet
      planet.name = this.name;
      planet.castShadow = true;
      planet.receiveShadow = true;

      // Set the Sun's position
      planet.position.set(0, 0, this.position);

      // Add the generated 3D three.js object to the class porperty planet
      const planetBody = planet;
      this.planetBody = planetBody;
      this.planet.add(planetBody);

      // Return the generated 3D three.js object
      return planetBody;
    } else {
      // The selected planet/celestial bosy is not the Sun

      // Define the appropriate geometry for the selected planet
      const planetGeometry = new THREE.SphereBufferGeometry(
        this.planetRadius,
        64,
        64
      );

      // Define the planet's material
      const planetMaterial = new THREE.MeshStandardMaterial();

      // Check if the selected planet is the Earth. I do this because we want
      // the earth to be slightly more reflective than the other planets
      if (this.name == 'Earth') {
        // The selected planet is Earth, therefore add the relevant
        // properties to the planet's material to make it a slightly more
        // relective
        planetMaterial.metalness = 0.9;
        planetMaterial.roughness = 0.7;
      } else {
        // The seleceted planet is not Earth, therefore add the relevant
        // properties to the planet's material to have the standard
        // reflectivness
        planetMaterial.metalness = 0.7;
        planetMaterial.roughness = 0.8;
      }

      // Add the planet's texture to the material
      planetMaterial.map = this.planetTexture;

      // Create the 3D three.js object of the selected planet
      const planet = new THREE.Mesh(planetGeometry, planetMaterial);

      // Add some properties to the generated 3D three.js object
      planet.name = this.name;
      planet.castShadow = true;
      planet.receiveShadow = true;

      /**
       * Here I just define the distance of the planet from the Sun. The
       * planet's final position in the three.js scene will be determine
       * by the @method setPlanetOrbitPosition.
       */
      planet.position.set(0, 0, this.position);

      // Add the generated 3D three.js object to the class porperty planet
      const planetBody = planet;
      this.planetBody = planetBody;
      this.planet.add(planetBody);

      // Here we again check if the selected planet is Earth. We do this
      // second check because I want planet Earth to be rendered with a
      // second 3D three.js object that is transparent and meant to render
      // Earth's clouds to make Earth look more realistic
      if (this.name == 'Earth') {
        // The selected planet is Earth, therefore create the second 3D
        // three.js object

        // Define the clouds geometry
        const planetCloudsGeometry = new THREE.SphereBufferGeometry(
          this.planetRadius + 0.005,
          64,
          64
        );

        // Define the clouds' material and add the clouds' texture to it
        const planetCloudsMaterial = new THREE.MeshPhongMaterial();
        planetCloudsMaterial.map = new THREE.TextureLoader().load(
          '../../img/8k_earth_clouds.jpg'
        );

        // Add some properties to the clouds' material
        planetCloudsMaterial.opacity = 0.3;
        planetCloudsMaterial.transparent = true;

        // Create the 3d three.js object of the clouds
        const planetClouds = new THREE.Mesh(
          planetCloudsGeometry,
          planetCloudsMaterial
        );

        // Add some properties to the generated 3D three.js object
        planetClouds.name = this.name + '-clouds';
        planetClouds.castShadow = true;
        planetClouds.receiveShadow = true;

        // As with the planet Earth, just define the distance of the
        // clouds here and add it to the class property planet
        planetClouds.position.set(0, 0, this.position);
        this.planet.add(planetClouds);
      }

      // Return the generated 3D three.js object
      return planetBody;
    }
  }

  /**
   * @function addRings - creates the rings of a planet. The generated ring
   *                      is added to the class property planet
   */
  addRings() {
    // Define the texture of the rings
    const texture = this.ringTexture;

    // Define the material of the rings and apply the rings' texture to it
    const ringMaterial = new THREE.MeshBasicMaterial({
      map: texture,
      side: THREE.DoubleSide,
      color: 0xffffff,
      transparent: true,
      opacity: 0.5,
    });

    // Define the ring's geometry
    const ringGeometry = new THREE.RingBufferGeometry(
      this.ringsInnerRadius,
      this.ringsOuterRadius,
      64
    );

    // Here the orientation of how the texture is mapped onto the rings'
    // material is changed. The mapping is transformed to a radial mapping
    var pos = ringGeometry.attributes.position;
    var v3 = new THREE.Vector3();
    for (let i = 0; i < pos.count; i++) {
      v3.fromBufferAttribute(pos, i);
      ringGeometry.attributes.uv.setXY(i, v3.length() < 5 ? 0 : 1, 1);
    }

    // Create the 3D three.js object of the rings
    const ring = new THREE.Mesh(ringGeometry, ringMaterial);

    // Add some properties to the generated 3d three.js object
    ring.castShadow = true;
    ring.receiveShadow = true;

    /**
     * Here we just define position of the rings to be the same as the
     * distance of the planet from the Sun and add it to the class property
     * planet. The planet's final position in the three.js scene will be
     * determine by the @method setPlanetOrbitPosition.
     */
    ring.position.set(0, 0, this.position);

    // Check if the selected planet is Saturn or Uranus. This is done because
    // the orientation of the rings of Saturn and Uranus are different and we
    // have to model that in our three.js scene
    if (this.name == 'Saturn') {
      // The selected plant is Saturn, therefore apply the relevant rotation
      // to the planet's rings
      ring.rotation.x = this.ringRotation;
    } else if (this.name == 'Uranus') {
      // The selected plant is Uranus, therefore apply the relevant rotation
      // to the planet's rings
      ring.rotation.y = this.ringRotation;
    }

    // Add the generated 3D three.js object of the planet's rings to the
    // class property plant
    this.planet.add(ring);
  }

  /**
   * @function addOrbits - adds the planet's orbit line. The generated orbit
   *                       line are added to the class property planet
   */
  addOrbits() {
    // Define the geometry of the orbit line
    const planetOrbitCurve = new THREE.EllipseCurve(
      0,
      0, // ax, aY
      this.position,
      this.position, // xRadius, yRadius
      0,
      2 * Math.PI, // aStartAngle, aEndAngle
      false, // aClockwise
      0 // aRotation
    );

    // Determine the number of points in the line. Three.js interpolates
    // the line between the given number of points. So for a more smooth
    // curve a large number of points is required. Here I found 500 to be
    // sufficent for a moderatly smopth curve
    const planetOrbitPoints = planetOrbitCurve.getPoints(200);
    const planetOrbitGeometry = new THREE.BufferGeometry().setFromPoints(
      planetOrbitPoints
    );

    // Define the material for the orbit line
    const planetOrbitMaterial = new THREE.LineBasicMaterial({
      // Add the color of the orbit line to the material
      color: 0xe3e3e3,
    });

    // Create the 3D three.js object of the orbit line
    const planetOrbit = new THREE.Line(
      planetOrbitGeometry,
      planetOrbitMaterial
    );

    // Set the orientation of the orbit line to be along the orbital-axis
    // of the planet, i.e. along the x-axis
    planetOrbit.rotation.x = 80.11;

    // Add the generated 3D three.js object of the orbit line to the class
    // property planet
    this.planet.add(planetOrbit);
  }

  /**
   * @function setPlanetOrbitPosition - sets the Planet's physical locaiton
   *                                    in the three.js scene
   *
   * @returns {object} - an object of the planet's position and radius. I
   *                     return the planet's radius here because it is
   *                     useful for determining the position of the camera
   *                     when navigating to the selected planet in the
   *                     three.js scene
   */
  setPlanetOrbitPosition() {
    // Set the planets physical position in the three.js scene by rotating
    // the class property planet using the class property planetOrbitPosition
    let planetRotation = this.planetOrbitPosition;
    this.planet.rotation.y = planetRotation;

    // Determine the new location of the Planet using the following formula:
    // Transformation about the y-axis
    // Xnew = Zold x sinθ + Xold x cosθ
    // Ynew = Yold
    // Znew = Yold x cosθ – Xold x sinθ
    const planetLocation = {
      name: this.name,
      x:
        this.planetBody.position.z * Math.sin(planetRotation) +
        this.planetBody.position.x * Math.cos(planetRotation),
      y: this.planetBody.position.y,
      z:
        this.planetBody.position.z * Math.cos(planetRotation) -
        this.planetBody.position.x * Math.sin(planetRotation),
      radius: this.planetBody.geometry.parameters.radius,
    };

    // Return the generated object of the Planet's new location
    return planetLocation;
  }
}
