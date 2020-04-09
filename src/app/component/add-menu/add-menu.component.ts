import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-add-menu',
  templateUrl: './add-menu.component.html',
  styleUrls: ['./add-menu.component.css']
})
export class AddMenuComponent implements OnInit {

  constructor() { }

  @Input()

  public isAddMenuActive: boolean;
  public isAddMenuActiveChange = new EventEmitter<boolean>();


  @Output()
  public menuDismissed = new EventEmitter();

  public onLostMenuFocus(event: any): void {
    console.log('lost focus emitted');
    this.isAddMenuActive = false;
    this.isAddMenuActiveChange.emit(false);
  }

  public onAddButtonClicked(event: any): void {
    if (!this.isAddMenuActive) {
      console.log('isMenuActiveNow');
      this.isAddMenuActive = true;
      this.menuDismissed.emit(true);
      this.isAddMenuActiveChange.emit(true);
      console.log(this.isAddMenuActive);
    }
    else {

      this.isAddMenuActive = false;
      this.menuDismissed.emit(false);
      this.isAddMenuActiveChange.emit(false);
      console.log('isMenuDisabledNow. isAddMenuActive =');
      console.log(this.isAddMenuActive);
    }


  }

  ngOnInit() {
  }

}
