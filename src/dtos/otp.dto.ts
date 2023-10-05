import { IsString, IsEmail, IsNotEmpty, MaxLength, IsStrongPassword } from "class-validator";

type IsStrongPasswordOptions = {
  minLength: number;
  minLowercase: number;
  minUppercase: number;
  minNumbers: number;
  minSymbols: number;
};

const strongPasswordOptions: IsStrongPasswordOptions = {
  minLength: 8,
  minLowercase: 1,
  minUppercase: 1,
  minNumbers: 1,
  minSymbols: 0,
};

export class OtpDto {
  @IsEmail()
  @IsString()
  @IsNotEmpty({ message: "Email Required" })
  @MaxLength(255)
  public email: string;

  @IsString()
  @IsNotEmpty({ message: "OTP Required" })
  @MaxLength(6)
  public otp: string;

  @IsString()
  @IsNotEmpty({ message: "OTP type Required" })
  public otp_type: string;

  @IsString()
  @IsNotEmpty({ message: "Expiration time type Required" })
  public expiration_time: Date;
}

export class RequestOtpDto {
  @IsEmail()
  @IsString()
  @IsNotEmpty({ message: "Email Required" })
  @MaxLength(255)
  public email: string;
}

export class ResetPasswordDto {
  @IsString()
  @IsNotEmpty({ message: "Password Required" })
  @MaxLength(25)
  @IsStrongPassword(strongPasswordOptions)
  public password: string;

  @IsEmail()
  @IsString()
  @IsNotEmpty({ message: "Email Required" })
  @MaxLength(255)
  public email: string;
}

export class VerifyOtplDto {
  @IsString()
  @IsNotEmpty({ message: "Otp Required" })
  @MaxLength(25)
  @IsStrongPassword(strongPasswordOptions)
  public otp: string;

  @IsEmail()
  @IsNotEmpty({ message: "Email Required" })
  @IsString()
  @MaxLength(255)
  public email: string;
}
