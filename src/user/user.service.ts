import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { DatabaseService } from 'src/database/database.service';
import { Prisma } from '@prisma/client';
import bcrypt from 'bcryptjs';

@Injectable()
export class UserService {
  constructor(private readonly db: DatabaseService) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const saltRound = 10;
      const hashedPassword = await bcrypt.hash(
        createUserDto.password,
        saltRound,
      );
      const userRegister = await this.db.user.create({
        data: { ...createUserDto, password: hashedPassword },
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

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
