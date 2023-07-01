import React from "react";
import {
  Card,
  Container,
  Center,
  Heading,
  Input,
  FormControl,
  FormLabel,
  HStack,
  Checkbox,
} from "@chakra-ui/react";
import { Text } from "@chakra-ui/react";
import { Button, ButtonGroup } from "@chakra-ui/react";
import "./Background.css";
import "./Home.css";

const Home = () => {
  const [flightNumber, setFlightNumber] = React.useState("");
  const [day, setDay] = React.useState("");
  const [month, setMonth] = React.useState("");
  const [year, setYear] = React.useState("");
  const [minutes, setMinutes] = React.useState("");
  const [hours, setHours] = React.useState("");
  const [luggage, setLuggage] = React.useState(true);

  // check if any fields are empty
  const checkFields = () => {
    if (
      flightNumber === "" ||
      day === "" ||
      month === "" ||
      year === "" ||
      minutes === "" ||
      hours === ""
    ) {
      alert("Please fill in missing fields");
      return false;
    } else if (day.length !== 2 || month.length !== 2 || year.length !== 4) {
      alert("Please enter a valid date");
      return false;
    } else if (minutes.length !== 2 || hours.length !== 2) {
      alert("Please enter a valid time");
      return false;
    }
    return true;
  };

  const searchFlight = async () => {
    if (!checkFields()) {
      return;
    }

    const data = {
      flightNumber: flightNumber,
      arrivalTime: new Date(Date.UTC(year, month - 1, day, hours, minutes)),
      luggage: luggage,
    };

    const options = {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    };

    const response = await fetch("http://localhost:3000/listings/new", options);
    const json = await response.json();
    if (json.error) {
      alert(json.error);
    } else {
      alert("We're gonna make this flight!!!");
    }
  };

  return (
    <>
    <div id="lightblue">
      {/* <div id="cloud-intro"> */}
      <Container>
        <Center>
          <Heading size={"4xl"} marginTop="15vh">Will I Make My Flight?</Heading>
        </Center>
        <Card padding={10} marginTop={"15vh"}>
          <FormControl>
            <FormLabel>Enter your flight number below</FormLabel>
            <Input
              type="text"
              value={flightNumber}
              onChange={(event) => setFlightNumber(event.target.value)}
              placeholder="Flight number"
            />

            <FormLabel marginTop={10}>When are you arriving at the airport?</FormLabel>
<HStack justifyContent={"center"}>
              <Input
                type="text"
                placeholder="dd"
                onChange={(event) => setDay(event.target.value)}
                style={{width: "80px"}}
              />
              <Text>/</Text>
              <Input
                type="text"
                placeholder="mm"
                onChange={(event) => setMonth(event.target.value)}
                style={{width: "80px"}}
              />
              <Text>/</Text>
              <Input
                type="text"
                placeholder="yyyy"
                onChange={(event) => setYear(event.target.value)}
                style={{width: "80px"}}
              />
            </HStack>

<HStack justifyContent={"center"}>
<Input
                type="text"
                placeholder="hh"
                onChange={(event) => setHours(event.target.value)}
                style={{width: "80px"}}

              />
              <Text>:</Text>
              <Input
                type="text"
                placeholder="mm"
                onChange={(event) => setMinutes(event.target.value)}
                style={{width: "80px"}}
              />
</HStack>
            <HStack marginTop={10}>
            <Checkbox defaultChecked value={luggage} >
              I am checking in luggage.
            </Checkbox>
            </HStack>

          <Center>

            <Button marginTop={10} colorScheme="blue" onClick={searchFlight} type="submit">
              Search
            </Button>
          </Center>
          </FormControl>
        </Card>
      </Container>
      </div>
    {/* </div> */}
    </>
  );
};

export default Home;
