import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PaginateModel } from 'mongoose';
import { Ingredient } from 'src/schemas/ingredient.schema';
import { Recipe, RecipeDocument } from '../schemas/recipe.schema';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { PaginateReadRecipeDto } from './dto/paginate-read-recipe.dto';
import { QueryParamsRecipeDto } from './dto/query-params-recipe.dto';
import { ReadRecipeDto } from './dto/read-recipe.dto';
import { UpdateRecipeDto } from './dto/update-recipe.dto';

@Injectable()
export class RecipesService {
  constructor(
    @InjectModel(Recipe.name)
    private recipeModel: PaginateModel<RecipeDocument>,
  ) {}

  public async create(
    createRecipeDto: CreateRecipeDto,
  ): Promise<ReadRecipeDto> {
    try {
      const { ingredientIds, ...restCreateRecipeDto } = createRecipeDto;

      const createdData = await this.recipeModel.create({
        ingredients: ingredientIds,
        ...restCreateRecipeDto,
      });

      const data = await createdData.populate<{
        ingredients: (Ingredient & { _id: any })[];
      }>('ingredients', '_id name');

      return this.mapDocToDto(data);
    } catch (error) {
      console.log(error);
      throw new BadRequestException('Something went wrong');
    }
  }

  public async findAll(
    queryParams: QueryParamsRecipeDto,
  ): Promise<PaginateReadRecipeDto> {
    try {
      const where: {
        ingredients?: { $all: string[] };
        name?: { $regex: RegExp };
      } = {};

      if (queryParams.ingredientId && queryParams.ingredientId.length) {
        where.ingredients = { $all: queryParams.ingredientId };
      }

      if (queryParams.nameWordStartWith) {
        where.name = {
          $regex: new RegExp(
            `(\\s${queryParams.nameWordStartWith}|^${queryParams.nameWordStartWith})`,
            'i',
          ),
        };
      }

      const { page, limit } = queryParams;

      const data = await this.recipeModel.paginate(where, {
        limit: limit || 5,
        page: page || 1,
        populate: 'ingredients',
      });

      return {
        pages: data.totalPages,
        count: data.totalDocs,
        rows: data.docs.map(this.mapDocToDto),
      };
    } catch (error) {
      console.log(error);
      return { pages: 0, count: 0, rows: [] };
    }
  }

  public async findById(id: string): Promise<ReadRecipeDto> {
    try {
      const data = await this.recipeModel
        .findById(id, '_id name description ingredients')
        .populate<{ ingredients: (Ingredient & { _id: any })[] }>(
          'ingredients',
          '_id name',
        );

      if (!data) {
        throw new NotFoundException('Recipe is not found');
      }

      return this.mapDocToDto(data);
    } catch (error) {
      console.log(error);
      throw new NotFoundException('Recipe is not found');
    }
  }

  public async update(
    id: string,
    updateRecipeDto: UpdateRecipeDto,
  ): Promise<ReadRecipeDto> {
    const data = await this.recipeModel
      .findById(id, '_id name description ingredients')
      .populate<{ ingredients: (Ingredient & { _id: any })[] }>(
        'ingredients',
        '_id name',
      );

    if (!data) {
      throw new BadRequestException('Recipe is not found');
    }

    try {
      const { ingredientIds, ...restUpdateRecipeDto } = updateRecipeDto;

      const updateRes = await this.recipeModel.updateOne(
        { _id: id },
        { ...restUpdateRecipeDto, ingredients: ingredientIds },
      );

      if (updateRes.modifiedCount) {
        const updatedData = await this.recipeModel
          .findById(id, '_id name description ingredients')
          .populate<{ ingredients: (Ingredient & { _id: any })[] }>(
            'ingredients',
            '_id name',
          );

        return this.mapDocToDto(updatedData);
      }

      return this.mapDocToDto(data);
    } catch (error) {
      console.log(error);
      return this.mapDocToDto(data);
    }
  }

  public async deleteOne(id: string): Promise<void> {
    try {
      await this.recipeModel.deleteOne({ _id: id });
    } catch (error) {
      console.log(error);
    }
  }

  private mapDocToDto(
    recipeDoc: RecipeDocument & {
      _id: any;
      ingredients: (Ingredient & {
        _id: any;
      })[];
    },
  ): ReadRecipeDto {
    return {
      id: recipeDoc._id,
      name: recipeDoc.name,
      description: recipeDoc.description,
      ingredients: recipeDoc.ingredients.map(
        (el: Ingredient & { _id: any }) => ({
          id: el._id,
          name: el.name,
        }),
      ),
    };
  }
}
