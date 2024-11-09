const AWS = require('aws-sdk');
const uuid = require('uuid');
const dynamoDB = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
    const data = JSON.parse(event.body);
    const todoItem = {
        id: uuid.v4(),
        title: data.title,
        completed: false,
        createdAt: new Date().toISOString()
    };
    await dynamoDB.put({
        TableName: 'Todos',
        Item: todoItem
    }).promise();

    return {
        statusCode: 200,
        body: JSON.stringify(todoItem)
    };
};