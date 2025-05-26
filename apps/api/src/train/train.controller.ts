import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
  UseInterceptors,
} from '@nestjs/common';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { CreateTrainDto } from './dto/create-train.dto';
import { UpdateTrainDto } from './dto/update-train.dto';
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

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.trainService.remove(id);
  }

  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateTrainDto: UpdateTrainDto) {
    return this.trainService.update(id, updateTrainDto);
  }

  @Patch(':id')
  patch(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateTrainDto) {
    return this.trainService.patch(id, dto);
  }
}
