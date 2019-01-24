import { Injectable, EventEmitter } from '@angular/core';
import { Recipe } from '../recipes/recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';
import { Subject } from 'rxjs';
import {Http} from '@angular/http';

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
    recipesChanged=new Subject<Recipe[]>();

    constructor(private shoppingListService:ShoppingListService, private http:Http) { }

    getRecipes() {
        return this.recipes.slice();
    }

    addIngredientToList(ingredients:Ingredient[]){
        this.shoppingListService.addIngredientToList(ingredients);
    }

    getRecipeById(id:number):Recipe{
        return this.recipes[id-1];
    }

    addRecipe(recipe:Recipe){
        this.recipes.push(recipe);
        this.recipesChanged.next(this.recipes.slice());
    }

    updateRecipe(index:number, recipe:Recipe){
        this.recipes[index] = recipe;
        this.recipesChanged.next(this.recipes.slice());
    }
    deleteRecipe(index: number){
        this.recipes.splice(index, 1);
        this.recipesChanged.next(this.recipes.slice());
    }

    storeData(){
        return this.http.put('https://ng-recipe-book-pintu.firebaseio.com/api/recipes.json', this.recipes);
    }
}