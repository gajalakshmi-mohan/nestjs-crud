import { IsEmail, IsNumber, isNumber, IsString, Length } from 'class-validator';

export class CreateUserDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @Length(10, 10)
  phn_no: string;

  @IsString()
  password: string;
}
