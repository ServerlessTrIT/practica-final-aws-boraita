'use strict';
var AWS = require('aws-sdk');

module.exports.handler = async (event, context) => {
	var ddb = new AWS.DynamoDB({ apiVersion: '2012-08-10' });
	const monitor = JSON.parse(event['body']);
	console.log('Monitor ->', monitor);
	var params = {
		TableName: 'MonitorUA',
		Item: {
			id: { S: monitor['id'] },
			name: { S: monitor['name'] },
			surname: { S: monitor['surname'] },
			gender: { S: monitor['gender'] },
		},
	};
	const result = await ddb
		.putItem(params, (err, data) => {
			if (err) {
				console.log('Error saved', err);
			} else {
				console.log('Success saved', data);
			}
		})
		.promise();

	return {
		statusCode: 200,
		body: JSON.stringify(monitor, null, 2),
	};
};