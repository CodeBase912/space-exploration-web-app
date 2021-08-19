
export function updateInfo(state, planets, data) {
    // Determine which planet is active
    const planetIndex = state.findIndex(element => element == 1);
    const planet = data.bodies.find((planet) => {
        if (planet.englishName == planets[planetIndex].name) {
            return true;
        }
    });

    const planetName = document.querySelector('#planet-name');
    const moons = document.querySelector('#moons');
    const diameter = document.querySelector('#diameter');
    const mass = document.querySelector('#mass');
    const gravity = document.querySelector('#gravity');
    const orbitalPeriod = document.querySelector('#orbital-period');
    const discoveredBy = document.querySelector('#discovered-by');

    planetName.innerHTML = planet.englishName;
    if (planet.moons === null) {
        moons.innerHTML = '';
    }
    else {
        if (planet.moons.length > 1) {
            moons.innerHTML = planet.moons.length + " moons";
        }
        else {
            moons.innerHTML = planet.moons.length + " moon";
        }
    }

    diameter.innerHTML = "<span>Diameter:</span> <br>" + planet.meanRadius * 2 + " km";
    mass.innerHTML = "<span>Mass:</span> <br>" + planet.mass.massValue + " x 10<sup>" + planet.mass.massExponent + "</sup>";
    if (planet.gravity == 0) {
        gravity.innerHTML = "";
    }
    else {
        gravity.innerHTML = "<span>Gravity:</span> <br>" + planet.gravity + " m.s<sup>-2</sup>";
    }
    if (planet.englishName == "Sun") {
        orbitalPeriod.innerHTML = "";
    }
    else {
        orbitalPeriod.innerHTML = "<span>Year:</span> <br>" + planet.sideralOrbit + " earth days";
    }
    if (planet.discoveredBy == "") {
        discoveredBy.innerHTML = "";
    }
    else {
        discoveredBy.innerHTML = "<span>Siscovered by:</span> <br>" + planet.discoveredBy + " (" + planet.discoveryDate + ")";
    }

}