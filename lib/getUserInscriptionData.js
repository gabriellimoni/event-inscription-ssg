const AWS = require('aws-sdk')

const dynamo = new AWS.DynamoDB({
  credentials: {
    accessKeyId: process.env.AWS_APP_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_APP_SECRET_ACCESS_KEY,
  },
  region: process.env.AWS_APP_DEFAULT_REGION,
})

const EVENT_ID = 'evento_unico'

export default async function getUserInscriptionData (email) {
    const queryDataParams = {
        TableName: 'EventRegistrations',
        KeyConditionExpression: 'eventId = :eventId and email = :email',
        ExpressionAttributeValues: {
            ':eventId': { 'S': EVENT_ID },
            ':email': { 'S': email }
        },
    }
    const queryResult = await dynamo.query(queryDataParams).promise()
    
    if (queryResult.Items.length == 0) throw new Error(`User email ${email} not found for ${EVENT_ID}`)

    return queryResult.Items.map(dynamoItem => {
        const resultItem = {}
        
        Object.keys(dynamoItem).forEach(key => {
            const value = Object.values(dynamoItem[key])[0]
            resultItem[key] = value
        })

        return resultItem
    }).pop()
}