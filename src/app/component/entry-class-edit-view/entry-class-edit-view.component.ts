import { Component, OnInit } from '@angular/core';
import { CategoriaLancamento } from 'src/app/entities/categoria-lancamento';
import { FakeService } from 'src/app/services/fake.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-entry-class-edit-view',
  templateUrl: './entry-class-edit-view.component.html',
  styleUrls: ['./entry-class-edit-view.component.css']
})
export class EntryClassEditViewComponent implements OnInit {

  public entryClass: CategoriaLancamento;

  constructor(private fakeService: FakeService, private route: ActivatedRoute, private location: Location) { }

  goBack(): void {
    this.location.back();
  }

  public deleteEntryClass(): void {
    this.fakeService.deleteEntryClass(this.entryClass.id).subscribe();
  }

  public save(name: string, description: string, type: string) {

    this.entryClass.nome = name;
    this.entryClass.descricao = description;
    this.entryClass.tipo = type;

    this.fakeService.saveEntryClass(this.entryClass);
  }

  ngOnInit() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.fakeService.loadEntryGroup(id).subscribe((res: CategoriaLancamento) => {
      this.entryClass = res;
    });
  }

}
