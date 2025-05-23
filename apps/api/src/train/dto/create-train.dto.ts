import { IsDateString, IsNotEmpty, IsString } from 'class-validator';

export class CreateTrainDto {
  @IsString()
  @IsNotEmpty()
  number: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  type: string;

  @IsDateString()
  departureTime: Date;

  @IsString()
  @IsNotEmpty()
  departureStation: string;

  @IsDateString()
  arrivalTime: Date;

  @IsString()
  @IsNotEmpty()
  arrivalStation: string;
}
