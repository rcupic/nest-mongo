import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RecipeDocument } from 'src/schemas/recipe.schema';
import { IngredientDocument, Ingredient } from '../schemas/ingredient.schema';
import { ReadIngredientDto } from './dto/read-ingredient.dto';

@Injectable()
export class IngredientsService {
  constructor(
    @InjectModel(Ingredient.name)
    private ingredientModel: Model<IngredientDocument>,
  ) {}

  public async findAll(): Promise<ReadIngredientDto[]> {
    try {
      const data = await this.ingredientModel.find({}, '_id name');

      return data.map(this.mapDocToDto);
    } catch (error) {
      console.log(error);
      return [];
    }
  }

  private mapDocToDto(
    ingredientDoc: RecipeDocument & {
      _id: any;
    },
  ): ReadIngredientDto {
    return {
      id: ingredientDoc._id,
      name: ingredientDoc.name,
    };
  }
}
