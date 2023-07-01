import React from "react";
import mapboxgl from 'mapbox-gl';
import "./Globe.css";

const Globe = () => {
	mapboxgl.accessToken = 'pk.eyJ1IjoiY2FsZWJyZWFsc211cmYiLCJhIjoiY2xqazVzN2JyMGZnYjNwcTk4eGZmbHk0aiJ9.gCudJOG6oeYzGsuTlstEkg';
  const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/satellite-v9',
    projection: 'globe', // Display the map as a globe, since satellite-v9 defaults to Mercator
    zoom: 1.5,
    center: [-90, 40]
  });
  map.on('style.load', () => {
    map.setFog({}); // Set the default atmosphere style
  });

  // The following values can be changed to control rotation speed:

  // At low zooms, complete a revolution every two minutes.
  const secondsPerRevolution = 120;
  // Above zoom level 5, do not rotate.
  const maxSpinZoom = 5;
  // Rotate at intermediate speeds between zoom levels 3 and 5.
  const slowSpinZoom = 3;

  let userInteracting = false;
  let spinEnabled = true;

  function spinGlobe() {
    const zoom = map.getZoom();
    if (spinEnabled && !userInteracting && zoom < maxSpinZoom) {
        let distancePerSecond = 360 / secondsPerRevolution;
        if (zoom > slowSpinZoom) {
            // Slow spinning at higher zooms
            const zoomDif =
                (maxSpinZoom - zoom) / (maxSpinZoom - slowSpinZoom);
            distancePerSecond *= zoomDif;
        }
        const center = map.getCenter();
        center.lng -= distancePerSecond;
        // Smoothly animate the map over one second.
        // When this animation is complete, it calls a 'moveend' event.
        map.easeTo({ center, duration: 1000, easing: (n) => n });
    }
  }

  // Pause spinning on interaction
  map.on('mousedown', () => {
      userInteracting = true;
  });

  // Restart spinning the globe when interaction is complete
  map.on('mouseup', () => {
      userInteracting = false;
      spinGlobe();
  });

  // These events account for cases where the mouse has moved
  // off the map, so 'mouseup' will not be fired.
  map.on('dragend', () => {
      userInteracting = false;
      spinGlobe();
  });
  map.on('pitchend', () => {
      userInteracting = false;
      spinGlobe();
  });
  map.on('rotateend', () => {
      userInteracting = false;
      spinGlobe();
  });

  // When animation is complete, start spinning if there is no ongoing interaction
  map.on('moveend', () => {
      spinGlobe();
  });

  document.getElementById('btn-spin').addEventListener('click', (e) => {
      spinEnabled = !spinEnabled;
      if (spinEnabled) {
          spinGlobe();
          e.target.innerHTML = 'Pause rotation';
      } else {
          map.stop(); // Immediately end ongoing animation
          e.target.innerHTML = 'Start rotation';
      }
  });

  spinGlobe();
  
  return (
    <>
        <div id="map"></div>
        <button id="btn-spin">Pause rotation</button>
    </>
  )
}

export default Globe;