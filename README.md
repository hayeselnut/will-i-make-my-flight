# Will I make my flight?

When the unexpected happens, access the information most important to you in the quickest way. Get peace of mind that your flight might be just as delayed as you! Or not... 😳

## How to run this project

The frontend is deployed at [https://will-i-make-my-flight.netlify.app/](https://will-i-make-my-flight.netlify.app/)

The backend must be locally run on port `3010`. Further instructions on how to run the backend can be found in `/backend/api`.

## Data sources

Real time flight information:

- [AirLabs](https://airlabs.co/)

For flight delay predictive model:

- [Bureau of Transportation Statistics](https://www.transtats.bts.gov/Homepage.asp)
- Data was then used to build linear and polynomial regression models, ultimately using polynomial regression for its improved accuracy

For wait time predictive model:

- [TSA Wait Times](https://www.tsawaittimes.com/)
- Historical wait times for given airport and month used to calculate average wait times
