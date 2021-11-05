const rq = require("request");

const fetchMyIP = function(callback) {
  // use request to fetch IP address from JSON API
  rq("https://api.ipify.org/?format=json", (error, response, body) => {
    if (error) {
      callback(error, body);

      return;
    }

    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);

      return;
    }

    const data = JSON.parse(body);

    if (data) {
      callback(error, data.ip);
    }
  });

};

const fetchCoordsByIP = (ip, callback) => {
  rq(`https://freegeoip.app/json/${ip}`, (error, response, body) => {
    if (error) {
      callback(error, body);

      return;
    }

    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);

      return;
    }

    const data = JSON.parse(body);

    if (data) {
      callback(error, { latitude: data.latitude, longitude: data.longitude });
    }

  });
};

const fetchISSFlyOverTimes = (coordinates, callback, altitude = false, calls = false) => {
  rq(`https://iss-pass.herokuapp.com/json/?lat=${coordinates.latitude}&lon=${coordinates.longitude}&alt=${altitude}&n=${calls}`, (error, response, body) => {
    if (error) {
      callback(error, body);

      return;
    }

    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);

      return;
    }

    const data = JSON.parse(body);
    
    if (data) {
      callback(error, data.response);
    }
  });
};

const nextISSTimesForMyLocation = (callback) => {
  fetchMyIP((error, ip) => {
    if (error) {
      return callback(error, null);
    }

    fetchCoordsByIP(ip, (error, loc) => {
      if (error) {
        return callback(error, null);
      }

      fetchISSFlyOverTimes(loc, (error, nextPasses) => {
        if (error) {
          return callback(error, null);
        }

        callback(null, nextPasses);
      });
    });
  });
};

module.exports = { nextISSTimesForMyLocation };