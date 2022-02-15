import { Module } from '@nestjs/common';
import { IngredientsService } from './ingredients.service';
import { IngredientsController } from './ingredients.controller';
import { IngredientsSeedService } from './ingredients-seed.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Ingredient, IngredientSchema } from '../schemas/ingredient.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Ingredient.name, schema: IngredientSchema },
    ]),
  ],
  controllers: [IngredientsController],
  providers: [IngredientsService, IngredientsSeedService],
})
export class IngredientsModule {}
