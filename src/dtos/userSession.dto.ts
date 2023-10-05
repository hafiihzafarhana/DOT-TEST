import { IsNotEmpty, IsString, MaxLength } from "class-validator";

export class UserSessionDto {
  public id: string;

  @IsString()
  @IsNotEmpty({ message: "User Session: User Id Required" })
  @MaxLength(255)
  public user_id: string;

  @IsString()
  @IsNotEmpty({ message: "User Session: User Agent Required" })
  @MaxLength(255)
  public user_agent: string;

  @IsString()
  @IsNotEmpty({ message: "User Session: Access Token Required" })
  @MaxLength(255)
  public access_token: string;

  @IsString()
  @IsNotEmpty({ message: "User Session: Refresh Token Required" })
  @MaxLength(255)
  public refresh_token: string;

  @IsString()
  @IsNotEmpty({ message: "User Session: Status Required" })
  public status: string;
}
