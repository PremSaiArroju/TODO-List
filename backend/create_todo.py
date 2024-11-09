import json
import uuid
import boto3
from datetime import datetime

dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('Todos')

def lambda_handler(event, context):
    data = json.loads(event['body'])
    todo_item = {
        'id': str(uuid.uuid4()),
        'title': data['title'],
        'completed': False,
        'createdAt': datetime.now().isoformat()
    }
    table.put_item(Item=todo_item)
    return {
        'statusCode': 200,
        'body': json.dumps(todo_item)
    }