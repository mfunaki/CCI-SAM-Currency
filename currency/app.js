// const axios = require('axios')
// const url = 'http://checkip.amazonaws.com/';
let response = null;
let currencies = [
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
        if (command == "list") {
          response = {
            statusCode: 200,
            body: JSON.stringify(currencies),
          };
        }
      }
    }
  } catch (err) {
    console.log(err);
    return err;
  }

  return response;
};
