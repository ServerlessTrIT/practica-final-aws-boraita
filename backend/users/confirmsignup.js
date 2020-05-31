'use strict';
var AWS = require('aws-sdk');

exports.handler = async (event) => {
	const cognito = new AWS.CognitoIdentityServiceProvider();
	var code = 200;
	var body = {};
	if (event['body'] == null) {
		code = 400;
	} else {
		const user = JSON.parse(event['body']);
		const activator_code = user['code'];
		const email = user['username'];
		var params = {
			ClientId: process.env.CLIENT_ID,
			ConfirmationCode: activator_code,
			Username: email,
		};
		try {
			const returnConfirm = cognito.confirmSignUp(params, function (err, data) {
				if (err) {
					console.log('Error->', err, err.stack);
					body = { message: 'There are an error', error: err };
					return err;
				} else {
					console.log('Data->', data);
					body = { message: 'Confirmed!' };
					return data;
				}
			});
		} catch (e) {
			console.log(e);
			code = 400;
			body = { message: 'Something was wrong!' };
		}
	}
	const response = {
		statusCode: code,
		headers: {
			'Access-Control-Allow-Origin': '*',
			'Access-Control-Allow-Methods': 'OPTIONS, POST',
		},
		body: JSON.stringify(body),
	};
	return response;
};
