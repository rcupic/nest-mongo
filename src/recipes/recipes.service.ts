import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PaginateModel } from 'mongoose';
import { Ingredient, IngredientDocument } from '../schemas/ingredient.schema';
import { Recipe, RecipeDocument } from '../schemas/recipe.schema';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { UpdateRecipeDto } from './dto/update-recipe.dto';

@Injectable()
export class RecipesService {
  constructor(
    @InjectModel(Recipe.name)
    private recipeModel: PaginateModel<RecipeDocument>,
    @InjectModel(Ingredient.name)
    private ingredientModel: PaginateModel<IngredientDocument>,
  ) {}

  private async createWIngredients(): Promise<void> {
    try {
      const ingredients = await this.ingredientModel.paginate({}, { page: 2 });
      console.log({ ingredients });
      const ingredientIds = ingredients.docs.map(({ _id }) => _id);
      await this.recipeModel.create({
        name: 'Moj recept',
        description: 'Hehe',
        ingredients: ingredientIds,
      });
    } catch (error) {
      console.log(error);
    }
  }

  private async deleteAll() {
    try {
      const data = await this.recipeModel.deleteMany();
    } catch (error) {
      console.log(error);
    }
  }

  public async create(
    createRecipeDto: CreateRecipeDto,
  ): Promise<RecipeDocument> {
    try {
      const data = await this.recipeModel.create(createRecipeDto);
      console.log(data);
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  public async findAll(): Promise<RecipeDocument[]> {
    try {
      const data = await this.recipeModel.find();
      console.log(data);
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  public async update(id: number, updateRecipeDto: UpdateRecipeDto) {
    try {
      const data = await this.recipeModel.findById(id);

      if (!data) {
        throw new BadRequestException('Recipe is not found');
      }

      await this.recipeModel.updateOne({ id }, updateRecipeDto);
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  public async deleteOne(id: number) {
    try {
      const data = await this.recipeModel.findById(id);

      if (!data) {
        throw new BadRequestException('Recipe is not found');
      }

      await this.recipeModel.deleteOne({ id });
      return data;
    } catch (error) {
      console.log(error);
    }
  }
}
