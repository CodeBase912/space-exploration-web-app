import * as THREE from '../three.module.js';
import '../tween.umd.js';

/**
 * @function moveCameraBackward - smoothly moves the camera to the next outer
 *                                planet from the current in focus/selected
 *                                planet. The function uses TWEEN and three.js
 *                                Quarternions to smoothly animate the camera's
 *                                motion
 *
 * @param {object} camera - the camera of the three.js scene
 *
 * @param {object} controls - the orbit controls of the three.js scene
 *
 * @param {array} planets - an array of all the planets locations in the
 *                          three.js scene
 *
 * @param {array} state - the application state variable that determines
 *                        which planet is in focus/selected
 */
export function moveCameraForward(camera, controls, planets, state) {
  // Find the active planet/selected planet from the state variable
  const planetIndex = state.findIndex((element) => element == 1);
  // Check if the selected planet is the last/outer-most planet
  if (planetIndex < planets.length - 1) {
    // If the selected planet if not the last planet then move camera to the next
    // outer planet
    state[planetIndex] = 0;
    state[planetIndex + 1] = 1;
    // Define the initial posiiton of the camera
    const coords = {
      x: camera.position.x,
      y: camera.position.y,
      z: camera.position.z,
    };

    // Define an empty Quaternion to be filled by the .slerp function in the
    // TWEEN animation's .onUpdate function for the camera's rotation
    const qmRotation = new THREE.Quaternion();

    // Backup original rotation
    const startRotation = new THREE.Euler().copy(camera.rotation);

    // Final rotation (with lookAt)
    camera.lookAt(
      planets[planetIndex + 1].x,
      planets[planetIndex + 1].y,
      planets[planetIndex + 1].z
    );
    const endRotation = new THREE.Euler().copy(camera.rotation);
    const targetQuaternionForRotation = camera.quaternion;

    // Revert to original rotation
    camera.rotation.copy(startRotation);

    // Define the starting point of the camera rotation
    const curQuaternionForRotation = camera.quaternion;

    // Define the camera's rotation TWEEN animation
    const tweenRotation = new TWEEN.Tween({
      camera: camera.rotation,
      t: 0,
    })
      .to(
        {
          camera: {
            x: endRotation.x,
            y: endRotation.y,
            z: endRotation.z,
          },
          t: 0.01,
        },
        500
      )
      .easing(TWEEN.Easing.Quadratic.InOut)
      .onUpdate(function () {
        qmRotation.slerp(endRotation, this.t);
        // THREE.Quaternion.slerp(curQuaternion, targetQuaternion, qm, this.t);
        qmRotation.normalize();
      })
      .onComplete(() => {
        // Once the initial camera rotation animation is complete start the
        // camera position animation
        tween.start();
      });

    // Start the camera rotation animation
    tweenRotation.start();

    // Define an empty Quaternion to be filled by the .slerp function in the
    // TWEEN animation's .onUpdate function for the camera's posiiton
    const qm = new THREE.Quaternion();

    // Final rotation (with lookAt)
    camera.position.set(
      planets[planetIndex + 1].x,
      planets[planetIndex + 1].y + planets[planetIndex + 1].radius,
      planets[planetIndex + 1].z + planets[planetIndex + 1].radius * 2
    );
    const targetQuaternion = camera.quaternion;

    // Revert to original rotation
    camera.position.set(coords.x, coords.y, coords.z);

    // Define the starting point of the camera's posiiton
    const curQuaternion = camera.quaternion;

    // Define the camera's position TWEEN animation
    const tween = new TWEEN.Tween({ camera: camera.position, t: 0 })
      .to(
        {
          camera: {
            x: planets[planetIndex + 1].x,
            y: planets[planetIndex + 1].y + planets[planetIndex + 1].radius,
            z: planets[planetIndex + 1].z + planets[planetIndex + 1].radius * 2,
          },
          t: 1,
        },
        2200
      )
      .easing(TWEEN.Easing.Quadratic.InOut)
      .onUpdate(function () {
        // Define an empty Quaternion to be filled by the .slerp function in the
        // TWEEN animation's .onUpdate function for the camera's rotation
        const qmRotation = new THREE.Quaternion();

        // Backup original rotation
        const startRotation = new THREE.Euler().copy(camera.rotation);

        // Final rotation (with lookAt)
        camera.lookAt(
          planets[planetIndex + 1].x,
          planets[planetIndex + 1].y,
          planets[planetIndex + 1].z
        );
        const endRotation = new THREE.Euler().copy(camera.rotation);
        const targetQuaternionForRotation = camera.quaternion;

        // Revert to original rotation
        camera.rotation.copy(startRotation);

        // The starting point of the camera's rotation
        const curQuaternionForRotation = camera.quaternion;

        // The camera's rotation TWEEN animation
        const tweenRotation = new TWEEN.Tween({
          camera: camera.rotation,
          t: 0,
        })
          .to(
            {
              camera: {
                x: endRotation.x,
                y: endRotation.y,
                z: endRotation.z,
              },
              t: 0.01,
            },
            50
          )
          .easing(TWEEN.Easing.Quadratic.InOut)
          .onUpdate(function () {
            qmRotation.slerp(endRotation, this.t);
            qmRotation.normalize();
          });

        // Start the camera'a rotation TWEEN animation
        tweenRotation.start();

        qm.slerp(targetQuaternion, this.t);
        qm.normalize();
      })
      .onComplete(() => {
        // Once the animation is complete, update the target of the orbit
        // controls
        controls.target.set(
          planets[planetIndex + 1].x,
          planets[planetIndex + 1].y,
          planets[planetIndex + 1].z
        );
      });

    // Update the HTML DOM element that display's the planet's name in the
    // planet info tab
    document.querySelector('.planet-name').innerHTML =
      planets[planetIndex + 1].name;
  }
}

