const { spawn } = require("child_process");
const axios = require("axios");

const {
  NO_OF_PROCESSES,
  AUTH,
  AUTH_EMAIL,
  AUTH_PASSWORD,
  AUTH_URL,
  TEST_URL,
  TEST_TYPE,
} = require("./config");

const parent = async () => {
  let authKey;
  if (AUTH) {
    let response;
    try {
      response = await axios.post(AUTH_URL, {
        email: AUTH_EMAIL,
        password: AUTH_PASSWORD,
      });
    } catch (err) {
      console.log("Unauthorized");
      return;
    }

    authKey = response.data.accessToken;
  }

  let times = [];
  let children = [];
  for (let i = 0; i < NO_OF_PROCESSES; i++) {
    let childProcess = spawn("node", [
      "src/child.js",
      `--url=${TEST_URL}`,
      `--auth=${authKey}`,
      `--reqType=${TEST_TYPE}`,
    ]);
    children.push(childProcess);
  }

  let responses = children.map(function wait(child) {
    return new Promise((res) => {
      child.stdout.on("data", (data) => {
        const newData = JSON.parse(data);
        console.log(`child stdout: ${newData.duration || newData.data}`);
        times.push(parseInt(newData.duration));
      });
      child.on("exit", function (code) {
        if (code === 0) {
          res(true);
        } else {
          res(false);
        }
      });
    });
  });

  responses = await Promise.all(responses);

  if (responses.filter(Boolean).length == responses.length) {
    console.log(times);
    const sum = times.reduce((a, b) => a + b, 0);
    const avg = sum / times.length || 0;
    console.log(`average: ${avg}`);
    console.log("success!");
  } else {
    console.log("failures!");
  }
};

parent();
