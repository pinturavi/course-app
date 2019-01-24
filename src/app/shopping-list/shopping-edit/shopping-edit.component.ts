import {
  Component,
  OnInit,
  ViewChild,
  Output,
  EventEmitter,
  ElementRef,
  OnDestroy
} from "@angular/core";
import { Ingredient } from "src/app/shared/ingredient.model";
import { ShoppingListService } from "src/app/services/shopping-list.service";
import { NgForm } from "@angular/forms";
import { Subscription } from "rxjs";

@Component({
  selector: "app-shopping-edit",
  templateUrl: "./shopping-edit.component.html",
  styleUrls: ["./shopping-edit.component.css"]
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild("f") editForm: NgForm;
  subscription: Subscription;
  editMode = false;
  editedIndex:number;
  editedIngredient;
  constructor(private shoppingListService: ShoppingListService) {}

  ngOnInit() {
    this.subscription = this.shoppingListService.startedEditing.subscribe(
      (i: number) => {
        this.editMode = true;
        this.editedIndex=i;
        this.editedIngredient=this.shoppingListService.getIngredient(i);
        this.editForm.setValue({
          name: this.editedIngredient.name,
          amount: this.editedIngredient.amount
        });
      }
    );
  }

  onSubmit(form: NgForm) {
    if (this.editMode) {
      this.shoppingListService.editIngredient(this.editedIndex, 
        new Ingredient(form.value.name, form.value.amount)
      );
    } else {
      this.shoppingListService.addIngredient(
        new Ingredient(form.value.name, form.value.amount)
      );
    }
    form.reset();
    this.editMode=false;
  }

  onClear(){
    this.editForm.reset();
    this.editMode=false;
  }

  onDelete(){
    this.shoppingListService.deleteIngredient(this.editedIndex);
    this.editForm.reset();
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
