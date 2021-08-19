import * as THREE from "../three.module.js";

export function createAsteroidBelt(innerRadius, beltRadius) {
    //Make a belt 3D Object
    const belt = new THREE.Object3D();

    const asteriodGeometry = new THREE.BufferGeometry();
    const asteriodrMaterial = new THREE.PointsMaterial({
        color: 0xffffff,
        size: 0.2,
    });

    // Define an array that will hold all the star positions
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

    // In order for the stars to be visible we need to set the star positions an 
    // attribute to the starGeometry
    // However this matrix has to be a floa32 buffer attribute, for this we need
    // use the float32BufferAttribute object provided by three.js
    asteriodGeometry.setAttribute('position', new THREE.Float32BufferAttribute(asteriodVertices, 3));

    const asteriods = new THREE.Points(asteriodGeometry, asteriodrMaterial);

    belt.add(asteriods);

    return belt
}