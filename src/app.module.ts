import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RecipesModule } from './recipes/recipes.module';
import { IngredientsModule } from './ingredients/ingredients.module';
import * as mongoosePaginate from 'mongoose-paginate-v2';
import 'dotenv/config';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_URL, {
      connectionFactory: connection => {
        connection.plugin(mongoosePaginate);
        return connection;
      },
    }),
    RecipesModule,
    IngredientsModule,
  ],
})
export class AppModule {}
