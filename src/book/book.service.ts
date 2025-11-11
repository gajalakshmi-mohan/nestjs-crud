import { Injectable } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { PrismaClient } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class BookService {
  constructor(private readonly db: DatabaseService) {}

  async create(createBookDto: CreateBookDto) {
    await this.db.book.create({ data: createBookDto });
    return 'This action adds a new book';
  }

  async findAll() {
    const books = await this.db.book.findMany();
    return books;
  }

  findOne(id: number) {
    return `This action returns a #${id} book`;
  }

  update(id: number, updateBookDto: UpdateBookDto) {
    return `This action updates a #${id} book`;
  }

  async remove(id: number) {
    return await this.db.book.delete({
      where: {
        id: id,
      },
    });
  }
}
