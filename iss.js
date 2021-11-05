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

module.exports = { fetchMyIP };