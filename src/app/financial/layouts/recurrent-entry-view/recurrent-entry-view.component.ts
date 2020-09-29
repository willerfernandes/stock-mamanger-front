import { Component, OnInit, Input } from '@angular/core';
import { RecurrentEntry } from '../../entities/recurrent-entry';
import { StorageService } from 'src/app/common/services/storage.service';
import { RecurrentEntryGroup } from '../../entities/recurrent-entry-group';

@Component({
  selector: 'app-recurrent-entry-view',
  templateUrl: './recurrent-entry-view.component.html',
  styleUrls: ['./recurrent-entry-view.component.css']
})
export class RecurrentEntryViewComponent implements OnInit {

  constructor() { }

  @Input()
  public entryGroups: RecurrentEntryGroup[];


  ngOnInit() {
  }

}
