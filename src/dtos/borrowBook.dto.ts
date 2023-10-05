import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class BorrowBookDto {
  @IsString()
  @IsNotEmpty({ message: "Borrow Book: User Id Required" })
  public user_id: string;

  @IsString()
  @IsNotEmpty({ message: "Borrow Book: Book Id Required" })
  public book_id: string;

  @IsNumber()
  @IsNotEmpty({ message: "Borrow Book: Rental Time Required" })
  public rental_time: number;
}

export class UpdateBorrowBookDto {
  @IsNumber()
  @IsNotEmpty({ message: "Borrow Book: Rental Time Required" })
  public rental_time: number;
}
