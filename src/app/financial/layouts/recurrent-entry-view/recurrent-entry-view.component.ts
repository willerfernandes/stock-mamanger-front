import { Component, OnInit, Input } from '@angular/core';
import { RecurrentEntry } from '../../entities/recurrent-entry';
import { StorageService } from 'src/app/common/services/storage.service';

@Component({
  selector: 'app-recurrent-entry-view',
  templateUrl: './recurrent-entry-view.component.html',
  styleUrls: ['./recurrent-entry-view.component.css']
})
export class RecurrentEntryViewComponent implements OnInit {

  constructor(private storageService: StorageService) { }

  public entries: RecurrentEntry[];


  ngOnInit() {
    this.entries = this.storageService.findAllRecurrentEntries();
  }

}
