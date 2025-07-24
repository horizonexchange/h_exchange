export let register200Response = {
	status: 200,
	example: {
		success: true,
		result: 'We sent a code to your phone number(09123456789)',
	},
	description:
		'registering user and sending OTP endpoint, not creation of the user account',
};

export let register400Response = {
	status: 400,
	example: {
		message: [
			'Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one digit, and one special character.',
		],
		error: 'Bad Request',
		statusCode: 400,
	},
};