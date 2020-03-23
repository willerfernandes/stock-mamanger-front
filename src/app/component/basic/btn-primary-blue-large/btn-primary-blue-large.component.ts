import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'btn-primary-blue-large',
  templateUrl: './btn-primary-blue-large.component.html',
  styleUrls: ['./btn-primary-blue-large.component.css']
})
export class BtnPrimaryBlueLargeComponent implements OnInit {


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
