import { Transform, Type } from 'class-transformer';
import {
  IsNumber,
  Max,
  IsPositive,
  IsString,
  Min,
  IsLongitude,
  IsLatitude,
} from 'class-validator';

// Query params always arrive as strings, so numbers must be converted before validation.
// Both approaches below need `transform: true` on the ValidationPipe so the handler gets the converted values.
//
// @Type(() => Number)      -> shorthand, does Number(value). Keeps decimals. '2018' -> 2018, '43.65' -> 43.65, 'abc' -> NaN
//                             works for both ints and floats because JS has a single number type (no separate int/float)
// @Transform(({ value }))  -> full control, you write the conversion yourself:
//   parseInt(value)        -> whole numbers only, drops decimals. '43.65' -> 43, '2018abc' -> 2018
//   parseFloat(value)      -> keeps decimals. '43.65' -> 43.65

export class GetEstimateDto {
  @IsString()
  make: string;

  @IsString()
  model: string;

  @IsNumber()
  @Min(1930)
  @Max(new Date().getFullYear() + 1)
  @Transform(({ value }) => parseInt(value)) // year is a whole number, so parseInt is fine
  year: number;

  @IsNumber()
  @Max(1000000)
  @IsPositive()
  @Type(() => Number)
  mileage: number;

  @IsLongitude()
  @Transform(({ value }) => parseFloat(value)) // parseFloat, not parseInt - coordinates need their decimals
  lng: number;

  @IsLatitude()
  @Type(() => Number)
  lat: number;
}
