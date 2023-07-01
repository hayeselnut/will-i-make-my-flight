import React, { useState }  from "react";
import {
  Card,
  Container,
  Center,
  Heading,
} from "@chakra-ui/react";
import { Link, Outlet} from "react-router-dom";
import mapboxgl from 'mapbox-gl';
import FadeIn from "react-fade-in";
import "./Background.css";

const Root = () => {
  mapboxgl.accessToken = 'pk.eyJ1IjoiY2FsZWJyZWFsc211cmYiLCJhIjoiY2xqazVzN2JyMGZnYjNwcTk4eGZmbHk0aiJ9.gCudJOG6oeYzGsuTlstEkg';
  const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/calebrealsmurf/cljkaomqn001r01rdawnn0bwu',
    projection: 'globe', // Display the map as a globe, since satellite-v9 defaults to Mercator
    zoom: 0.7,
    center: [-90, 40]
  });

  map.on('style.load', () => {
    map.setFog({
      "range":[0.5,10],
      color: "hsl(0, 0%, 100%)",
      "high-color": ["interpolate",["exponential",1.2],["zoom"],0,"hsl(207, 100%, 50%)",8,"hsl(38, 63%, 84%)"],
      "space-color": ["interpolate",["exponential",1.2],["zoom"],5.5,"hsl(240, 46%, 11%)",6,"hsl(199, 61%, 87%)"],
      "horizon-blend": ["interpolate",["exponential",1.2],["zoom"],5.5,0.05,6,0.1],
      "star-intensity":["interpolate",["exponential",1.2],["zoom"],8,0.1,6,0],
    }); // Set the default atmosphere style
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

  const spinGlobe = () => {
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

  // When animation is complete, start spinning if there is no ongoing interaction
  map.on('moveend', () => {
    spinGlobe();
  });

  spinGlobe();

  const flyTo = (coordinate) => {
    map.flyTo({
      center: coordinate,
      essential: true,
      zoom: 10
    });
    userInteracting = true;
  }

  return (
    <>
      <Container className="scrollable" style={{height: "100vh", overflow: "scroll"}}>
        <Center>
          <Link to="/">
            <FadeIn>
              <Heading position="relative" color="white" size={"4xl"} marginTop="8vh">
                Will I Make My Flight?
              </Heading>
            </FadeIn>
          </Link>
        </Center>
        <Card padding={10} marginTop={"10vh"} minHeight={"430px"}
        style={{
          "background-color": "rgba(255, 255, 255, 0.9)",
          "backdrop-filter": "blur(5px)",
        }}>
          <Outlet context={flyTo}/>
        </Card>
      </Container>
    </>
  );
};

export default Root;
