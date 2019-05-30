import { Component, OnInit } from '@angular/core';
import {StockService} from './../../services/stock.service';
import {UserService} from './../../services/user.service';
import { DatePipe } from '@angular/common';
import {UserBalance} from './../../entities/user-balance'

@Component({
  selector: 'app-main-view',
  templateUrl: './main-view.component.html',
  styleUrls: ['./main-view.component.css'],
  providers: [DatePipe]
})
export class MainViewComponent implements OnInit {

  userBalances = []; 
  isError;
  isEmpty;
  isSuccess;

  constructor(private StockService: StockService, private UserService: UserService, private datePipe: DatePipe) { }

  ngOnInit() {
  	this.getUserBalance(8);
  }


  get_stock_info(stock: Stock){
	  this.StockService.stockPrices(stock).subscribe(res => {
	        var stockInfoResponse = res['Time Series (Daily)'][this.datePipe.transform(new Date(), 'yyyy-MM-dd')];
	        if(stockInfoResponse)
	        {
	        	stock.valor = stockInfoResponse['4. close'];
	        	this.updateStock(stock);
	        }
	        
	  });
  }

  loadStockOperations(stock: Stock){
  	this.StockService.getStockOperations(stock).subscribe(res => {
  		stock.operations = res;
  	});

  }

  updateStock(stock: Stock) {
  	this.StockService.update(stock).subscribe();
  }


  getUserBalance(id: number) {
	this.UserService.getBalance(id).subscribe((res) =>{
			
	    	this.userBalances = [];
	    	if(res != null && res.length > 0) {
	    		this.userBalances = res;
	    	}
	    	else{
	    		this.userBalances = [];
	    	}
	    	this.handleResponse(res);
	    	});
  }


  handleResponse(res){
  	this.isSuccess = res.length > 0;
  	this.isEmpty = res.length === 0;
  }

}
