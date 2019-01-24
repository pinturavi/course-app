import { Injectable } from '@angular/core';
import {Ingredient} from '../shared/ingredient.model'
import {Subject} from 'rxjs'

@Injectable({
    providedIn:'root'
})
export class ShoppingListService{
    private ingredients : Ingredient[]=[
        new  Ingredient('Apple', 5),
        new Ingredient('Tomato', 10)
      ];
      ingredientsChanged=new Subject<Ingredient[]>();
    startedEditing = new Subject<number>();

    constructor(){}

    getIngredients():Ingredient[]{
        return this.ingredients.slice();
    }

    addIngredient(ingredient:Ingredient){
        this.ingredients.push(ingredient);
        this.ingredientsChanged.next(this.ingredients);
    }

    addIngredientToList(ingredinets:Ingredient[]){
        //this.ingredients=this.ingredients.concat(ingredinets);
        this.ingredients.push(...ingredinets);
        this.ingredientsChanged.next(this.ingredients);
    }

    editIngredient(i:number, ingredient:Ingredient){
        this.ingredients[i] = ingredient;
        this.ingredientsChanged.next(this.ingredients.slice());
    }

    getIngredient(i){
        return this.ingredients.slice()[i];
    }

    deleteIngredient(index:number){
        this.ingredients.splice(index, 1);
        this.ingredientsChanged.next(this.ingredients.slice());
    }
}