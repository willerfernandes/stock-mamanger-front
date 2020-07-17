import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { DatePipe } from '@angular/common';
import { UserBalance } from './../../entities/user-balance';
import { Stock } from 'src/app/entities/stock';
import { StockService } from '../services/stock.service';

@Component({
  selector: 'app-main-view',
  templateUrl: './main-view.component.html',
  styleUrls: ['./main-view.component.css'],
  providers: [DatePipe]
})
export class MainViewComponent implements OnInit {

  userBalances: UserBalance[] = [];
  isError;
  isEmpty;
  isSuccess;

  constructor(private stockService: StockService, private userService: UserService, private datePipe: DatePipe) { }

  ngOnInit() {
    const auth = JSON.parse(sessionStorage.getItem('currentUser'));
    this.getUserBalance(auth.id);
  }


  get_stock_info(stock: Stock) {
    this.stockService.stockPrices(stock).subscribe(res => {

      // considera somente a data atual (De 23:59 até 10:00 não retornará valores)
      const stockInfoResponse = res['Time Series (Daily)'][this.datePipe.transform(new Date(), 'yyyy-MM-dd')];
      if (stockInfoResponse) {
        stock.valor = stockInfoResponse['4. close'];
        this.updateStock(stock);
      }

    });
  }

  updateStock(stock: Stock) {
    this.stockService.update(stock);
  }


  getUserBalance(id: number) {
    this.userService.getBalance(id).subscribe((res) => {

      this.userBalances = [];
      if (res != null) {
        this.userBalances = res;
      } else {
        this.userBalances = [];
      }
      this.handleResponse(res);
    });
  }


  handleResponse(res) {
    this.isSuccess = res.length > 0;
    this.isEmpty = res.length === 0;
  }

}
