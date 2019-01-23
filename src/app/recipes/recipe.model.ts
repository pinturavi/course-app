import { Ingredient } from '../shared/ingredient.model';

export class Recipe{

    public name:String;
    public description:String;
    public imagePath:String;
    public ingredients:Ingredient[];

    constructor(name:String,desccription:String, imagePath:String, ingredients: Ingredient[]){
        this.name=name;
        this.description=desccription;
        this.imagePath=imagePath;
        this.ingredients=ingredients;
    }
}