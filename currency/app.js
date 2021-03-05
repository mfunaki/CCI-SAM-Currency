let response;
let currencyArray = [
  { unit: "JPY", rate: 1 },
  { unit: "USD", rate: 104.49 },
  { unit: "EUR", rate: 124.86 },
  { unit: "CNY", rate: 15.21 },
  { unit: "KRW", rate: 0.0892 },
];

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
                    amount =
                      Math.round(value * currencyArray[i].rate * 100) / 100;
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
