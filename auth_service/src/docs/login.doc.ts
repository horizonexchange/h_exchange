export let login200Response = {
	status: 200,
	example: {
		success: true,
		accessToken: '<access token>',
		refreshToken: '<refresh token>',
	},
	description: 'user logins, returned data is tokens',
};

export let login400Response = {
	status: 400,
	example: {
		message: ['wrong phone number or password'],
		error: 'Bad Request',
		statusCode: 400,
	},
};