import {
  Container,
  VStack,
  Text,
  Card,
  CardBody,
  Divider,
  Spinner,
  Center,
} from "@chakra-ui/react";
import { JourneyTimeline } from "../components";
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "./Background.css";

const dummyData = {
  percent_chance: 50,
  departure_airport: "LAX", // AIRPORT CODE
  departure_time_scheduled: "2023-07-01T08:30:37Z", // UTC
  arrival_airport: "2023-07-01T09:07:37Z", // UTC
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

  useEffect(() => {
    const timer = setTimeout(async () => {
      const request = {
        flightNumber: searchParams.get("flightNumber"),
        arrivalTime: searchParams.get("arrivalTime"),
        luggage: searchParams.get("luggage"),
      };
      // Call endpoint
      const options = {
        method: "POST",
        body: JSON.stringify(request),
        headers: {
          "Content-Type": "application/json",
        },
      };

      const response = await fetch(
        // TODO: endpoint
        "http://localhost:3000/listings/new",
        options
      );

      try {
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
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [searchParams]);

  return (
    <div id="lightblue">
      <Container paddingTop="40vh">
        <Card>
          <CardBody>
            {loaded ? (
              <VStack>
                <Text
                  color={colorStyle(likelihood.percent_chance)}
                  fontWeight={"bold"}
                  fontSize="6xl"
                >
                  {likelihood.percent_chance}%
                </Text>
                <Text>is the chance you will make your flight</Text>

                <Divider marginTop="50px" marginBottom="50px" />

                <Text marginBottom="30px">Predicted timeline:</Text>
                <JourneyTimeline likelihood={likelihood} />
              </VStack>
            ) : (
              <Center>
                <Spinner size="xl" />
              </Center>
            )}
          </CardBody>
        </Card>
      </Container>
    </div>
  );
};

export default Search;
