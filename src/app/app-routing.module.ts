import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ConfigComponent} from './register/configuration/config/config.component';
import {ConfigDetailComponent} from './register/configuration/config-detail/config-detail.component';
import {ConfigNewComponent} from './register/configuration/config-new/config-new.component';
import {UserFilterComponent} from './register/user/user-filter/user-filter.component';
import {UserDetailComponent} from './register/user/user-detail/user-detail.component';
import {UserNewComponent} from './register/user/user-new/user-new.component';
import {OperationFilterComponent} from './register/operation/operation-filter/operation-filter.component';
import {OperationDetailComponent} from './register/operation/operation-detail/operation-detail.component';
import {OperationNewComponent} from './register/operation/operation-new/operation-new.component';
import {StockFilterComponent} from './register/stock/stock-filter/stock-filter.component';
import {StockDetailComponent} from './register/stock/stock-detail/stock-detail.component';
import {StockNewComponent} from './register/stock/stock-new/stock-new.component';
import {AppComponent} from './app.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: AppComponent },
  { path: 'config', component: ConfigComponent },
  { path: 'config/new', component: ConfigNewComponent },
  { path: 'config/:id', component: ConfigDetailComponent },
  { path: 'user', component: UserFilterComponent },
  { path: 'user/new', component: UserNewComponent },
  { path: 'user/:id', component: UserDetailComponent },
  { path: 'stock', component: StockFilterComponent },
  { path: 'stock/new', component: StockNewComponent },
  { path: 'stock/:id', component: StockDetailComponent },
  { path: 'operation', component: OperationFilterComponent },
  { path: 'operation/new', component: OperationNewComponent },
  { path: 'operation/:id', component: OperationDetailComponent }
  
];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
