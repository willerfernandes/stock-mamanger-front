import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import {StockService} from './../../../services/stock.service';
import {Stock} from './../../../entities/stock';

@Component({
  selector: 'app-stock-detail',
  templateUrl: './stock-detail.component.html',
  styleUrls: ['./stock-detail.component.css']
})
export class StockDetailComponent implements OnInit {

   @Input() stock: Stock;

	constructor(private StockService: StockService, private route: ActivatedRoute, private location: Location) {}

	ngOnInit() {
			this.getStock();
		}

	goBack(): void {
    this.location.back();
  	}

	getStock(){
		const id = +this.route.snapshot.paramMap.get('id');
		this.StockService.get(id).subscribe((res) =>{
    		this.stock = res;
    });
	}

	

  	save(empresaPapel: string, codEmpresaBovespa: string){
     this.StockService.update(this.fill(this.stock.id, this.stock.codPapel, empresaPapel, codEmpresaBovespa)).subscribe((res) =>{
        this.goBack()
    });
    }


	fill(id: number, cod_papel: string, empresaPapel: string, codEmpresaBovespa: string): Stock {
		var stock: Stock = {codPapel: "", empresaPapel: "", codEmpresaBovespa: ""}
		stock.id = id;
		stock.codPapel = cod_papel;
		stock.empresaPapel = empresaPapel;
		stock.codEmpresaBovespa = codEmpresaBovespa;
		return stock;
	}

}
