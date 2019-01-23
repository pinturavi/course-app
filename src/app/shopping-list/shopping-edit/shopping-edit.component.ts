import { Component, OnInit, ViewChild, Output,EventEmitter, ElementRef } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from 'src/app/services/shopping-list.service';


@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {

  @ViewChild('nameInput') nameElementRef:ElementRef;
  @ViewChild('amountInput') amountElementRef:ElementRef;

  constructor(private shoppingListService:ShoppingListService) { }

  ngOnInit() {
  }

  addElement(){
    this.shoppingListService.addIngredient(new Ingredient(this.nameElementRef.nativeElement.value, parseInt(this.amountElementRef.nativeElement.value)));
  }
}
