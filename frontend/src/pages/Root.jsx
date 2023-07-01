import React from "react";
import {
  Card,
  Container,
  Center,
  Heading,
} from "@chakra-ui/react";
import { Link, Outlet} from "react-router-dom";
import "./Background.css";

const Root = () => {
  return (
    <div id="lightblue">
      <Container>
        <Center>
          <Link to="/">
            <Heading size={"4xl"} marginTop="10vh">
              Will I Make My Flight?
            </Heading>
          </Link>
        </Center>
        <Card padding={10} marginTop={"15vh"} minHeight={"450px"}>
          <Outlet />
        </Card>
      </Container>
    </div>
  );
};

export default Root;
