import { IsNotEmpty, IsString, Length, Matches } from 'class-validator';

export class LoginDto {
	/**
	 * @example 09123456789
	 */
	@IsString({ message: 'Phone number must be a string' })
	@Length(11, 11, { message: 'Phone number length is just 11' })
	@IsNotEmpty({ message: 'Phone number is required' })
	phoneNumber: string;

	@IsString({ message: 'Password must be a string' })
	@Length(3, 30, { message: 'Password length is from 8 to 50' })
	@IsNotEmpty({ message: 'Password is required' })
	@Matches(
		/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/,
		{
			message:
				'Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one digit, and one special character.',
		},
	)
	password: string;
}