import json
import boto3

# Initialize DynamoDB client
dynamodb = boto3.resource('dynamodb')

# Select table 
table = dynamodb.Table('userData') 

# Define handler function
def lambda_handler(event, context):
    try:       
        id = event['id']
        name = event['name']
        email = event['email']
        
        # Put item into DynamoDB
        table.put_item(
            Item={
                'id' : id,
                'name': name,
                'email': email
            }
        )
        
        return {
            'statusCode': 200,
            'body': json.dumps({'message': 'User added successfully'})
        }

    except Exception as e:
        return {
            'statusCode': 500,
            'body': json.dumps({'error': str(e)})
        }