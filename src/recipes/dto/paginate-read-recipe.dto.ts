import { ApiProperty } from '@nestjs/swagger';
import { ReadRecipeDto } from './read-recipe.dto';

export class PaginateReadRecipeDto {
  @ApiProperty()
  pages: number;

  @ApiProperty()
  count: number;

  @ApiProperty()
  rows: ReadRecipeDto[];
}
