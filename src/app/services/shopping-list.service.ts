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
    addIngredientClicked=new Subject<Ingredient[]>();

    constructor(){}

    getIngredients():Ingredient[]{
        return this.ingredients.slice();
    }

    addIngredient(ingredient:Ingredient){
        this.ingredients.push(ingredient);
        this.addIngredientClicked.next(this.ingredients);
    }

    addIngredientToList(ingredinets:Ingredient[]){
        //this.ingredients=this.ingredients.concat(ingredinets);
        this.ingredients.push(...ingredinets);
        this.addIngredientClicked.next(this.ingredients);
    }
}