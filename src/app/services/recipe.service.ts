import { Injectable, EventEmitter } from '@angular/core';
import { Recipe } from '../recipes/recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';

@Injectable({ providedIn: 'root' })
export class RecipeService {
    recipes: Recipe[] = [
        new Recipe(
            'Test recipe1',
            'a test',
            'favicon.ico',
            [
                new Ingredient('Meat', 5),
                new Ingredient('bread', 10)
            ]),
        new Recipe('Test recipe2',
            'a test',
            'favicon.ico',
            [
                new Ingredient('butter', 15),
                new Ingredient('milk', 10)
            ])
    ];


    selectedRecipe: Recipe;

    constructor(private shoppingListService:ShoppingListService) { }

    getRecipes() {
        return this.recipes.slice();
    }

    addIngredientToList(ingredients:Ingredient[]){
        this.shoppingListService.addIngredientToList(ingredients);
    }

    getRecipeById(id:number):Recipe{
        return this.recipes[id-1];
    }
}