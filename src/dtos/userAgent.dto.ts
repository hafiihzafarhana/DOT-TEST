import { IsString } from "class-validator";

export class UserAgentDto {
  @IsString()
  public browser: string;

  @IsString()
  public version: string;

  @IsString()
  public os: string;

  @IsString()
  public platform?: string;
}

export class userLogHeaderDto extends UserAgentDto {
  @IsString()
  public ip_address: string | string[] | undefined;

  @IsString()
  public referrer: string | undefined;

  @IsString()
  public source: string;
}
