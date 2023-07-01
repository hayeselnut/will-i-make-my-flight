import React, { useState } from "react";
import moment from "moment";
import {
  Center,
  Input,
  FormControl,
  FormLabel,
  HStack,
  Select,
  Checkbox,
  Text,
  Button,
} from "@chakra-ui/react";
import { createSearchParams, useNavigate } from "react-router-dom";
import "./Background.css";

const Home = () => {
  const today = moment();
  const tomorrow = moment().add(1, "day");

  const [flightNumber, setFlightNumber] = useState("");
  const [day, setDay] = useState("");
  const [minutes, setMinutes] = useState("");
  const [hours, setHours] = useState("");
  const [bagCheck, setBagCheck] = useState(true);
  const navigate = useNavigate();

  const checkFields = () => {
    if (flightNumber === "" || day === "" || minutes === "" || hours === "") {
      alert("Please fill in missing fields");
      return false;
    } else if (minutes.length !== 2 || hours.length !== 2) {
      alert("Please enter a valid time");
      return false;
    }
    return true;
  };

  const searchFlight = async (e) => {
    e.preventDefault();

    if (!checkFields()) {
      return;
    }

    const momentDay = moment(day);
    const date = new Date(momentDay.year(), momentDay.month(), momentDay.date(), hours, minutes)

    const data = {
      flightNumber,
      arrivalTime: `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}T${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`,
      bagCheck,
    };

    navigate(`/search?${createSearchParams(data).toString()}`);
  };

  return (
    <FormControl>
      <FormLabel>Enter your flight number below</FormLabel>
      <Input
        type="text"
        value={flightNumber}
        onChange={(event) => setFlightNumber(event.target.value)}
        placeholder="Flight number"
      />

      <FormLabel marginTop={10}>
        When are you arriving at the airport?
      </FormLabel>
      <HStack justifyContent={"center"}>
        <Select
          onChange={(event) => setDay(event.target.value)}
          placeholder="Select day"
        >
          <option value={today.format("LL")}>{today.format("LL")}</option>
          <option value={tomorrow.format("LL")}>
            {tomorrow.format("LL")}
          </option>
        </Select>
        <Input
          type="number"
          placeholder="hh"
          onChange={(event) => setHours(event.target.value)}
          style={{ width: "80px" }}
        />
        <Text>:</Text>
        <Input
          type="number"
          placeholder="mm"
          onChange={(event) => setMinutes(event.target.value)}
          style={{ width: "80px" }}
        />
      </HStack>
      <HStack marginTop={10}>
        <Checkbox
          onChange={(event) => setBagCheck(event.target.checked)}
          value={bagCheck}
          defaultChecked
        >
          I am checking in luggage.
        </Checkbox>
      </HStack>

      <Center>
        <Button
          marginTop={10}
          colorScheme="blue"
          onClick={searchFlight}
          type="submit"
        >
          Search
        </Button>
      </Center>
    </FormControl>
  );
};

export default Home;
