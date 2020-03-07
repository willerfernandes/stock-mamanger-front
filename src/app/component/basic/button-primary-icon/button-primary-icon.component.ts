import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
@Component({
  selector: 'app-button-primary-icon',
  templateUrl: './button-primary-icon.component.html',
  styleUrls: ['./button-primary-icon.component.css']
})
export class ButtonPrimaryIconComponent implements OnInit {

  constructor() { }

  @Input()
  isLoading = false;

  @Input()
  isloadingButtonType = false;

  @Input()
  public imageUrl: string;

  @Output()
  public clickedEvent = new EventEmitter();

  onClick() {
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
