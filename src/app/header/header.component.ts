import { Component } from '@angular/core';
import { RecipeService } from '../services/recipe.service';
import {Response} from '@angular/http'


@Component({
    selector:'app-header',
    templateUrl:'./header.component.html'
})
export class HeaderComponent{
    constructor(private recipeService:RecipeService){}
    storeData(){
    this.recipeService.storeData().subscribe((response:Response)=>{
        console.log(response);
    })
    }
}