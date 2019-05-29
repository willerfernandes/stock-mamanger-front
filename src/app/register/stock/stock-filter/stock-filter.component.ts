import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {StockService} from './../../../services/stock.service';
import {Stock} from './../../../entities/stock';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-stock-filter',
  templateUrl: './stock-filter.component.html',
  styleUrls: ['./stock-filter.component.css'],
  providers: [DatePipe]
})
export class StockFilterComponent implements OnInit {

   nome: string;

  title = 'stock-manager-front';
  stocks = [];
  stock: Stock = {cod_papel: "", empresa_papel: ""};
  isError;
  isEmpty;
  isSuccess;
  

  constructor(private StockService: StockService, private datePipe: DatePipe){}

  get_all_stocks(){
  	
  	this.stocks = [];
    this.StockService.getAll().subscribe((res) =>{
        this.stocks = res;
        
        //PARA ATIVAR A FUNCIONALIDADE DE ATUALIZAR OS PRECOS AUTOMATICAMENTE, BASTA DESCOMENTAR O TRECHO, MAS O API
        //GRATIS SUPORTA SOMENTE 5 CHAMADAS POR MINUTO OU 500 POR DIA. PARA TESTES, UTILIZAREI ATUALIZACAO MANUAL VIA BOTAO.
        //for (var i=0; i<this.stocks.length; i++) {
        //  this.stocks[i].stockInfo = this.get_stock_info(this.stocks[i].codPapel)
        //}

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

  get_stock_info(codEmpresaBovespa: string){
      this.StockService.stockPrices(codEmpresaBovespa).subscribe(res => {

        //TODO: Salvar o papel depois de setar o valor
        //this.StockService.save(stocks[stockIndex]).subscribe();

        var stockInfoResponse = res['Time Series (Daily)'][this.datePipe.transform(new Date(), 'yyyy-MM-dd')];

        //PRA TESTE
        //var stockInfoResponse = res['Time Series (Daily)']["2019-05-22"];
        if(stockInfoResponse)
        {
            var stockInfo = [];
            var stockIndex;
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
                stockIndex = i;
                break;
              }
            }

        }
       
      });


  }

}
