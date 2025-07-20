import { randomInt } from "crypto";

export function sendOtp(phone: string): number {

    const otp: number = randomInt(100000, 999999);

    // sending the otp goes here, because currently we don't have SMS sending service, it's empty

    return otp;
} 