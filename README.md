# Machine Gun

A load testing script to help test your servers and code at load.
DDOS attack if a server is not well protected.

## How to use?

1. Clone the repository
2. Add a config.js file with the information in STUB.config.js
3. Update the config with your required information
4. Run npm start

## What is in the config?

| Keys                                | type    | description                                                    |
| ----------------------------------- | ------- | -------------------------------------------------------------- |
| AUTH                                | Boolean | If authentication is required, set to true                     |
| AUTH_EMAIL, AUTH_PASSWORD, AUTH_URL | String  | Only required when AUTH is true                                |
| TEST_URL                            | String  | URL that you want to stress test.                              |
| NO_OF_PROCESSES                     | Number  | Number on "concurrent" users you want to load the service with |

---

Its a work in progress!!
