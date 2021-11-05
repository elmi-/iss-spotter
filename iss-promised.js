const rq = require('request-promise-native');

const fetchMyIP = () => {
  return rq("https://api.ipify.org/?format=json");
};

const fetchCoordsByIP = (body) => {
  const data = JSON.parse(body);
  return rq(`https://freegeoip.app/json/${data.ip}`);
};

const fetchISSFlyOverTimes = (body) => {
  const data = JSON.parse(body);
  const url = `http://api.open-notify.org/iss-pass.json?lat=${data.latitude}&lon=${data.longitude}`;

  return rq(url);
};
const nextISSTimesForMyLocation = function() {
  return fetchMyIP()
    .then(fetchCoordsByIP)
    .then(fetchISSFlyOverTimes)
    .then((data) => {
      const { response } = JSON.parse(data);
      return response;
    });
};

module.exports = { nextISSTimesForMyLocation };