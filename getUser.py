import json
import boto3

# Initialize DynamoDB client
dynamodb = boto3.resource('dynamodb')

# Select Table 
table = dynamodb.Table('userData') 
def lambda_handler(event, context):
    try:
        # Scan DynamoDB table to get all items
        response = table.scan()
        users = response.get('Items', [])

        return {
            'statusCode': 200,
            'body': json.dumps(users)
        }

    except Exception as e:
        return {
            'statusCode': 500,
            'body': json.dumps({'error': str(e)})
        }