import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { StockService } from './../../../stocks/services/stock.service';

import { Stock } from './../../../entities/stock';

@Component({
  selector: 'app-stock-new',
  templateUrl: './stock-new.component.html',
  styleUrls: ['./stock-new.component.css']
})
export class StockNewComponent implements OnInit {

  @Input() stock: Stock;

  constructor(private stockService: StockService, private route: ActivatedRoute, private location: Location) { }

  goBack(): void {
    this.location.back();
  }

  save(codPapel: string, empresaPapel: string, codEmpresaBovespa: string) {
    this.stockService.save(this.fillConfiguration(0, codPapel, empresaPapel, codEmpresaBovespa)).subscribe((res) => {
      this.goBack();
    });
  }

  fillConfiguration(id: number, codPapel: string, empresaPapel: string, codEmpresaBovespa: string): Stock {
    let stock: Stock;
    stock.codPapel = codPapel;
    stock.empresaPapel = empresaPapel;
    stock.codEmpresaBovespa = codEmpresaBovespa;
    return stock;
  }

  ngOnInit() {
  }

}
