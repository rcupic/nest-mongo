import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RecipesModule } from './recipes/recipes.module';
import { IngredientsModule } from './ingredients/ingredients.module';
import * as mongoosePaginate from 'mongoose-paginate-v2';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/myapp', {
      connectionFactory: connection => {
        console.log({ mongoosePaginate });
        connection.plugin(mongoosePaginate);
        return connection;
      },
    }),
    RecipesModule,
    IngredientsModule,
  ],
})
export class AppModule {}
