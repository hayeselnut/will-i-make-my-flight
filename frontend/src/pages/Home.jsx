import React from 'react';
import { Input } from '@chakra-ui/react'
import { Text } from '@chakra-ui/react'
import { Button, ButtonGroup } from '@chakra-ui/react'
import './Background.css';
import './Home.css';

const Home = () => {
  const [flightNumber, setFlightNumber] = React.useState('');
  const [day, setDay] = React.useState('');
  const [month, setMonth] = React.useState('');
  const [year, setYear] = React.useState('');
  const [minutes, setMinutes] = React.useState('');
  const [hours, setHours] = React.useState('');
  const [luggage, setLuggage] = React.useState(false);

  // check if any fields are empty
  const checkFields = () => {
    if (flightNumber === '' || day === '' || month === '' || year === '' || minutes === '' || hours === '') {
      alert('Please fill in missing fields');
      return false;
    } else if (day.length !== 2 || month.length !== 2 || year.length !== 4) {
      alert('Please enter a valid date');
      return false;
    } else if (minutes.length !== 2 || hours.length !== 2) {
      alert('Please enter a valid time');
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
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      }
    }

    const response = await fetch('http://localhost:3000/listings/new', options);
    const json = await response.json();
    if (json.error) {
      alert(json.error);
    } else {
      alert("We're gonna make this flight!!!");
    }
  }

  return (
    <>
    <div class="container">
      <div id="cloud-intro">

        <div>
          <div id='title'>
            <Text>
              Will I Make My Flight
            </Text>
          </div>
          <form id='search'>
            <div className='inputs' id="flightNumber">
              <Text className='prompt'>
                Enter your flight number below
              </Text>
              <Input
                type="text"
                value={flightNumber}
                onChange={(event) => setFlightNumber(event.target.value)}
                placeholder='Flight Number'
              />
            </div>
            <br/>
            <div className='inputs'>
              <Text className='prompt'>
                When are you arriving at the airport?
              </Text>

              <div className="input-row" id="date">
                <Input
                  className="small-input"
                  type="text"
                  placeholder="dd"
                  onChange={(event) => setDay(event.target.value)}
                />
                <Input
                  className="small-input"
                  type="text"
                  placeholder="mm"
                  onChange={(event) => setMonth(event.target.value)}
                />
                <Input
                  className="small-input"
                  type="text"
                  placeholder="yyyy"
                  onChange={(event) => setYear(event.target.value)}
                />
              </div>
              <div className="input-row" id="time">
                <Input
                  className="small-input"
                  type="text"
                  placeholder="hh"
                  onChange={(event) => setHours(event.target.value)}
                />
                <Input
                  className="small-input"
                  type="text"
                  placeholder="mm"
                  onChange={(event) => setMinutes(event.target.value)}
                />
              </div>
            </div>
            <br/>
            <div className='inputs'>
              <Text className='prompt'>
                Are you checking in luggage?
              </Text>
              <ButtonGroup variant='outline' spacing='6'>
                <Button
                colorScheme='blue'
                value={true}
                onClick={(event) => setLuggage(event.target.value)}
                >Yes</Button>
                <Button
                colorScheme='red'
                value={false}
                onClick={(event) => setLuggage(event.target.value)}
                >No</Button>
              </ButtonGroup>
            </div>
            <br/>
            <Button
              colorScheme='blue'
              onClick={searchFlight}
            >
              Search
            </Button>
          </form>
        </div>

      </div>
    </div>
    </>
  )
};

export default Home;
