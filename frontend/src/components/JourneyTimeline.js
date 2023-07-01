import { addMinutes } from "../helpers";
import {
  Badge,
  Box,
  Step,
  StepDescription,
  StepIcon,
  StepIndicator,
  StepNumber,
  StepSeparator,
  StepStatus,
  StepTitle,
  Stepper,
  useSteps,
} from "@chakra-ui/react";

const BAG_CHECK_MEDIUM = 30;
const BAG_CHECK_SEVERE = 50;
const SECURITY_MEDIUM = 20;
const SECURITY_SEVERE = 40;
const FLIGHT_MEDIUM = 30;
const FLIGHT_SEVERE = 60;

const badgeColor = (predicted, medium, severe) => {
  if (predicted < medium) {
    return "green";
  } else if (predicted < severe) {
    return "yellow";
  } else {
    return "red";
  }
};

const severityColor = (predicted, medium, severe) => {
  if (predicted < medium) {
    return "var(--chakra-colors-green-400)";
  } else if (predicted < severe) {
    return "var(--chakra-colors-yellow-400)";
  } else {
    return "var(--chakra-colors-red-400)";
  }
};

// const Item = ({
//   idx,
//   maxIdx,
//   time,
//   icon,
//   label,
//   mainColor,
//   bottomColor,
//   badgeColor,
//   predictedDelay,
// }) => (
//   <TimelineItem>
//     <TimelineOppositeContent
//       sx={{ m: "auto 0" }}
//       variant="body2"
//       color="text.secondary"
//     >
//       {time}
//     </TimelineOppositeContent>

//     <TimelineSeparator>
//       {idx !== 0 && <TimelineConnector sx={{ bgcolor: mainColor }} />}
//       <TimelineDot color={"primary"}>{icon}</TimelineDot>
//       {idx !== maxIdx && <TimelineConnector sx={{ bgcolor: bottomColor }} />}
//     </TimelineSeparator>

//     <TimelineContent sx={{ py: "12px", px: 2 }}>
//       {<Badge color={badgeColor}>{predictedDelay} minutes</Badge>}
//       <Typography>
//         {label}
//         <br />
//         <br />
//         <br />
//         <br />
//         <br />
//       </Typography>
//     </TimelineContent>
//   </TimelineItem>
// );

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
      icon: "",
      label: "Arrival",
      mainColor: "black",
      bottomColor: severityColor(
        predicted_bag_check,
        BAG_CHECK_MEDIUM,
        BAG_CHECK_SEVERE
      ),
    },
    {
      time: addMinutes(arrival_airport, predicted_bag_check),
      icon: "",
      label: "Bag check in",
      badgeColor: badgeColor(
        predicted_bag_check,
        BAG_CHECK_MEDIUM,
        BAG_CHECK_SEVERE
      ),
      mainColor: severityColor(
        predicted_bag_check,
        BAG_CHECK_MEDIUM,
        BAG_CHECK_SEVERE
      ),
      bottomColor: severityColor(
        predicted_security,
        SECURITY_MEDIUM,
        SECURITY_SEVERE
      ),
      predictedDelay: predicted_bag_check,
    },
    {
      time: addMinutes(departure_time_scheduled, 0),
      icon: "",
      label: "Scheduled take off",
      mainColor: severityColor(
        predicted_flight_delay,
        FLIGHT_MEDIUM,
        FLIGHT_SEVERE
      ),
      bottomColor: severityColor(predicted_flight_delay, 100, 100),
      predictedDelay: predicted_flight_delay,
    },
    {
      time: addMinutes(
        arrival_airport,
        predicted_bag_check + predicted_security
      ),
      icon: "",
      label: "Security",
      badgeColor: badgeColor(
        predicted_security,
        SECURITY_MEDIUM,
        SECURITY_SEVERE
      ),
      mainColor: severityColor(
        predicted_security,
        SECURITY_MEDIUM,
        SECURITY_SEVERE
      ),
      bottomColor: severityColor(
        predicted_flight_delay,
        FLIGHT_MEDIUM,
        FLIGHT_SEVERE
      ),
      predictedDelay: predicted_security,
    },

    {
      time: addMinutes(departure_time_scheduled, predicted_flight_delay),
      icon: "",
      label: "Predicted take off",
      badgeColor: badgeColor(
        predicted_flight_delay,
        FLIGHT_MEDIUM,
        FLIGHT_SEVERE
      ),
      mainColor: severityColor(
        predicted_flight_delay,
        FLIGHT_MEDIUM,
        FLIGHT_SEVERE
      ),
      bottomColor: "white",
      predictedDelay: predicted_flight_delay,
    },
  ];

  const steps = [
    { title: "First", description: "Contact Info" },
    { title: "Second", description: "Date & Time" },
    { title: "Third", description: "Select Rooms" },
  ];

  const { activeStep } = useSteps({
    index: 1,
    count: steps.length,
  });

  return (
    <Stepper index={activeStep} orientation="vertical" height="400px" gap="0">
      {steps.map((step, index) => (
        <Step key={index}>
          <StepIndicator>
            <StepStatus
              complete={<StepIcon />}
              incomplete={<StepNumber />}
              active={<StepNumber />}
            />
          </StepIndicator>

          <Box flexShrink="0">
            <StepTitle>{step.title}</StepTitle>
            <StepDescription>{step.description}</StepDescription>
          </Box>

          <StepSeparator />
        </Step>
      ))}
    </Stepper>
  );
};

// return (
//   <Timeline>
//     {events.map(
//       (
//         {
//           time,
//           icon,
//           label,
//           mainColor,
//           bottomColor,
//           badgeColor,
//           predictedDelay,
//         },
//         idx
//       ) => (
//         <Item
//           key={label}
//           idx={idx}
//           maxIdx={events.length}
//           time={time}
//           icon={icon}
//           label={label}
//           mainColor={mainColor}
//           bottomColor={bottomColor}
//           badgeColor={badgeColor}
//           predictedDelay={predictedDelay}
//         />
//       )
//     )}
//   </Timeline>
// );
export default JourneyTimeline;
