import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { StockService } from './../../../services/stock.service';
import { Stock } from './../../../entities/stock';

@Component({
  selector: 'app-stock-detail',
  templateUrl: './stock-detail.component.html',
  styleUrls: ['./stock-detail.component.css']
})
export class StockDetailComponent implements OnInit {

  @Input() stock: Stock;

  constructor(private stockService: StockService, private route: ActivatedRoute, private location: Location) { }

  ngOnInit() {
    this.getStock();
  }

  goBack(): void {
    this.location.back();
  }

  getStock() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.stockService.get(id).subscribe((res) => {
      this.stock = res;
    });
  }



  save(empresaPapel: string, codEmpresaBovespa: string) {
    this.stockService.update(this.fill(this.stock.id, this.stock.codPapel, empresaPapel, codEmpresaBovespa)).subscribe((res) => {
      this.goBack()
    });
  }


  fill(id: number, codPapel: string, empresaPapel: string, codEmpresaBovespa: string): Stock {
    var stock: Stock = {id: 0, operations: null, stockInfo: null, valor: null, valorMaximo: null, valorMinimo: null, codPapel: "", empresaPapel: "", codEmpresaBovespa: "" }
    stock.id = id;
    stock.codPapel = codPapel;
    stock.empresaPapel = empresaPapel;
    stock.codEmpresaBovespa = codEmpresaBovespa;
    return stock;
  }

}
