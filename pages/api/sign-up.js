const AWS = require('aws-sdk')
AWS.config.credentials = new AWS.Credentials({
  accessKeyId: process.env.AWS_APP_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_APP_SECRET_ACCESS_KEY,
  region: process.env.AWS_APP_DEFAULT_REGION,
})

const dynamo = new AWS.DynamoDB()

const EVENT_ID = 'evento_unico'

export default async (req, res) => {
  console.log('LOGGING SIGNUP', req.body)
  const { name, email, pictureUrl } = req.body
  try {
    // check if email already registered
    if (await isEmailAlreadyRegistered(email)) {
      res.statusCode = 400
      return res.json({ error: 'user/already-registered', message: 'User already registered' })
    }

    // create new register with user data
    await doRegisterUser({ name, email, pictureUrl })

    res.statusCode = 201
    res.end()
  } catch (error) {
    // todo handle error properly
    console.error(error)

    res.statusCode = 500
    res.end()
  }
}

async function isEmailAlreadyRegistered (email) {
  const queryDataParams = {
    TableName: 'EventRegistrations',
    KeyConditionExpression: 'eventId = :eventId and email = :email',
    ExpressionAttributeValues: {
      ':eventId': { 'S': EVENT_ID },
      ':email': { 'S': email }
    },
    ProjectionExpression: 'eventId, email',
  }

  const queryResult = await dynamo.query(queryDataParams).promise()
  const items = queryResult.Items

  return items.length > 0
}

async function doRegisterUser (userData) {
  const putDataParams = {
    TableName: 'EventRegistrations',
    Item: {
      'eventId': { 'S': EVENT_ID },
      'email': { 'S': userData.email },
      'name': { 'S': userData.name },
      'pictureUrl': { 'S': userData.pictureUrl || '' },
    }
  }

  await dynamo.putItem(putDataParams).promise()
}
