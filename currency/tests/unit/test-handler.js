"use strict";

const app = require("../../app.js");
const chai = require("chai");
const expect = chai.expect;

describe("Tests index", function () {
  // commandにlistが指定されたら、unit/rateのリストを返す
  it("returns a list of unit/rate when list is specified to command", async () => {
    let event = { queryStringParameters: { command: "list" } },
      context;
    const result = await app.lambdaHandler(event, context);

    expect(result.statusCode).to.equal(200);
    const response = JSON.parse(result.body);
    expect(response).to.be.an("array");
    expect(response[0]).eqls({ unit: "JPY", rate: 1 });
  });
  // commandにconvert, unitにUSD, valueに2が指定されたら、(日本円)208.98円を返す
  it("converts USD 2 to JPY 208.98 when command is convert, unit is USD and value is 2", async () => {
    let event = {
        queryStringParameters: { command: "convert", unit: "USD", value: 2 },
      },
      context;
    const result = await app.lambdaHandler(event, context);

    expect(result.statusCode).to.equal(200);
    const response = JSON.parse(result.body);
    expect(response).eqls({ amount: 208.98 });
  });
  // commandにconvert, unitにUSD, valueに10が指定されたら、(日本円)1044.9円を返す
  it("converts USD 10 to JPY 1044.9 when command is convert, unit is USD and value is 10", async () => {
    // implement here!
  });
});
