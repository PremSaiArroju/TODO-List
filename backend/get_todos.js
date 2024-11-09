const AWS = require('aws-sdk');
const dynamoDB = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
    // Retrieve all items from DynamoDB
    const result = await dynamoDB.scan({
        TableName: 'Todos' // Replace with your DynamoDB table name
    }).promise();

    return {
        statusCode: 200,
        body: JSON.stringify(result.Items)
    };
};