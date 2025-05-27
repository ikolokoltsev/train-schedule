import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTrainDto } from './dto/create-train.dto';
import { UpdateTrainDto } from './dto/update-train.dto';

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

  async remove(id: number) {
    const train = await this.prisma.train.findUnique({ where: { id } });
    if (!train) {
      throw new NotFoundException(`Train with ID ${id} not found`);
    }

    await this.prisma.train.delete({ where: { id } });
    return { message: `Train ${id} deleted.` };
  }

  async update(id: number, updateTrainDto: UpdateTrainDto) {
    const train = await this.prisma.train.findUnique({ where: { id } });
    if (!train) throw new NotFoundException(`Train ID ${id} not found`);

    return this.prisma.train.update({
      where: { id },
      data: {
        number: updateTrainDto.number,
        name: updateTrainDto.name,
        type: updateTrainDto.type,
        departureStation: updateTrainDto.departureStation,
        arrivalStation: updateTrainDto.arrivalStation,
        departureTime: new Date(updateTrainDto.departureTime!).toISOString(),
        arrivalTime: new Date(updateTrainDto.arrivalTime!).toISOString(),
      },
    });
  }

  async patch(id: number, dto: UpdateTrainDto) {
    const existing = await this.prisma.train.findUnique({ where: { id } });
    if (!existing) throw new NotFoundException(`Train ${id} not found`);

    // Optional: Validate datetime format before saving
    const patchData = {
      ...dto,
      ...(dto.departureTime && {
        departureTime: new Date(dto.departureTime).toISOString(),
      }),
      ...(dto.arrivalTime && {
        arrivalTime: new Date(dto.arrivalTime).toISOString(),
      }),
    };

    return this.prisma.train.update({
      where: { id },
      data: patchData,
    });
  }
}
