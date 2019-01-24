import { Ingredient } from '../shared/ingredient.model';

export class Recipe{

    public name:string;
    public description:string;
    public imagePath:string;
    public ingredients:Ingredient[];

    constructor(name:string,desccription:string, imagePath:string, ingredients: Ingredient[]){
        this.name=name;
        this.description=desccription;
        this.imagePath=imagePath;
        this.ingredients=ingredients;
    }
}