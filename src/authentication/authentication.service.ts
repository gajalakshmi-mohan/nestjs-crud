import { BadRequestException, Injectable } from '@nestjs/common';
import { LoginDto, RegisterDto } from './dto/authentication.dto';
import { DatabaseService } from 'src/database/database.service';
import { Prisma } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

@Injectable()
export class AuthenticationService {
  constructor(private readonly db: DatabaseService) {}

  async create(registerDto: RegisterDto) {
    try {
      const saltRound = 10;
      const hashedPassword = await bcrypt.hash(registerDto.password, saltRound);
      const userRegister = await this.db.user.create({
        data: { ...registerDto, password: hashedPassword },
      });
      const { password, ...userDetail } = userRegister;
      return userDetail;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new BadRequestException('Data already exists');
      }
      throw new BadRequestException('something went wrong');
    }
  }
  async login(loginDto: LoginDto) {
    const user = await this.db.user.findFirst({
      where: {
        phn_no: loginDto.phn_no,
      },
    });
    if (!user) {
      throw new BadRequestException('Phone number not exist');
    }
    const isPasswordValid = await bcrypt.compare(
      loginDto.password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new BadRequestException('Password Invalid');
    }

    const token = jwt.sign(
      {
        id: user.id,
        phn_no: user.phn_no,
        password: user.password,
      },
      '1234',
    );
    return { id: user.id, token };
  }
}
