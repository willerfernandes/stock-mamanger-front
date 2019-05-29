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

  stocks = [];
  stock: Stock = {cod_papel: "", empresa_papel: ""};
  userBalances = []; 
  isError;
  isEmpty;
  isSuccess;

  constructor(private StockService: StockService, private UserService: UserService, private datePipe: DatePipe) { }

  ngOnInit() {
  	this.getUserBalance(8);
  }


   get_stock_info(codEmpresaBovespa: string){
      this.StockService.stockPrices(codEmpresaBovespa).subscribe(res => {

        var stockInfoResponse = res['Time Series (Daily)'][this.datePipe.transform(new Date(), 'yyyy-MM-dd')];

        //PRA TESTE
        //var stockInfoResponse = res['Time Series (Daily)']["2019-05-22"];
        if(stockInfoResponse)
        {
            var stockInfo = [];
            stockInfo.open = stockInfoResponse['1. open'];
            stockInfo.high = stockInfoResponse['2. high'];
            stockInfo.low = stockInfoResponse['3. low'];
            stockInfo.close = stockInfoResponse['4. close'];
            stockInfo.adjustedClose = stockInfoResponse['5. adjusted close'];
            stockInfo.volume = stockInfoResponse['6. volume'];
            stockInfo.dividendAmount = stockInfoResponse['7. dividend amount'];
            stockInfo.splitCoefficient = stockInfoResponse['8. split coefficient. open'];

            for (var i=0; i<this.stocks.length; i++) {
              if(this.stocks[i].codEmpresaBovespa == codEmpresaBovespa) {
                this.stocks[i].stockInfo = stockInfo;
              }
            }
        }
       

      });
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


  handleResponse(){
  	this.isSuccess = this.stocks.length > 0;
  	this.isEmpty = this.stocks.length === 0;
  }

}
