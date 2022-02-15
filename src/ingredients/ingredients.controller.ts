import { Controller, Get } from '@nestjs/common';
import { IngredientDocument } from 'src/schemas/ingredient.schema';
import { IngredientsService } from './ingredients.service';

@Controller('ingredients')
export class IngredientsController {
  constructor(private readonly ingredientsService: IngredientsService) {}

  @Get()
  public findAll(): Promise<IngredientDocument[]> {
    return this.ingredientsService.findAll();
  }
}
