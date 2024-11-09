const AWS = require('aws-sdk');
const uuid = require('uuid');
const dynamoDB = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
    const data = JSON.parse(event.body);

    // Create a new todo item
    const todoItem = {
        id: uuid.v4(),
        title: data.title,
        completed: false,
        createdAt: new Date().toISOString()
    };

    // Save the item to DynamoDB
    await dynamoDB.put({
        TableName: 'Todos', // Replace with your DynamoDB table name
        Item: todoItem
    }).promise();

    return {
        statusCode: 200,
        body: JSON.stringify(todoItem)
    };
};