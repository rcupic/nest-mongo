import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PaginateModel } from 'mongoose';
import { IngredientDocument, Ingredient } from '../schemas/ingredient.schema';

@Injectable()
export class IngredientsService {
  constructor(
    @InjectModel(Ingredient.name)
    private ingredientModel: PaginateModel<IngredientDocument>,
  ) {}

  public async findAll(): Promise<IngredientDocument[]> {
    try {
      const data = await this.ingredientModel.find();
      console.log(data);
      return data;
    } catch (error) {
      console.log(error);
    }
  }
}
