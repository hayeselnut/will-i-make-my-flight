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
  hasBagCheck, // boolean
  likelihood: {
    departure_time_scheduled, // local time
    arrival_airport, // local time
    predicted_bag_check, // FIXED amount of time for bag check in
    predicted_security, // in minutes
    predicted_flight_delay, // in minutes
  },
}) => {
  const events = [
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
      // nextStyle: styleColor(predicted_flight_delay, FLIGHT_MED, FLIGHT_SEV),
    },
    {
      time: addMinutes(
        arrival_airport,
        predicted_bag_check + predicted_security + 10
      ),
      label: "Walk to gate",
      predictedTime: 10,
      icon: FaPersonWalkingLuggage,
      iconStyle: bodyText,
      // style: styleColor(predicted_security, SECURITY_MED, SECURITY_SEV),
      // badgeColor: badgeColor(predicted_security, SECURITY_MED, SECURITY_SEV),
      // nextStyle: styleColor(predicted_flight_delay, FLIGHT_MED, FLIGHT_SEV),
    },
    {
      time: addMinutes(departure_time_scheduled, 0),
      label: "Scheduled take off",
      icon: FaPlaneDeparture,
      iconStyle: bodyText,
      predictedTime: addMinutes(departure_time_scheduled, 0).diff(
        addMinutes(
          arrival_airport,
          predicted_bag_check + predicted_security + 10
        ),
        "minutes"
      ),
      // style: styleColor(predicted_flight_delay, FLIGHT_MED, FLIGHT_SEV),
      nextStyle: dashedGrey,
      // badgeColor: badgeColor(predicted_flight_delay, FLIGHT_MED, FLIGHT_SEV),
    },
    {
      time: addMinutes(departure_time_scheduled, predicted_flight_delay),
      label: "Predicted take off",
      style: dashedGrey,
      predictedTime: predicted_flight_delay,
      iconStyle: bodyText,
      icon: FaPlaneDeparture,
      // nextStyle: styleColor(predicted_flight_delay, FLIGHT_MED, FLIGHT_SEV),
      // badgeColor: badgeColor(predicted_flight_delay, FLIGHT_MED, FLIGHT_SEV),
    },
  ].sort(({ time: timeA }, { time: timeB }) => timeA < timeB);

  return (
    <Stepper size="lg" orientation="vertical" height="600px" gap="0">
      {events.map(
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
          },
          index
        ) => (
          <Step key={index}>
            <StepIndicator style={style ?? grey}>
              {icon && <Icon as={icon} color={iconStyle} />}
            </StepIndicator>

            <Box flexShrink="0">
              <StepTitle>{label}</StepTitle>
              <StepDescription
                style={{
                  position: "absolute",
                  top: "0.5rem",
                  marginLeft: "-8rem",
                }}
              >
                {time.format("LT")}
              </StepDescription>
              <StepDescription>
                {predictedTime && (
                  <Badge colorScheme={badgeColor}>{predictedTime} mins</Badge>
                )}
              </StepDescription>
            </Box>

            <StepSeparator style={nextStyle} />
          </Step>
        )
      )}
    </Stepper>
  );
};

export default JourneyTimeline;
