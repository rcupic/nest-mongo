import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsNumber, IsOptional } from 'class-validator';

export class QueryParamsRecipeDto {
  @ApiProperty()
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  page?: number;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  limit?: number;

  @Transform(({ value }) => value.split(',').filter(el => el !== ''))
  @ApiProperty()
  @IsOptional()
  ingredientId?: string[];
}
