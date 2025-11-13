import { PickType } from '@nestjs/mapped-types';
import { CreateUserDto } from 'src/user/dto/create-user.dto';

export class RegisterDto extends CreateUserDto {}

export class LoginDto extends PickType(CreateUserDto, ['phn_no', 'password']) {}
