import { Component } from '@angular/core';
import {MatBottomSheetRef} from '@angular/material/bottom-sheet';
import {CurrencyPipe} from '@angular/common';

@Component({
  selector: 'app-new-expense-view',
  templateUrl: './new-expense-view.component.html',
  styleUrls: ['./new-expense-view.component.css']
})
export class NewExpenseViewComponent {

  public date: Date;
  formattedAmount;
  amount;
  constructor(
    private bottomSheetRef: MatBottomSheetRef<NewExpenseViewComponent>,
    private currencyPipe: CurrencyPipe) {}

    saveExpense(event: MouseEvent): void {
    this.bottomSheetRef.dismiss();
    event.preventDefault();
    // TODO: save expense
  }

  transformAmount(element) {
    this.formattedAmount = this.currencyPipe.transform(this.formattedAmount, 'BRL');

    element.target.value = this.formattedAmount;
  }
}
