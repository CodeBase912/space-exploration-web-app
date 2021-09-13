import * as THREE from '../three.module.js';

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
    /**Input Varibales:

         * @param {integer} planetRadius represents the radius of the planet

         * @param {integer} ringInnerRadius represents the inner radius of the planet's rings

         * @param {integer} ringOuterRadius represents the outer radius of the planet's rings

         * @param {integer} ringRotation represents the rotation along the x-axis of the planet's
           rings. By default three.js will output the rings vertically aligned (parallel to the y-axis)

         * @param {string} name represents the name of the planet

         * @param {string} planetTextureURL represents the URL of the planet's texture

         * @param {string} ringTextureURL represents the URL of the rings's texture

         * @param {integer} position represents the planet's distance from the sun

         * @param {integer} planetOrbitPosition represents the planet's orbit rotation from the point
           (x = 0, y = 0, z = position)

        */

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

  createPlanet() {
    if (this.name == 'Sun') {
      const planetGeometry = new THREE.SphereBufferGeometry(
        this.planetRadius,
        64,
        64
      );
      const planetMaterial = new THREE.MeshBasicMaterial();
      planetMaterial.map = this.planetTexture;
      const planet = new THREE.Mesh(planetGeometry, planetMaterial);
      planet.name = this.name;
      planet.castShadow = true;
      planet.receiveShadow = true;
      planet.position.set(0, 0, this.position);
      const planetBody = planet;
      this.planetBody = planetBody;
      this.planet.add(planetBody);
      return planetBody;
    } else {
      const planetGeometry = new THREE.SphereBufferGeometry(
        this.planetRadius,
        64,
        64
      );
      const planetMaterial = new THREE.MeshStandardMaterial();
      if (this.name == 'Earth') {
        planetMaterial.metalness = 0.9;
        planetMaterial.roughness = 0.7;
      } else {
        planetMaterial.metalness = 0.7;
        planetMaterial.roughness = 0.8;
      }
      planetMaterial.map = this.planetTexture;
      const planet = new THREE.Mesh(planetGeometry, planetMaterial);
      planet.name = this.name;
      planet.castShadow = true;
      planet.receiveShadow = true;
      planet.position.set(0, 0, this.position);
      const planetBody = planet;
      this.planetBody = planetBody;
      this.planet.add(planetBody);
      if (this.name == 'Earth') {
        const planetCloudsGeometry = new THREE.SphereBufferGeometry(
          this.planetRadius + 0.005,
          64,
          64
        );
        const planetCloudsMaterial = new THREE.MeshPhongMaterial();
        planetCloudsMaterial.map = new THREE.TextureLoader().load(
          '../../img/8k_earth_clouds.jpg'
        );
        planetCloudsMaterial.opacity = 0.3;
        planetCloudsMaterial.transparent = true;
        const planetClouds = new THREE.Mesh(
          planetCloudsGeometry,
          planetCloudsMaterial
        );
        planetClouds.name = this.name + '-clouds';
        planetClouds.castShadow = true;
        planetClouds.receiveShadow = true;
        planetClouds.position.set(0, 0, this.position);
        this.planet.add(planetClouds);
      }
      return planetBody;
    }
  }

  addRings() {
    const texture = this.ringTexture;

    const ringMaterial = new THREE.MeshBasicMaterial({
      map: texture,
      side: THREE.DoubleSide,
      color: 0xffffff,
      transparent: true,
      opacity: 0.5,
    });

    const ringGeometry = new THREE.RingBufferGeometry(
      this.ringsInnerRadius,
      this.ringsOuterRadius,
      64
    );

    var pos = ringGeometry.attributes.position;
    var v3 = new THREE.Vector3();
    for (let i = 0; i < pos.count; i++) {
      v3.fromBufferAttribute(pos, i);
      ringGeometry.attributes.uv.setXY(i, v3.length() < 5 ? 0 : 1, 1);
    }

    const ring = new THREE.Mesh(ringGeometry, ringMaterial);
    ring.castShadow = true;
    ring.receiveShadow = true;
    ring.position.set(0, 0, this.position);
    if (this.name == 'Saturn') {
      ring.rotation.x = this.ringRotation;
    } else if (this.name == 'Uranus') {
      ring.rotation.y = this.ringRotation;
    }
    this.planet.add(ring);
  }

  addOrbits() {
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

    const planetOrbitPoints = planetOrbitCurve.getPoints(200);
    const planetOrbitGeometry = new THREE.BufferGeometry().setFromPoints(
      planetOrbitPoints
    );

    const planetOrbitMaterial = new THREE.LineBasicMaterial({
      color: 0xe3e3e3,
    });

    // Create the final object to add to the scene
    const planetOrbit = new THREE.Line(
      planetOrbitGeometry,
      planetOrbitMaterial
    );
    planetOrbit.rotation.x = 80.11;
    this.planet.add(planetOrbit);
  }

  setPlanetOrbitPosition() {
    let planetRotation = this.planetOrbitPosition;
    this.planet.rotation.y = planetRotation;

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
    // console.log(saturn.children[0].position);
    // console.log("saturn position: "+ saturnLocation.x, saturnLocation.y, saturnLocation.z);

    return planetLocation;
  }
}
