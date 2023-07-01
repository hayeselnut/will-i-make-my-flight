import { Container } from "@chakra-ui/react";
import { JourneyTimeline } from "../components";

const dummyData = {
  percent_chance: 50,
  departure_airport: "LAX", // AIRPORT CODE
  departure_time_scheduled: "2023-07-01T12:07:37Z", // UTC
  arrival_airport: "2023-07-01T09:07:37Z", // UTC
  predicted_bag_check: 30, // FIXED amount of time for bag check in
  predicted_security: 40, // in minutes
  predicted_flight_delay: 60, // in minutes
};

const Search = () => {
  return (
    <Container>
      <div>SEARCH PAGE - 50% is the chance you make your flight.</div>
      <JourneyTimeline likelihood={dummyData} />
    </Container>
  );
};

export default Search;
