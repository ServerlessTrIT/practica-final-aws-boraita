'use strict';
var AWS = require('aws-sdk');

module.exports.handler = async (event, context) => {
	var ddb = new AWS.DynamoDB({ apiVersion: '2012-08-10' });
	const userActivity = JSON.parse(event['body']);
	var params = {
		TableName: 'MonitorUA',
		Key: { id: { S: userActivity.id } },
	};
	const result = await ddb
		.deleteItem(params, (err, data) => {
			if (err) {
				console.log('Error deleted', err);
			} else {
				console.log('Success Deleted', data);
			}
		})
		.promise();
	return {
		statusCode: 200,
		body: JSON.stringify(result, null, 2),
	};
};
