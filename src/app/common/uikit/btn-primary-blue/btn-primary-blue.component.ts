import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'btn-primary-blue',
  templateUrl: './btn-primary-blue.component.html',
  styleUrls: ['./btn-primary-blue.component.css']
})
export class BtnPrimaryBlueComponent implements OnInit {
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
