import {
  VStack,
  Text,
  Divider,
  Spinner,
  Center,
} from "@chakra-ui/react";
import { JourneyTimeline } from "../components";
import { useOutletContext, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "./Background.css";
import "./Globe.css";
import FadeIn from "react-fade-in";

const dummyData = {
  percent_chance: 50,
  departure_airport: "LAX", // AIRPORT CODE
  departure_time_scheduled: "2023-07-01T08:30:37", // UTC
  arrival_airport: "2023-07-01T09:07:37", // UTC
  predicted_bag_check: 20, // FIXED amount of time for bag check in
  predicted_security: 30, // in minutes
  predicted_flight_delay: 60, // in minutes
};

const colorStyle = (chance) => {
  if (chance < 50) {
    return "var(--chakra-colors-red-400)";
  } else if (chance < 80) {
    return "var(--chakra-colors-yellow-500)";
  } else {
    return "var(--chakra-colors-green-400)";
  }
};

const Search = () => {
  const [searchParams] = useSearchParams();
  const [loaded, setLoaded] = useState(false);
  const [likelihood, setLikelihood] = useState({});
  const flyTo = useOutletContext();

  useEffect(() => {
    const timer = setTimeout(async () => {
      const request = {
        flight_number: searchParams.get("flightNumber"),
        arrival_time: searchParams.get("arrivalTime"),
        bag_check: searchParams.get("bagCheck"),
      };
      // Call endpoint
      const options = {
        method: "POST",
        body: JSON.stringify(request),
        headers: {
          "Content-Type": "application/json",
        },
      };

      try {
        const response = await fetch(
          "http://localhost:3010/flightlikelihood",
          options
        );
        const json = await response.json();

        if (json.error) {
          console.error(json.error);
          setLikelihood(dummyData);
          console.log("error branch");
        } else {
          setLikelihood(json);
          console.log("correct branch");
        }
      } catch (e) {
        console.error(e);
        setLikelihood(dummyData);
      }

      setLoaded(true);
      console.log("FLYING OVER!");
      flyTo([(Math.random() - 0.5) * 360, (Math.random() - 0.5) * 100]);
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [searchParams, flyTo]);

  return loaded ? (
    <VStack>
      <FadeIn transitionDuration={4000}>
        <Text align="center" fontSize="3xl">You have a </Text>
      </FadeIn>
      <FadeIn transitionDuration={4000}>
        <Text
          color={colorStyle(likelihood.percent_chance)}
          fontWeight={"bold"}
          fontSize="9xl"
        >
          {likelihood.percent_chance}%
        </Text>
        </FadeIn>
      <FadeIn transitionDuration={4000}>
        <Text align="center" fontSize="3xl">chance of making your flight</Text>
       </FadeIn>
      <Divider marginTop="50px" marginBottom="50px" />
         <FadeIn transitionDuration={6000}>
          <Text marginBottom="30px">Your anticipated timeline is:</Text>
         </FadeIn>
      <JourneyTimeline likelihood={likelihood} />
    </VStack>
  ) : (
    <Center height="350px">
      <Spinner size="xl" />
    </Center>
  );
};

export default Search;
