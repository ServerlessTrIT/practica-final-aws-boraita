'use strict';
var AWS = require('aws-sdk');

module.exports.handler = async (event, context) => {
	var ddb = new AWS.DynamoDB({ apiVersion: '2012-08-10' });
	var message = [];
	var result;
	var params = {
		TableName: 'MonitorUA',
	};
	if (event['pathParameters'] != null) {
		console.log('event pathParameters ->', event['pathParameters']);

		params['Key'] = {
			id: { S: event['pathParameters']['id'] },
		};
		result = await ddb
			.getItem(params, (err, data) => {
				if (err) {
					console.log('GetItems Error', JSON.stringify(err, null, 2));
				} else {
					message.push(data);
					console.log('GetItems Success', JSON.stringify(data, null, 2));
				}
			})
			.promise();
	} else {
		result = await ddb
			.scan(params, async (err, data) => {
				if (err) {
					console.log('GetItem Error', JSON.stringify(err, null, 2));
				} else {
					data.Items.forEach((element, index, array) => {
						message.push(element);
						console.log(element.isbn.S + ' (' + element.title.S + ')');
					});
					console.log('GetItem Success', JSON.stringify(data, null, 2));
				}
			})
			.promise();
	}
	console.log('Result return ->', result);
	return {
		statusCode: 200,
		body: JSON.stringify(
			{
				message: 'List Item!',
				input: message,
			},
			null,
			2
		),
	};
};
