import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { RecipeService } from "src/app/services/recipe.service";
import { Recipe } from "../recipe.model";
import { FormGroup, FormControl, FormArray, Validators } from "@angular/forms";
import { Ingredient } from 'src/app/shared/ingredient.model';

@Component({
  selector: "app-recipe-edit",
  templateUrl: "./recipe-edit.component.html",
  styleUrls: ["./recipe-edit.component.css"]
})
export class RecipeEditComponent implements OnInit {
  id: number;
  editMode: boolean = false;
  recipe: Recipe;

  editFrom: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipeService,
    private router:Router
  ) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = +params["id"];
      this.editMode = Boolean(this.id);
      this.initForm();
    });
  }

  initForm() {
    let recipeName: string = "";
    let imagePath: string = "";
    let description: string = "";
    let recipeIngredients: FormArray = new FormArray([]);
    if (this.editMode) {
      this.recipe = this.recipeService.getRecipeById(this.id);
      recipeName = this.recipe.name;
      imagePath = this.recipe.imagePath;
      description = this.recipe.description;
      if (this.recipe.ingredients) {
        for (let ingredient of this.recipe["ingredients"]) {
          recipeIngredients.push(
            new FormGroup({
              name: new FormControl(ingredient.name, [Validators.required]),
              amount: new FormControl(ingredient.amount, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
            })
          );
        }
      }
    }
    this.editFrom = new FormGroup({
      name: new FormControl(recipeName, [Validators.required]),
      imagePath: new FormControl(imagePath, [Validators.required]),
      description: new FormControl(description, [Validators.required]),
      ingredients: recipeIngredients
    });
  }

  getControls() {
    return (<FormArray>this.editFrom.get("ingredients")).controls;
  }

  onAddIngredient() {
    return (<FormArray>this.editFrom.get("ingredients")).push(
      new FormGroup({
        name: new FormControl("", [Validators.required]),
        amount: new FormControl("", [Validators.required, Validators.pattern(/^[1-9]+[0-9]$/)])
      })
    );
  }

  onSubmit() {
    let ingredients: Ingredient[] = [];
    let values = this.editFrom.value.ingredients;
    for (let value of values) {
      ingredients.push(new Ingredient(value.name, value.amount))
    }
    if (this.editMode) {
      this.recipeService.updateRecipe(this.id-1, this.editFrom.value);
    } else {
      this.recipeService.addRecipe(this.editFrom.value);
    }
    this.router.navigate(['../', {relativeTo:this.route}]);
  }

  onCancel(){
    this.router.navigate(['../', {relativeTo:this.route}]);
  }

  onDeleteIngredient(index:number){
    return (<FormArray>this.editFrom.get('ingredients')).removeAt(index);
  }

}
