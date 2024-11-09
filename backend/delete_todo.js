const AWS = require('aws-sdk');
const dynamoDB = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
    const todoId = event.pathParameters.id;

    // Delete the item from DynamoDB
    await dynamoDB.delete({
        TableName: 'Todos', // Replace with your DynamoDB table name
        Key: { id: todoId }
    }).promise();

    return {
        statusCode: 200,
        body: JSON.stringify({ message: "Todo deleted successfully" })
    };
};