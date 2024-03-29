'use strict';
var AWS = require('aws-sdk');

exports.handler = (event) => {
	const cognito = new AWS.CognitoIdentityServiceProvider();
	var code = 200;
	var body = {};
	if (event['body'] == null) {
		code = 400;
	} else {
		const user = JSON.parse(event['body']);
		const email = user['username'];
		const pass = user['password'];
		try {
			const params = {
				ClientId: process.env.CLIENT_ID,
				Password: pass,
				Username: email,
				UserAttributes: [
					{
						Name: 'email',
						Value: email,
					},
				],
			};
			cognito.signUp(params, (err, data) => {
				if (err) {
					console.log('Error->', err, err.stack);
					return err;
				} else {
					console.log('Data->', data);
					return data;
				}
			});
			body = {
				message: 'You will receive a email',
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
