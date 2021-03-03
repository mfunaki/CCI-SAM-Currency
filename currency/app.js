// const axios = require('axios')
// const url = 'http://checkip.amazonaws.com/';
let response;
let currencyArray = [
  { unit: "JPY", rate: 1 },
  { unit: "USD", rate: 104.49 },
  { unit: "EUR", rate: 124.86 },
  { unit: "CNY", rate: 15.21 },
  { unit: "KRW", rate: 0.0892 },
];

/**
 *
 * Event doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html#api-gateway-simple-proxy-for-lambda-input-format
 * @param {Object} event - API Gateway Lambda Proxy Input Format
 *
 * Context doc: https://docs.aws.amazon.com/lambda/latest/dg/nodejs-prog-model-context.html
 * @param {Object} context
 *
 * Return doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html
 * @returns {Object} object - API Gateway Lambda Proxy Output Format
 *
 */
exports.lambdaHandler = async (event, context) => {
  response = null;
  try {
    if (
      event.queryStringParameters !== null &&
      event.queryStringParameters !== undefined
    ) {
      if (
        event.queryStringParameters.command !== null &&
        event.queryStringParameters.command !== undefined
      ) {
        command = event.queryStringParameters.command;
        switch (command) {
          case "list":
            response = {
              statusCode: 200,
              body: JSON.stringify(currencyArray),
            };
            break;
          case "convert":
            if (
              event.queryStringParameters.unit !== null &&
              event.queryStringParameters.unit !== undefined
            ) {
              unit = event.queryStringParameters.unit;
              for (var i = 0; i < currencyArray.length; i++) {
                if (currencyArray[i].unit == unit) {
                  if (
                    event.queryStringParameters.value !== null &&
                    event.queryStringParameters.value !== undefined
                  ) {
                    value = event.queryStringParameters.value;
                    amount = value * currencyArray[i].rate;
                    response = {
                      statusCode: 200,
                      body: JSON.stringify({
                        amount: amount,
                      }),
                    };
                    break; // from for loop
                  } else {
                    response = {
                      statusCode: 200,
                      body: JSON.stringify({
                        error: "valueNotSpecified",
                      }),
                    };
                    break;
                  }
                }
              }
              if (response == null) {
                response = {
                  statusCode: 200,
                  body: JSON.stringify({
                    error: "unitNotSupported",
                    unit: unit,
                  }),
                };
              }
              break;
            } else {
              response = {
                statusCode: 200,
                body: JSON.stringify({
                  error: "unitNotSpecified",
                }),
              };
              break;
            }
          default:
            response = {
              statusCode: 200,
              body: JSON.stringify({
                error: "commandNotSupported",
                command: command,
              }),
            };
        }
      } else {
        response = {
          statusCode: 200,
          body: JSON.stringify({
            error: "commandNotSpecified",
          }),
        };
      }
    } else {
      response = {
        statusCode: 200,
        body: JSON.stringify({
          error: "paramsNotSpecified",
        }),
      };
    }
  } catch (err) {
    console.log(err);
    return err;
  }

  return response;
};
