import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PaginateModel } from 'mongoose';
import { Recipe, RecipeDocument } from '../schemas/recipe.schema';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { QueryParamsRecipeDto } from './dto/query-params-recipe.dto';
import { UpdateRecipeDto } from './dto/update-recipe.dto';

@Injectable()
export class RecipesService {
  constructor(
    @InjectModel(Recipe.name)
    private recipeModel: PaginateModel<RecipeDocument>,
  ) {}

  public async create(
    createRecipeDto: CreateRecipeDto,
  ): Promise<RecipeDocument> {
    try {
      const { ingredientIds, ...restCreateRecipeDto } = createRecipeDto;

      const data = await this.recipeModel.create({
        ingredients: ingredientIds,
        ...restCreateRecipeDto,
      });

      return data;
    } catch (error) {
      console.log(error);
      throw new BadRequestException('Something went wrong');
    }
  }

  public async findAll(
    queryParams: QueryParamsRecipeDto,
  ): Promise<RecipeDocument[]> {
    try {
      const where = queryParams.ingredientId
        ? {
            ingredients: { $in: queryParams.ingredientId },
          }
        : {};

      const { page, limit } = queryParams;

      const data = await this.recipeModel.paginate(where, {
        limit: limit || 25,
        page: page || 1,
        populate: 'ingredients',
      });

      return data.docs;
    } catch (error) {
      console.log(error);
      return [];
    }
  }

  public async update(
    id: string,
    updateRecipeDto: UpdateRecipeDto,
  ): Promise<RecipeDocument> {
    const data = await this.recipeModel.findById(id);

    if (!data) {
      throw new BadRequestException('Recipe is not found');
    }

    try {
      const { ingredientIds, ...restUpdateRecipeDto } = updateRecipeDto;

      const updateRes = await this.recipeModel.updateOne(
        { id },
        { ...restUpdateRecipeDto, ingredients: ingredientIds },
      );

      if (updateRes.modifiedCount) {
        const updatedData = await this.recipeModel.findById(id);

        return updatedData;
      }

      return data;
    } catch (error) {
      console.log(error);
      return data;
    }
  }

  public async deleteOne(id: string): Promise<void> {
    try {
      await this.recipeModel.deleteOne({ id });
    } catch (error) {
      console.log(error);
    }
  }
}
