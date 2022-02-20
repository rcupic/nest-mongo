import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';
import { config } from '../config/config';
import { IngredientDocument, Ingredient } from '../schemas/ingredient.schema';

@Injectable()
export class IngredientsSeedService {
  constructor(
    @InjectModel(Ingredient.name)
    private ingredientModel: Model<IngredientDocument>,
  ) {
    if (config.SEED_INGREDEINTS) {
      this.seed();
    }
  }

  private async seed(): Promise<void> {
    try {
      await this.ingredientModel.create([
        {
          name: 'Salt',
        },
        { name: 'Milk' },
        { name: 'Flour' },
        { name: 'Lemon' },
        { name: 'Sunflower oil' },
        { name: 'Sugar' },
      ]);
    } catch (error) {
      console.log(error);
    }
  }
}
