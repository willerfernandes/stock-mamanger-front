import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-add-menu',
  templateUrl: './add-menu.component.html',
  styleUrls: ['./add-menu.component.css']
})
export class AddMenuComponent implements OnInit {

  constructor() { }

  @Input()

  public isAddMenuActive = false;
  public isAddMenuActiveChange = new EventEmitter<boolean>();


  @Output()
  public isAddMenuDismissedTrue = new EventEmitter();

  @Output()
  public isAddMenuDismissedFalse = new EventEmitter();

  @Output()
  public expenseClicked = new EventEmitter();

  @Output()
  public receiptClicked = new EventEmitter();

  public onLostMenuFocus(event: any): void {
    console.log('lost focus emitted');
    this.isAddMenuActive = false;
    this.isAddMenuActiveChange.emit(false);
  }

  public onAddButtonClicked(): void {
    if (this.isAddMenuActive === false) {
      this.activateMenu();
    } else {
      this.deactivateMenu();
    }
  }

  private deactivateMenu() {
    this.isAddMenuActive = false;
    this.isAddMenuDismissedFalse.emit(false);
    this.isAddMenuActiveChange.emit(false);
    console.log('isMenuDisabledNow. isAddMenuActive =');
    console.log(this.isAddMenuActive);
  }

  private activateMenu() {
    console.log('isMenuActiveNow');
    this.isAddMenuActive = true;
    this.isAddMenuDismissedTrue.emit(true);
    this.isAddMenuActiveChange.emit(true);
    console.log(this.isAddMenuActive);
  }

  public onExpenseClicked() {
    this.expenseClicked.emit();
    this.deactivateMenu();
  }

  public onReceiptClicked() {
    this.receiptClicked.emit();
    this.deactivateMenu();

  }


  ngOnInit() {
  }

}
