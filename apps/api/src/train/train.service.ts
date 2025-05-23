import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TrainService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return this.prisma.train.findMany({
      orderBy: {
        number: 'asc',
      },
    });
  }
}
