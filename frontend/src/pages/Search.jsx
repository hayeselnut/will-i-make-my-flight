import { Container, VStack, Text, Card, CardBody, Divider} from "@chakra-ui/react";
import { JourneyTimeline } from "../components";

const dummyData = {
  percent_chance: 50,
  departure_airport: "LAX", // AIRPORT CODE
  departure_time_scheduled: "2023-07-01T10:30:37Z", // UTC
  arrival_airport: "2023-07-01T09:07:37Z", // UTC
  predicted_bag_check: 20, // FIXED amount of time for bag check in
  predicted_security: 30, // in minutes
  predicted_flight_delay: 60, // in minutes
};

const Search = () => {
  return (
    <Container>
      <Card>
        <CardBody>
          <VStack>
            <Text fontSize="6xl">50%</Text>
            <Text>is the chance you will make your flight.</Text>
            <Divider style={{marginTop: "50px", marginBottom: "50px" }} />
            <JourneyTimeline likelihood={dummyData} />
          </VStack>
        </CardBody>
      </Card>
    </Container>
  );
};

export default Search;
