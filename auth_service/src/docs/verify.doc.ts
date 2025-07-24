export let verify201Response = {
	status: 201,
	example: {
		success: true,
		user: {
			firstName: 'john',
			lastName: 'doe',
			phoneNumber: '09123456789',
			createdAt: '2025-07-24T12:27:36.095Z',
			updatedAt: '2025-07-24T12:27:36.095Z',
		},
		tokens: {
			accessToken: '<access token>',
			refreshToken: '<refresh token>',
		},
	},
	description:
		'verifying user with otp and phone number and creation of account',
};

export let verify400Response = {
	status: 400,
	example: {
		message: 'there is a problem in verifying your otp code',
		error: 'Bad Request',
		statusCode: 400,
	},
};