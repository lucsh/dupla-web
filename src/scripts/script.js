const holographicElement = document.getElementById("holographic");

let deviceMotionEventPermissionGranted = false;

function updateHolographicBackground(value, rotation = 0) {
  const percentage = value * 100;
  holographicElement.style.backgroundPosition = percentage + "%";
  if (rotation){
    holographicElement.style.mozTransform    = `rotate(${rotation}deg)`;
    holographicElement.style.msTransform     = `rotate(${rotation}deg)`;
    holographicElement.style.oTransform      = `rotate(${rotation}deg)`;
    holographicElement.style.transform       = `rotate(${rotation}deg)`;
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

function handleTouchend() {
  if (!deviceMotionEventPermissionGranted) {
    // feature detect
    if (typeof DeviceOrientationEvent.requestPermission === "function") {
      DeviceOrientationEvent.requestPermission()
        .then((permissionState) => {
          if (permissionState === "granted") {
            window.addEventListener(
              "deviceorientation",
              handleDeviceOrientation,
              true
            );
          } // TODO else timer
        })
        .catch(console.error);
    } else {
      window.addEventListener(
        "deviceorientation",
        handleDeviceOrientation,
        true
      );
    }
  }
}

if (window.DeviceOrientationEvent) {
  holographicElement.addEventListener("touchend", handleTouchend);
}

holographicElement.addEventListener("mousemove", handleMouseMove, true);
