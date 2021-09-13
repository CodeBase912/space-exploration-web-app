import * as THREE from '../three.module.js';
import '../tween.umd.js';

export function moveCameraForward(camera, controls, planets, state) {
  // Find the active planet/selected planet from the state variable
  const planetIndex = state.findIndex((element) => element == 1);
  if (planetIndex < planets.length - 1) {
    state[planetIndex] = 0;
    state[planetIndex + 1] = 1;
    // controls.enabled = false;
    const coords = {
      x: camera.position.x,
      y: camera.position.y,
      z: camera.position.z,
    };

    const qmRotation = new THREE.Quaternion(); //initiate an empty Qt to be filled by the .slerp function

    // backup original rotation
    const startRotation = new THREE.Euler().copy(camera.rotation);

    // final rotation (with lookAt)
    camera.lookAt(
      planets[planetIndex + 1].x,
      planets[planetIndex + 1].y,
      planets[planetIndex + 1].z
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
        500
      )
      .easing(TWEEN.Easing.Quadratic.InOut)
      .onUpdate(function () {
        qmRotation.slerp(endRotation, this.t);
        // THREE.Quaternion.slerp(curQuaternion, targetQuaternion, qm, this.t);
        qmRotation.normalize();
      })
      .onComplete(() => {
        tween.start();
      });

    tweenRotation.start();

    //tweens between zero and 1 values along Quaternion's SLERP method (http://threejs.org/docs/#Reference/Math/Quaternion)

    const qm = new THREE.Quaternion(); //initiate an empty Qt to be filled by the .slerp function

    // final rotation (with lookAt)
    camera.position.set(
      planets[planetIndex + 1].x,
      planets[planetIndex + 1].y + planets[planetIndex + 1].radius,
      planets[planetIndex + 1].z + planets[planetIndex + 1].radius * 2
    );
    const targetQuaternion = camera.quaternion;

    // revert to original rotation
    camera.position.set(coords.x, coords.y, coords.z);

    const curQuaternion = camera.quaternion; //the starting point of your rotation

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
        const qmRotation = new THREE.Quaternion(); //initiate an empty Qt to be filled by the .slerp function

        // backup original rotation
        const startRotation = new THREE.Euler().copy(camera.rotation);

        // final rotation (with lookAt)
        camera.lookAt(
          planets[planetIndex + 1].x,
          planets[planetIndex + 1].y,
          planets[planetIndex + 1].z
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
        // // let controls = new OrbitControls( camera, renderer.domElement );
        // controls.enabled = true;
        controls.target.set(
          planets[planetIndex + 1].x,
          planets[planetIndex + 1].y,
          planets[planetIndex + 1].z
        );

        // tweenRotation.start();
      });

    document.querySelector('.planet-name').innerHTML =
      planets[planetIndex + 1].name;
  }
}

export function moveCameraBackward(camera, controls, planets, state) {
  // Find the active planet/selected planet from the state variable
  const planetIndex = state.findIndex((element) => element == 1);
  if (planetIndex > 0) {
    state[planetIndex] = 0;
    state[planetIndex - 1] = 1;
    const coords = {
      x: camera.position.x,
      y: camera.position.y,
      z: camera.position.z,
    };

    const qmRotation = new THREE.Quaternion(); //initiate an empty Qt to be filled by the .slerp function

    // backup original rotation
    const startRotation = new THREE.Euler().copy(camera.rotation);

    // final rotation (with lookAt)
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
        500
      )
      .easing(TWEEN.Easing.Quadratic.InOut)
      .onUpdate(function () {
        qmRotation.slerp(endRotation, this.t);
        // THREE.Quaternion.slerp(curQuaternion, targetQuaternion, qm, this.t);
        qmRotation.normalize();
      })
      .onComplete(() => {
        tween.start();
      });

    tweenRotation.start();

    //tweens between zero and 1 values along Quaternion's SLERP method (http://threejs.org/docs/#Reference/Math/Quaternion)

    const qm = new THREE.Quaternion(); //initiate an empty Qt to be filled by the .slerp function

    // final rotation (with lookAt)
    camera.position.set(
      planets[planetIndex - 1].x,
      planets[planetIndex - 1].y + 0.8,
      planets[planetIndex - 1].z + planets[planetIndex - 1].radius * 2
    );
    const targetQuaternion = camera.quaternion;

    // revert to original rotation
    camera.position.set(coords.x, coords.y, coords.z);

    const curQuaternion = camera.quaternion; //the starting point of your rotation

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
        const qmRotation = new THREE.Quaternion(); //initiate an empty Qt to be filled by the .slerp function

        // backup original rotation
        const startRotation = new THREE.Euler().copy(camera.rotation);

        // final rotation (with lookAt)
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
        // // let controls = new OrbitControls( camera, renderer.domElement );
        // controls.enabled = true;
        controls.target.set(
          planets[planetIndex - 1].x,
          planets[planetIndex - 1].y,
          planets[planetIndex - 1].z
        );

        // tweenRotation.start();
      });

    document.querySelector('.planet-name').innerHTML =
      planets[planetIndex - 1].name;
  }
}
