const holographicElement = document.getElementById('holographic');

const deviceMotionEventPermissionGranted = false;

function updateHolographicBackground(value, rotation = 0) {
  const percentage = value * 100;
  holographicElement.style.backgroundPosition = `${percentage}%`;
  if (rotation) {
    holographicElement.style.mozTransform = `rotate(${rotation}deg)`;
    holographicElement.style.msTransform = `rotate(${rotation}deg)`;
    holographicElement.style.oTransform = `rotate(${rotation}deg)`;
    holographicElement.style.transform = `rotate(${rotation}deg)`;
  }
}

function handleMouseMove(event) {
  const x = event.clientX;
  const width = document.documentElement.clientWidth;
  const value = x / width;
  updateHolographicBackground(value);
}

function handleDeviceOrientation(event) {
  const value = Math.abs(event.gamma) / 90;
  const rotation = Math.abs(event.alpha);
  updateHolographicBackground(value, rotation);
}

function updateClock() {
  const now = new Date();
  // const milli = now.getMilliseconds() / 10;
  const milli =
    parseInt(`${`${now.getSeconds()}`.slice(-1)}${`00${now.getMilliseconds()}`.slice(-3)}`, 10) /
    100;
  let valor;
  console.log(milli);
  if (milli < 50) {
    valor = milli * 2;
  } else {
    valor = 100 - (milli * 2 - 100);
  }
  holographicElement.style.backgroundPosition = `${valor}%`;
}

function initClock() {
  updateClock();
  setInterval(function () {
    updateClock();
  }, 10);
}

function handleTouchend() {
  if (!deviceMotionEventPermissionGranted) {
    // feature detect
    if (typeof DeviceOrientationEvent.requestPermission === 'function') {
      DeviceOrientationEvent.requestPermission()
        .then((permissionState) => {
          if (permissionState === 'granted') {
            window.addEventListener('deviceorientation', handleDeviceOrientation, true);
          } else {
            initClock();
          }
        })
        .catch(console.error);
    } else {
      window.addEventListener('deviceorientation', handleDeviceOrientation, true);
    }
  }
}

if (window.DeviceOrientationEvent) {
  holographicElement.addEventListener('touchend', handleTouchend);
}

holographicElement.addEventListener('mousemove', handleMouseMove, true);
