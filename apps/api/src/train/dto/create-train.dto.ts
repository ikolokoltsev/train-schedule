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

  @IsString()
  @IsNotEmpty()
  departureStation: string;

  @IsString()
  @IsNotEmpty()
  arrivalStation: string;

  @IsDateString()
  @IsNotEmpty()
  departureTime: string;

  @IsDateString()
  @IsNotEmpty()
  arrivalTime: string;
}
