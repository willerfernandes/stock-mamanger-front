import { NgModule } from '@angular/core';
import { ConfigDetailComponent } from './layouts/register/configuration/config-detail/config-detail.component';
import { ConfigNewComponent } from './layouts/register/configuration/config-new/config-new.component';
import { OperationFilterComponent } from './layouts/register/operation/operation-filter/operation-filter.component';
import { OperationDetailComponent } from './layouts/register/operation/operation-detail/operation-detail.component';
import { OperationNewComponent } from './layouts/register/operation/operation-new/operation-new.component';
import { StockFilterComponent } from './layouts/register/stock/stock-filter/stock-filter.component';
import { StockDetailComponent } from './layouts/register/stock/stock-detail/stock-detail.component';
import { StockNewComponent } from './layouts/register/stock/stock-new/stock-new.component';
import { UserFilterComponent } from './layouts/register/user/user-filter/user-filter.component';
import { UserDetailComponent } from './layouts/register/user/user-detail/user-detail.component';
import { UserNewComponent } from './layouts/register/user/user-new/user-new.component';
import { ConfigComponent } from './layouts/register/configuration/config/config.component';
import { SharedModule } from '../common/shared.module';



@NgModule({
  declarations: [
    ConfigComponent,
    ConfigDetailComponent,
    ConfigNewComponent,
    OperationFilterComponent,
    OperationDetailComponent,
    OperationNewComponent,
    StockFilterComponent,
    StockDetailComponent,
    StockNewComponent,
    UserFilterComponent,
    UserDetailComponent,
    UserNewComponent,
  ],
  imports: [
    SharedModule
  ]
})
export class StocksModule { }
