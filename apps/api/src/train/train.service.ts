import { BadRequestException, ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTrainDto } from './dto/create-train.dto';

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

  async createTrain(trainData: CreateTrainDto) {
    const existingTrain = await this.prisma.train.findUnique({
      where: { number: trainData.number },
    });
    if (existingTrain) {
      throw new ConflictException('Train number already exists');
    }

    const departureTime = trainData.departureTime ? new Date(trainData.departureTime) : null;
    const arrivalTime = trainData.arrivalTime ? new Date(trainData.arrivalTime) : null;

    if (!departureTime || isNaN(departureTime.getTime())) {
      throw new BadRequestException('Invalid departureTime format');
    }
    if (!arrivalTime || isNaN(arrivalTime.getTime())) {
      throw new BadRequestException('Invalid arrivalTime format');
    }

    return this.prisma.train.create({
      data: {
        number: trainData.number,
        name: trainData.name,
        type: trainData.type,
        departureStation: trainData.departureStation,
        arrivalStation: trainData.arrivalStation,
        departureTime: departureTime.toISOString(),
        arrivalTime: arrivalTime.toISOString(),
      },
    });
  }
}
