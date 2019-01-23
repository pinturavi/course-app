import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from 'src/app/services/recipe.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipe:Recipe;
  id:number;  
  
  constructor(private recipeService:RecipeService, private route:ActivatedRoute, private router:Router) { }

  ngOnInit() {
   this.route.params.subscribe((params:Params)=>{
     this.id=+params['id'];
     this.recipe=this.recipeService.getRecipeById(this.id)
    });
  }

  addToList(){
    this.recipeService.addIngredientToList(this.recipe.ingredients);
  }
  onEditLinkClicked(){
    this.router.navigate(['edit'], {relativeTo:this.route});
  }

}
