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
			this.getUser();
		}

	goBack(): void {
    this.location.back();
  	}

	getUser(){
		const id = +this.route.snapshot.paramMap.get('id');
		this.StockService.get(id).subscribe((res) =>{
    		this.stock = res;
    });
	}

	

  	save(empresaPapel: string){
     this.StockService.update(this.fillConfiguration(this.stock.id, this.stock.codPapel, empresaPapel)).subscribe((res) =>{
        this.goBack()
    });
    }


	fillConfiguration(id: number, cod_papel: string, empresaPapel: string): Stock {
		var stock: Stock = {codPapel: "", empresaPapel: ""}
		stock.id = id;
		stock.codPapel = cod_papel;
		stock.empresaPapel = empresaPapel;
		return stock;
	}

}