/**
 * @function moveCameraBackward - smoothly moves the camera to the next inner
 *                                planet from the current in focus/selected
 *                                planet. The function uses TWEEN and three.js
 *                                Quarternions to smoothly animate the camera's
 *                                motion
 *
 * @param {object} camera - the camera of the three.js scene
 *
 * @param {object} controls - the orbit controls of the three.js scene
 *
 * @param {array} planets - an array of all the planets locations in the
 *                          three.js scene
 *
 * @param {array} state - the application state variable that determines
 *                        which planet is in focus/selected
 */
export function moveCameraBackward(camera, controls, planets, state) {
  // Find the active planet/selected planet from the state variable
  const planetIndex = state.findIndex((element) => element == 1);
  // Check if the selected planet is the first/inner-most planet
  if (planetIndex > 0) {
    // If the selected planet is not the first/inner-most planet then move
    // camera to the next inner planet
    state[planetIndex] = 0;
    state[planetIndex - 1] = 1;
    // Define the camera's initial position
    const coords = {
      x: camera.position.x,
      y: camera.position.y,
      z: camera.position.z,
    };

    // Define an empty Quaternion to be filled by the .slerp function in the
    // TWEEN animation's .onUpdate function for the camera's rotation
    const qmRotation = new THREE.Quaternion();

    // Backup original rotation
    const startRotation = new THREE.Euler().copy(camera.rotation);

    // Final rotation (with lookAt)
    camera.lookAt(
      planets[planetIndex - 1].x,
      planets[planetIndex - 1].y,
      planets[planetIndex - 1].z
    );
    const endRotation = new THREE.Euler().copy(camera.rotation);
    const targetQuaternionForRotation = camera.quaternion;

    // Revert to original rotation
    camera.rotation.copy(startRotation);

    // The starting point of the camera's rotation
    const curQuaternionForRotation = camera.quaternion;

    // Define the camera's rotation TWEEN animation
    const tweenRotation = new TWEEN.Tween({
      camera: camera.rotation,
      t: 0,
    })
      .to(
        {
          camera: {
            x: endRotation.x,
            y: endRotation.y,
            z: endRotation.z,
          },
          t: 0.01,
        },
        500
      )
      .easing(TWEEN.Easing.Quadratic.InOut)
      .onUpdate(function () {
        qmRotation.slerp(endRotation, this.t);
        qmRotation.normalize();
      })
      .onComplete(() => {
        tween.start();
      });

    // Start the camera's rotation TWEEN animation
    tweenRotation.start();

    // Define an empty Quaternion to be filled by the .slerp function in the
    // TWEEN animation's .onUpdate function for the camera's position
    const qm = new THREE.Quaternion();

    // Final rotation (with lookAt)
    camera.position.set(
      planets[planetIndex - 1].x,
      planets[planetIndex - 1].y + 0.8,
      planets[planetIndex - 1].z + planets[planetIndex - 1].radius * 2
    );
    const targetQuaternion = camera.quaternion;

    // Revert to original rotation
    camera.position.set(coords.x, coords.y, coords.z);

    // The starting point of the camera's posiiton
    const curQuaternion = camera.quaternion;

    // Define the TWEEN animation for the camera's position
    const tween = new TWEEN.Tween({ camera: camera.position, t: 0 })
      .to(
        {
          camera: {
            x: planets[planetIndex - 1].x,
            y: planets[planetIndex - 1].y + 0.8,
            z: planets[planetIndex - 1].z + planets[planetIndex - 1].radius * 2,
          },
          t: 1,
        },
        2200
      )
      .easing(TWEEN.Easing.Quadratic.InOut)
      .onUpdate(function () {
        // Here we rotate the camera to look at the target planet

        // Define an empty Quaternion to be filled by the .slerp function in the
        // TWEEN animation's .onUpdate function for the camera's rotation
        const qmRotation = new THREE.Quaternion();

        // Backup original rotation
        const startRotation = new THREE.Euler().copy(camera.rotation);

        // Final rotation (with lookAt)
        camera.lookAt(
          planets[planetIndex - 1].x,
          planets[planetIndex - 1].y,
          planets[planetIndex - 1].z
        );
        const endRotation = new THREE.Euler().copy(camera.rotation);
        const targetQuaternionForRotation = camera.quaternion;

        // revert to original rotation
        camera.rotation.copy(startRotation);

        const curQuaternionForRotation = camera.quaternion; //the starting point of your rotation

        const tweenRotation = new TWEEN.Tween({
          camera: camera.rotation,
          t: 0,
        })
          .to(
            {
              camera: {
                x: endRotation.x,
                y: endRotation.y,
                z: endRotation.z,
              },
              t: 0.01,
            },
            50
          )
          .easing(TWEEN.Easing.Quadratic.InOut)
          .onUpdate(function () {
            qmRotation.slerp(endRotation, this.t);
            // THREE.Quaternion.slerp(curQuaternion, targetQuaternion, qm, this.t);
            qmRotation.normalize();
          });

        tweenRotation.start();

        qm.slerp(targetQuaternion, this.t);
        // THREE.Quaternion.slerp(curQuaternion, targetQuaternion, qm, this.t);
        qm.normalize();
      })
      .onComplete(() => {
        // Once the animation is complete update the target for the orbit
        // controls
        controls.target.set(
          planets[planetIndex - 1].x,
          planets[planetIndex - 1].y,
          planets[planetIndex - 1].z
        );
      });

    // Update the HTML DOM element that display's the planet's name in the
    // planet info tab
    document.querySelector('.planet-name').innerHTML =
      planets[planetIndex - 1].name;
  }
}
