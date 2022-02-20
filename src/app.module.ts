import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RecipesModule } from './recipes/recipes.module';
import { IngredientsModule } from './ingredients/ingredients.module';
import { config } from './config/config';

@Module({
  imports: [
    MongooseModule.forRoot(config.MONGO_URL, {
      autoIndex: config.NODE_ENV === 'dev',
    }),
    RecipesModule,
    IngredientsModule,
  ],
})
export class AppModule {}
