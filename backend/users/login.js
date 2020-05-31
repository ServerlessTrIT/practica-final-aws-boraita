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
		const email = user['username'];
		const pass = user['password'];
		var params = {
			AuthFlow: 'USER_PASSWORD_AUTH',
			ClientId: process.env.CLIENT_ID,
			AuthParameters: {
				USERNAME: email,
				PASSWORD: pass,
			},
		};
		try {
			const result = await cognito
				.initiateAuth(params, (err, data) => {
					if (err) {
						console.log('Error->', err, err.stack);
						return err;
					} else {
						console.log('Data->', data);
						return data;
					}
				})
				.promise();
			body = {
				access_token: result['AuthenticationResult']['IdToken']
			};
		} catch (e) {
			code = 400;
			body = { messages: e };
			console.log(e);
		}
	}
	const response = {
		statusCode: code,
		headers: {
			'Access-Control-Allow-Origin': '*',
			'Access-Control-Allow-Methods': 'OPTIONS, POST'
		},
		body: JSON.stringify(body),
	};
	return response;
};
