import { Component } from '@angular/core';
import {MatBottomSheet} from '@angular/material/bottom-sheet';
import { NewExpenseViewComponent } from 'src/app/layouts/new-expense-view/new-expense-view.component';
@Component({
  selector: 'app-expense-bottom-sheet',
  templateUrl: './expense-bottom-sheet.component.html',
  styleUrls: ['./expense-bottom-sheet.component.css']
})
export class ExpenseBottomSheetComponent {

  constructor(private bottomSheet: MatBottomSheet) {}

  openBottomSheet(): void {
    this.bottomSheet.open(NewExpenseViewComponent);
  }

}
