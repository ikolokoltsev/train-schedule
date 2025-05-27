import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { TrainController } from './train.controller';
import { TrainService } from './train.service';

@Module({
  controllers: [TrainController],
  providers: [TrainService, PrismaService],
})
export class TrainModule {}
