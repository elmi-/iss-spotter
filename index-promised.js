const { nextISSTimesForMyLocation } = require('./iss-promised');
const { printPassTimes } = require("./printPassTimes");

nextISSTimesForMyLocation()
  .then((passTimes) => {
    printPassTimes(passTimes);
  })
  .catch((error) => {
    console.log("Something went wrong: ", error);
  });