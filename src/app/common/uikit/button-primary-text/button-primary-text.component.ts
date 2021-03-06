import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges, OnChanges } from '@angular/core';

@Component({
  selector: 'app-button-primary-text',
  templateUrl: './button-primary-text.component.html',
  styleUrls: ['./button-primary-text.component.css']
})
export class ButtonPrimaryTextComponent implements OnInit {

  constructor() { }

  loading: boolean;

  @Input()
  isLoading = false;

  @Input()
  isloadingButtonType = false;

  @Input()
  public text: string;

  @Output()
  public clickedEvent = new EventEmitter();

  click() {
    if (this.isloadingButtonType && !this.isLoading) {
      this.isLoading = true;
      this.clickedEvent.emit();
    } else if (!this.isLoading) {
      this.clickedEvent.emit();
    }
  }

  ngOnInit() {
  }

}
