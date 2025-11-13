import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class BookService {
  constructor(private readonly db: DatabaseService) {}

  async create(createBookDto: CreateBookDto) {
    try {
      const book = await this.db.book.create({ data: createBookDto });
      return book;
    } catch (error) {
      throw new ForbiddenException('Something went wrong');
    }
  }

  async findAll() {
    const books = await this.db.book.findMany();
    return books;
  }

  async findOne(id: number) {
    const book = await this.db.book.findUnique({
      where: {
        id,
      },
    });

    if (!book) {
      throw new NotFoundException('book not found');
    }
    return book;
  }

  async update(id: number, updateBookDto: UpdateBookDto) {
    await this.findOne(id);

    await this.db.book.update({
      where: {
        id,
      },
      data: updateBookDto,
    });
    return `The book updated successfully`;
  }

  async remove(id: number) {
    await this.findOne(id);
    return await this.db.book.delete({
      where: {
        id: id,
      },
    });
  }
}
