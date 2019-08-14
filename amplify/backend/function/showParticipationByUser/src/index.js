const AWS = require('aws-sdk');

AWS.config.update({region: 'us-east-1'})

// const ddb = new AWS.DynamoDB({apiVersion: '2012-10-08'})
const documentClient = new AWS.DynamoDB.DocumentClient({region: 'us-east-1'});

exports.handler = async (event, context, callback) => {

  const paramsParticipation = {
    TableName: 'Participants-rycbb6ujlbbvxmz3dkkhtipw2e-env',
  };
  
  const userId = event.arguments.userId;

  try {
    const data = await documentClient.scan(paramsParticipation).promise();
    var filteredParticipant = data.Items.filter(item => {
      return item.participantId === userId;
    })

    const participations = [];
    
    for(var i = 0; i < filteredParticipant.length; i++) {
      const paramsContest = {
        TableName: 'CreateContest-rycbb6ujlbbvxmz3dkkhtipw2e-env',
        Key: {
          id: filteredParticipant[i].participantsContestId
        }
      };
      const participationContest = await documentClient.get(paramsContest).promise();
      participations.push({participation: filteredParticipant[i], contestData: participationContest});
    }
    
    console.log(participations);
    
    callback(null, JSON.stringify(participations));
  } catch (error) {
    console.log(error);
    callback(JSON.stringify(error));
  }
};