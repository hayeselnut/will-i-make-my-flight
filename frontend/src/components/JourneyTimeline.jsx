import {
  FaPersonWalkingLuggage,
  FaPlaneDeparture,
  FaTaxi,
} from "react-icons/fa6";
import { FaLuggageCart } from "react-icons/fa";
import { RiUserSearchFill } from "react-icons/ri";
import { addMinutes } from "../helpers";
import {
  Badge,
  Box,
  Icon,
  Step,
  StepDescription,
  StepIndicator,
  StepSeparator,
  StepTitle,
  Stepper,
} from "@chakra-ui/react";
import React from "react";
import FadeIn from "react-fade-in";

const BAG_CHECK_MED = 30;
const BAG_CHECK_SEV = 50;
const SECURITY_MED = 20;
const SECURITY_SEV = 40;

const badgeColor = (predicted, medium, severe) => {
  if (predicted < medium) {
    return "green";
  } else if (predicted < severe) {
    return "yellow";
  } else {
    return "red";
  }
};

const styleColor = (predicted, medium, severe) => {
  if (predicted < medium) {
    return green;
  } else if (predicted < severe) {
    return yellow;
  } else {
    return red;
  }
};

const green = {
  background: "var(--chakra-colors-green-400)",
  borderWidth: 0,
};

const yellow = {
  background: "var(--chakra-colors-yellow-400)",
  borderWidth: 0,
};

const red = {
  background: "var(--chakra-colors-red-400)",
  borderWidth: 0,
};

const bodyText = "var(--chakra-colors-chakra-body-text)";
const grey = {
  borderColor: bodyText,
};

const dashedGrey = {
  borderColor: "var(--chakra-colors-gray-400)",
  borderStyle: "dashed",
};

