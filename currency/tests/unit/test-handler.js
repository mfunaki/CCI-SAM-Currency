"use strict";

const app = require("../../app.js");
const chai = require("chai");
const expect = chai.expect;
var event, context;

describe("Tests index", function () {
  it("returns a list of unit/rate when list is specified to command", async () => {
    var event = { queryStringParameters: { command: "list" } };
    const result = await app.lambdaHandler(event, context);

    expect(result.statusCode).to.equal(200);
    let response = JSON.parse(result.body);
    expect(response).to.be.an("array");
    expect(response[0]).eqls({ unit: "JPY", rate: 1 });
  });
  it("converts JPY 2 to USD 208.98", async () => {
    var event = {
      queryStringParameters: { command: "convert", unit: "USD", value: 2 },
    };
    const result = await app.lambdaHandler(event, context);

    expect(result.statusCode).to.equal(200);
    let response = JSON.parse(result.body);
    expect(response).eqls({ amount: 208.98 });
  });
});
