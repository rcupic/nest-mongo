export class ReadRecipeDto {
  id: string;

  name: string;

  description: string;

  ingredients: {
    id: string;

    name: string;
  }[];
}
