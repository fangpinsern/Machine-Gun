const axios = require("axios");
const yargs = require("yargs");

const args = yargs
  .option("url", {
    description: "URL to load test",
    type: "string",
  })
  .option("auth", {
    description: "Auth key for authorization needs",
    type: "string",
  })
  .help()
  .alias("help", "h").argv;

const childProcess = async (url, authKey) => {
  axios.interceptors.request.use(
    function (config) {
      config.metadata = { startTime: new Date(), authKey: authKey };
      if (authKey) {
        config.headers.common["Authorization"] = authKey;
      }
      return config;
    },
    function (error) {
      return Promise.reject(error);
    }
  );

  axios.interceptors.response.use(
    function (response) {
      response.config.metadata.endTime = new Date();
      response.duration =
        response.config.metadata.endTime - response.config.metadata.startTime;
      return response;
    },
    function (error) {
      return Promise.reject(error);
    }
  );

  axios
    .get(url)
    .then((response) => {
      const resData = {
        data: response.data[0],
        duration: response.duration,
      };
      process.stdout.write(JSON.stringify(resData));
      //   process.stdout.write(response.duration.toString());
      process.exitCode = 0;
    })
    .catch((error) => {
      process.stdout.write(
        JSON.stringify({
          data: error.toString(),
        })
      );
      process.exitCode = 1;
    });
};

childProcess(args.url, args.auth);

// "https://admin-dev-api.nas.academy/ping"
