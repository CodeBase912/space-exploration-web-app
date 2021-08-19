import * as THREE from "../three.module.js";

export function createStars() {
    const starGeometry = new THREE.BufferGeometry();
    const starMaterial = new THREE.PointsMaterial({
        color: 0xB4B4B4
    });

    // Define an array that will hold all the star positions
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

    // In order for the stars to be visible we need to set the star positions an 
    // attribute to the starGeometry
    // However this matrix has to be a floa32 buffer attribute, for this we need
    // use the float32BufferAttribute object provided by three.js
    starGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starVertices, 3));

    const stars = new THREE.Points(starGeometry, starMaterial);
    return stars;
}