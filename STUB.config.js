// Copy and paste this to your config file

module.exports = {
  AUTH: true, //Boolean - if Authentication is required for the load test
  AUTH_EMAIL: "ps@gmail.com", // String - Auth email/username if AUTH is true
  AUTH_PASSWORD: "DontBeStupid", // String - Auth password if AUTH is true
  AUTH_URL: "https://google.com", // String - Auth URL if AUTH is true
  TEST_URL: "https://google.com", // String - load tested URL
  TEST_TYPE: "GET", // [GET, POST, PUT, DELETE] - Load test request type (Default to GET)
  NO_OF_PROCESSES: 1, // Number <Integer, Positive> - Number of request sent at 1 go.
};
