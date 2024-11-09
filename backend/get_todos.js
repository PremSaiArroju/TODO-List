const AWS = require('aws-sdk');
const dynamoDB = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
    const result = await dynamoDB.scan({
        TableName: 'Todos'
    }).promise();

    return {
        statusCode: 200,
        body: JSON.stringify(result.Items)
    };
};