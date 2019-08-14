const AWS = require('aws-sdk');

AWS.config.update({region: 'us-east-1'})

// const ddb = new AWS.DynamoDB({apiVersion: '2012-10-08'})
const documentClient = new AWS.DynamoDB.DocumentClient({region: 'us-east-1'});

exports.handler = async (event, context, callback) => {

  const params = {
    TableName: 'Participants-rycbb6ujlbbvxmz3dkkhtipw2e-env',
    // Key: {
    //   id: event.arguments.userId
    // }
  }
  
  const userId = event.arguments.userId;

  try {
    const data = await documentClient.scan(params).promise();
    let filteredParticipant = data.Items.filter(item => {
      return item.participantId === userId;
    })
    
    callback(null, JSON.stringify(filteredParticipant));
  } catch (error) {
    console.log(error);
    callback(error);
  }
};