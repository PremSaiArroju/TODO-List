const AWS = require('aws-sdk');
const dynamoDB = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
    const todoId = event.pathParameters.id;
    const data = JSON.parse(event.body);

    const result = await dynamoDB.update({
        TableName: 'Todos',
        Key: { id: todoId },
        UpdateExpression: "set title = :t, completed = :c",
        ExpressionAttributeValues: {
            ":t": data.title,
            ":c": data.completed
        },
        ReturnValues: "UPDATED_NEW"
    }).promise();

    return {
        statusCode: 200,
        body: JSON.stringify(result.Attributes)
    };
};