const JourneyTimeline = ({
  likelihood: {
    departure_time_scheduled, // local time
    arrival_airport, // local time
    predicted_bag_check, // FIXED amount of time for bag check in, -1 if null
    predicted_security, // in minutes
    predicted_walk_to_gate, // in minutes
    predicted_flight_delay, // in minutes
  },
}) => {
  const eventsWithoutBag = [
    {
      time: addMinutes(arrival_airport, 0),
      label: "Arrival",
      nextStyle: styleColor(predicted_security, SECURITY_MED, SECURITY_SEV),
      icon: FaTaxi,
      iconStyle: "var(--chakra-colors-gray-700)",
    },
    {
      time: addMinutes(arrival_airport, predicted_security),
      label: "Security",
      predictedTime: predicted_security,
      style: styleColor(predicted_security, SECURITY_MED, SECURITY_SEV),
      badgeColor: badgeColor(predicted_security, SECURITY_MED, SECURITY_SEV),
      icon: RiUserSearchFill,
      iconStyle: "white",
    },
    {
      time: addMinutes(
        arrival_airport,
        predicted_security + predicted_walk_to_gate
      ),
      label: "Walk to gate",
      predictedTime: predicted_walk_to_gate,
      icon: FaPersonWalkingLuggage,
      iconStyle: bodyText,
    },
    {
      time: addMinutes(departure_time_scheduled, 0),
      label: "Scheduled take off",
      icon: FaPlaneDeparture,
      iconStyle: bodyText,
      predictedTime: addMinutes(departure_time_scheduled, 0).diff(
        addMinutes(
          arrival_airport,
          predicted_security + predicted_walk_to_gate
        ),
        "minutes"
      ),
      nextStyle: dashedGrey,
    },
    {
      time: addMinutes(departure_time_scheduled, predicted_flight_delay),
      label: "Predicted take off",
      style: dashedGrey,
      predictedTime: Math.min(
        predicted_flight_delay,
        addMinutes(departure_time_scheduled, predicted_flight_delay).diff(
          addMinutes(
            arrival_airport,
            predicted_bag_check + predicted_security + predicted_walk_to_gate
          ),
          "minutes"
        )
      ),
      iconStyle: bodyText,
      icon: FaPlaneDeparture,
    },
  ];

  const eventsWithBag = [
    {
      time: addMinutes(arrival_airport, 0),
      label: "Arrival",
      nextStyle: styleColor(predicted_bag_check, BAG_CHECK_MED, BAG_CHECK_SEV),
      icon: FaTaxi,
      iconStyle: "var(--chakra-colors-gray-700)",
    },
    {
      time: addMinutes(arrival_airport, predicted_bag_check),
      label: "Bag check in",
      predictedTime: predicted_bag_check,
      style: styleColor(predicted_bag_check, BAG_CHECK_MED, BAG_CHECK_SEV),
      badgeColor: badgeColor(predicted_bag_check, BAG_CHECK_MED, BAG_CHECK_SEV),
      nextStyle: styleColor(predicted_security, SECURITY_MED, SECURITY_SEV),
      icon: FaLuggageCart,
      iconStyle: "white",
    },
    {
      time: addMinutes(
        arrival_airport,
        predicted_bag_check + predicted_security
      ),
      label: "Security",
      predictedTime: predicted_security,
      style: styleColor(predicted_security, SECURITY_MED, SECURITY_SEV),
      badgeColor: badgeColor(predicted_security, SECURITY_MED, SECURITY_SEV),
      icon: RiUserSearchFill,
      iconStyle: "white",
    },
    {
      time: addMinutes(
        arrival_airport,
        predicted_bag_check + predicted_security + predicted_walk_to_gate
      ),
      label: "Walk to gate",
      predictedTime: predicted_walk_to_gate,
      icon: FaPersonWalkingLuggage,
      iconStyle: bodyText,
    },
    {
      time: addMinutes(departure_time_scheduled, 0),
      label: "Scheduled take off",
      icon: FaPlaneDeparture,
      iconStyle: bodyText,
      hideBadge: true,
      predictedTime: addMinutes(departure_time_scheduled, 0).diff(
        addMinutes(
          arrival_airport,
          predicted_bag_check + predicted_security + predicted_walk_to_gate
        ),
        "minutes"
      ),
      nextStyle: dashedGrey,
    },
    {
      time: addMinutes(departure_time_scheduled, predicted_flight_delay),
      label: "Predicted take off",
      style: dashedGrey,
      hideBadge: true,
      predictedTime: Math.min(
        predicted_flight_delay,
        addMinutes(departure_time_scheduled, predicted_flight_delay).diff(
          addMinutes(
            arrival_airport,
            predicted_bag_check + predicted_security + predicted_walk_to_gate
          ),
          "minutes"
        )
      ),
      iconStyle: bodyText,
      icon: FaPlaneDeparture,
    },
  ];

  const eventsToDisplay =
    predicted_bag_check === -1 ? eventsWithoutBag : eventsWithBag;

  return (
    <FadeIn transitionDuration={3000}>
      <Stepper size="lg" orientation="vertical" height="600px" gap="0" marginLeft="70px">
        {eventsToDisplay.map(
          (
            {
              label,
              time,
              predictedTime,
              style,
              nextStyle,
              badgeColor,
              icon,
              iconStyle,
              hideBadge,
            },
            index
          ) => (
            <Step key={index}>
              <StepIndicator style={style ?? grey}>
                {icon && <Icon as={icon} color={iconStyle} />}
              </StepIndicator>

              <Box flexShrink="0">
                <StepTitle
                  style={
                    predictedTime < 0
                      ? {
                        fontWeight: "bold",
                        color: "var(--chakra-colors-red-500)",
                      }
                      : {}
                  }
                >
                  {label}
                </StepTitle>
                <StepDescription
                  style={{
                    position: "absolute",
                    top: "0.5rem",
                    marginLeft: "-8rem",
                    fontWeight: predictedTime < 0 ? "bold" : "normal",
                    color:
                      predictedTime < 0 ? "var(--chakra-colors-red-500)" : "",
                  }}
                >
                  {time.format("LT")}
                </StepDescription>
                <StepDescription>
                  {predictedTime && !hideBadge && (
                    <Badge colorScheme={predictedTime < 0 ? "red" : badgeColor}>
                      {predictedTime < 0 ? `Late by ${predictedTime * -1} mins` : `${predictedTime} mins`}
                    </Badge>
                  )}
                </StepDescription>
              </Box>

              <StepSeparator style={nextStyle} />
            </Step>
          )
        )}
      </Stepper>
    </FadeIn>
  );
};

export default JourneyTimeline;
