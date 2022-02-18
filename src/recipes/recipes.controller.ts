import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { RecipesService } from './recipes.service';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { UpdateRecipeDto } from './dto/update-recipe.dto';
import { QueryParamsRecipeDto } from './dto/query-params-recipe.dto';
import { ReadRecipeDto } from './dto/read-recipe.dto';
import { PaginateReadRecipeDto } from './dto/paginate-read-recipe.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Recipes')
@Controller('recipes')
export class RecipesController {
  constructor(private readonly recipesService: RecipesService) {}

  @Post()
  public create(
    @Body() createRecipeDto: CreateRecipeDto,
  ): Promise<ReadRecipeDto> {
    return this.recipesService.create(createRecipeDto);
  }

  @Get()
  public findAll(
    @Query() queryParams: QueryParamsRecipeDto,
  ): Promise<PaginateReadRecipeDto> {
    return this.recipesService.findAll(queryParams);
  }

  @Get(':id')
  public findOne(@Param('id') id: string): Promise<ReadRecipeDto> {
    return this.recipesService.findById(id);
  }

  @Patch(':id')
  public update(
    @Param('id') id: string,
    @Body() updateRecipeDto: UpdateRecipeDto,
  ): Promise<ReadRecipeDto> {
    return this.recipesService.update(id, updateRecipeDto);
  }

  @Delete(':id')
  public remove(@Param('id') id: string): Promise<void> {
    return this.recipesService.deleteOne(id);
  }
}
