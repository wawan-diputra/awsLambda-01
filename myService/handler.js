'use strict';


// const AWS = require('aws-sdk'); // eslint-disable-line import/no-extraneous-dependencies

const services = require('./services');
let DynamoDbDataService = services.DynamoDbDataService;

module.exports.list = (event, context, callback) => {
  const TABLE_NAME = 'tempdb';
  const NUMBER_OF_ITEMS = 50;
  let dynamoDbDataService = new DynamoDbDataService(TABLE_NAME, NUMBER_OF_ITEMS);

  dynamoDbDataService.getAll()
    .then((results) => {
      const response = {
        headers: {
          "Access-Control-Allow-Origin" : "*", // Required for CORS support to work
          "Access-Control-Allow-Credentials" : true // Required for cookies, authorization headers with HTTPS 
        },
        statusCode: 200,
        body: JSON.stringify(results),
      };
      callback(null, response);
    })
    .catch((error) => {
      callback(error);
    });

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // callback(null, { message: 'Go Serverless v1.0! Your function executed successfully!', event });
};