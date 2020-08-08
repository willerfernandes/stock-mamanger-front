import { Title } from '@angular/platform-browser';
import { NgModule} from '@angular/core';

import { AppComponent } from './app.component';

import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { CurrencyPipe} from '@angular/common';
import { MatDatepickerModule } from '@angular/material';
import { NewExpenseViewComponent } from './financial/layouts/new-expense-view/new-expense-view.component';
import { NewReceiptViewComponent } from './financial/layouts/new-receipt-view/new-receipt-view.component';
import { JwtInterceptor } from './common/handlers/jwt.interceptor';
import { ErrorInterceptor } from './common/handlers/error.interceptor';
import { StocksModule } from './stocks/stocks.module';
import { FinancialModule } from './financial/financial.module';
import { SharedModule } from './common/shared.module';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    StocksModule,
    FinancialModule,
    SharedModule
  ],
  providers: [
    Title,
    MatDatepickerModule,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    CurrencyPipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
