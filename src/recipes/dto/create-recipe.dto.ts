import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsString, MinLength } from 'class-validator';

export class CreateRecipeDto {
  @ApiProperty()
  @MinLength(2)
  @IsString()
  name: string;

  @ApiProperty()
  @MinLength(2)
  @IsString()
  description: string;

  @ApiProperty()
  @IsArray()
  @IsString({ each: true })
  ingredientIds: string[];
}
