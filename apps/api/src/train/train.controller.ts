import { Body, Controller, Get, Post, UseInterceptors } from '@nestjs/common';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { CreateTrainDto } from './dto/create-train.dto';
import { TrainService } from './train.service';

@Controller('train')
export class TrainController {
  constructor(private readonly trainService: TrainService) {}

  @Get()
  findAll() {
    return this.trainService.findAll();
  }

  @Post()
  @UseInterceptors(AnyFilesInterceptor())
  async createTrain(@Body() trainData: CreateTrainDto) {
    return this.trainService.createTrain(trainData);
  }
}
