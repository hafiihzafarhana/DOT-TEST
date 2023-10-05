import { IsNotEmpty, IsNumber, IsString, MaxLength } from "class-validator";

export class BookDto {
  @IsString()
  @IsNotEmpty({ message: "Book: Name Required" })
  @MaxLength(255)
  public name: string;

  @IsString()
  @IsNotEmpty({ message: "Book: ISBN Required" })
  public isbn: string;

  @IsNumber()
  @IsNotEmpty({ message: "Book: Page Required" })
  public page: number;

  @IsString()
  public description: string;
}
