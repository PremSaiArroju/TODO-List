const AWS = require('aws-sdk');  // AWS SDK is included in Lambda runtime by default
const dynamoDb = new AWS.DynamoDB.DocumentClient();
const tableName = process.env.TABLE_NAME;

exports.handler = async (event) => {
    const { httpMethod, pathParameters, body } = event;

    try {
        if (httpMethod === 'GET' && !pathParameters) {
            const params = { TableName: tableName };
            const result = await dynamoDb.scan(params).promise();
            return { statusCode: 200, body: JSON.stringify(result.Items) };
        }

        if (httpMethod === 'POST') {
            const { title } = JSON.parse(body);
            const newItem = { TableName: tableName, Item: { id: Date.now().toString(), title }};
            await dynamoDb.put(newItem).promise();
            return { statusCode: 201, body: JSON.stringify(newItem.Item) };
        }

        if (httpMethod === 'PUT' && pathParameters && pathParameters.id) {
            const { title } = JSON.parse(body);
            const params = {
                TableName: tableName,
                Key: { id: pathParameters.id },
                UpdateExpression: 'set title = :title',
                ExpressionAttributeValues: { ':title': title },
                ReturnValues: 'ALL_NEW',
            };
            const result = await dynamoDb.update(params).promise();
            return { statusCode: 200, body: JSON.stringify(result.Attributes) };
        }

        if (httpMethod === 'DELETE' && pathParameters && pathParameters.id) {
            const params = { TableName: tableName, Key: { id: pathParameters.id }};
            await dynamoDb.delete(params).promise();
            return { statusCode: 204, body: JSON.stringify({ message: "Todo deleted successfully" }) };
        }

        return { statusCode: 404, body: JSON.stringify({ message: "Route not found" }) };
    } catch (error) {
        console.error("Error handling request:", error);
        return { statusCode: 500, body: JSON.stringify({ message: "Internal Server Error", error: error.message }) };
    }
};