import { IsString, IsEmail, MaxLength, IsStrongPassword, IsNotEmpty } from "class-validator";

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

export class UserDto {
  @IsEmail()
  @IsString()
  @IsNotEmpty({ message: "User: Email Required" })
  @MaxLength(255)
  public email: string;

  @IsString()
  @IsNotEmpty({ message: "User: User Name Required" })
  @MaxLength(255)
  public user_name: string;

  @IsString()
  @IsNotEmpty({ message: "User: Password Required" })
  @MaxLength(25)
  @IsStrongPassword(strongPasswordOptions)
  public password: string;

  @IsString()
  @IsNotEmpty({ message: "User: Full Name Required" })
  @MaxLength(255)
  public name: string;
}

export class UpdateUserDto {
  @IsString()
  @MaxLength(255)
  public name: string;

  @IsString()
  @MaxLength(255)
  public user_name: string;
}
