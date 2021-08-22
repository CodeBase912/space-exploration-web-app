import * as THREE from "../three.module.js";
import "../tween.umd.js";

export function moveCameraForward(camera, controls, planets, state) {
    // Find the active planet/selected planet from the state variable
    const planetIndex = state.findIndex(element => element == 1);
    if (planetIndex < planets.length - 1) {
        state[planetIndex] = 0;
        state[planetIndex + 1] = 1;
        // controls.enabled = false;
        const coords = { x: camera.position.x, y: camera.position.y, z: camera.position.z };
        new TWEEN.Tween(coords)
        .to({ x: planets[planetIndex + 1].x, y: planets[planetIndex + 1].y + planets[planetIndex + 1].radius, z: planets[planetIndex + 1].z + planets[planetIndex + 1].radius * 2 }, 2200)
        .onUpdate(() => {
            camera.position.set(coords.x, coords.y, coords.z);
            // camera.lookAt(planets[planetIndex + 1].x, planets[planetIndex + 1].y, planets[planetIndex + 1].z);

            // backup original rotation
            const startRotation = new THREE.Euler().copy( camera.rotation );

            // final rotation (with lookAt)
            camera.lookAt(planets[planetIndex + 1].x, planets[planetIndex + 1].y, planets[planetIndex + 1].z);
            const endRotation = new THREE.Euler().copy( camera.rotation );

            // revert to original rotation
            camera.rotation.copy( startRotation );

            // Tween
            new TWEEN.Tween(camera.rotation).to({x: endRotation.x, y: endRotation.y, z: endRotation.z}, 50).start();
        }
        ).onComplete(() => {
            // let controls = new OrbitControls( camera, renderer.domElement );
            // controls.enabled = true;
            controls.target.set(planets[planetIndex + 1].x, planets[planetIndex + 1].y, planets[planetIndex + 1].z);
        })
        .start();

        document.querySelector(".planet-name").innerHTML = planets[planetIndex + 1].name;
    }
}


export function moveCameraBackward(camera, controls, planets, state) {
    // Find the active planet/selected planet from the state variable
    const planetIndex = state.findIndex(element => element == 1);
    if (planetIndex > 0) {
        state[planetIndex] = 0;
        state[planetIndex - 1] = 1;
        const coords = { x: camera.position.x, y: camera.position.y, z: camera.position.z };
        new TWEEN.Tween(coords)
        .to({ x: planets[planetIndex - 1].x, y: planets[planetIndex - 1].y + 0.8, z: planets[planetIndex - 1].z + planets[planetIndex - 1].radius * 2 }, 2200)
        .onUpdate(() => {
            camera.position.set(coords.x, coords.y, coords.z);
            // camera.lookAt(planets[planetIndex - 1].position.x, planets[planetIndex - 1].position.y, planets[planetIndex - 1].position.z)

            // backup original rotation
            const startRotation = new THREE.Euler().copy( camera.rotation );

            // final rotation (with lookAt)
            camera.lookAt(planets[planetIndex - 1].x, planets[planetIndex - 1].y, planets[planetIndex - 1].z);
            const endRotation = new THREE.Euler().copy( camera.rotation );

            // revert to original rotation
            camera.rotation.copy( startRotation );

            // Tween
            new TWEEN.Tween(camera.rotation).to({x: endRotation.x, y: endRotation.y, z: endRotation.z}, 50).start();
        }
        ).onComplete(() => {
            // let controls = new OrbitControls( camera, renderer.domElement );
            controls.target.set(planets[planetIndex - 1].x, planets[planetIndex - 1].y, planets[planetIndex - 1].z);
        })
        .start();

        document.querySelector(".planet-name").innerHTML = planets[planetIndex - 1].name;
    }
}