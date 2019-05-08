import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {StockService} from './../../../services/stock.service';
import {Stock} from './../../../entities/stock';

@Component({
  selector: 'app-stock-filter',
  templateUrl: './stock-filter.component.html',
  styleUrls: ['./stock-filter.component.css']
})
export class StockFilterComponent implements OnInit {

   nome: string;

  title = 'stock-manager-front';
  stocks = [];
  stock: Stock = {cod_papel: "", empresa_papel: ""};
  isError;
  isEmpty;
  isSuccess;

  constructor(private StockService: StockService){}

  get_all_stocks(){
  	
  	this.stocks = [];
    this.StockService.getAll().subscribe((res) =>{
        this.stocks = res;
        this.handleResponse(res);
    });  
  }

  find_by_chave(key: string){
  	this.StockService.search(key).subscribe((res) =>{
    	this.stocks = [];
    	if(res != null && res.length > 0) {
    		this.stocks = res;
    	}
    	else{
    		this.stocks = [];
    	}
    	this.handleResponse(res);
    	});
  }


  delete_stock(id: number){
    this.StockService.delete(id).subscribe((res) =>{
    this.get_all_stocks();
    });
  }

  constructor() { }

  ngOnInit() {
  	this.get_all_stocks();
  }

  handleResponse(){
  	this.isSuccess = this.stocks.length > 0;
  	this.isEmpty = this.stocks.length === 0;
  }

}
