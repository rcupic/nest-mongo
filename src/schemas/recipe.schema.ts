import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Ingredient } from './ingredient.schema';
import * as mongoose from 'mongoose';

export type RecipeDocument = Recipe & Document;

@Schema()
export class Recipe {
  @Prop({
    required: true,
    minlength: 2,
    index: true,
  })
  name: string;

  @Prop({
    required: true,
    minlength: 2,
  })
  description: string;

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Ingredient' }],
    index: true,
  })
  ingredients: Ingredient[];
}

export const RecipeSchema = SchemaFactory.createForClass(Recipe);
