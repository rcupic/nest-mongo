import { ApiProperty } from '@nestjs/swagger';

export class ReadIngredientDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;
}
