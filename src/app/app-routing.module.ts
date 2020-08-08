import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainViewComponent } from './stocks/layouts/main-view/main-view.component';
import { HomeViewComponent } from './financial/layouts/home-view/home-view.component';
import { AuthGuard } from './common/handlers/auth.guard';
import { ExpenseDashboardComponent } from './financial/layouts/expense-dashboard-view/expense-dashboard.component';
import { LoginViewComponent } from './common/account/login-view/login-view.component';
import { SignupViewComponent } from './common/account/signup-view/signup-view.component';
import { ConfigComponent } from './stocks/layouts/register/configuration/config/config.component';
import { ConfigNewComponent } from './stocks/layouts/register/configuration/config-new/config-new.component';
import { ConfigDetailComponent } from './stocks/layouts/register/configuration/config-detail/config-detail.component';
import { UserFilterComponent } from './stocks/layouts/register/user/user-filter/user-filter.component';
import { UserNewComponent } from './stocks/layouts/register/user/user-new/user-new.component';
import { UserDetailComponent } from './stocks/layouts/register/user/user-detail/user-detail.component';
import { StockFilterComponent } from './stocks/layouts/register/stock/stock-filter/stock-filter.component';
import { StockNewComponent } from './stocks/layouts/register/stock/stock-new/stock-new.component';
import { StockDetailComponent } from './stocks/layouts/register/stock/stock-detail/stock-detail.component';
import { OperationFilterComponent } from './stocks/layouts/register/operation/operation-filter/operation-filter.component';
import { OperationNewComponent } from './stocks/layouts/register/operation/operation-new/operation-new.component';
import { OperationDetailComponent } from './stocks/layouts/register/operation/operation-detail/operation-detail.component';
// tslint:disable-next-line:max-line-length
import { ExpenseCategoryFilterComponent } from './stocks/layouts/register/expense/expense-category-filter/expense-category-filter.component';
import { ExpenseCategoryNewComponent } from './stocks/layouts/register/expense/expense-category-new/expense-category-new.component';
// tslint:disable-next-line:max-line-length
import { ExpenseCategoryDetailComponent } from './stocks/layouts/register/expense/expense-category-detail/expense-category-detail.component';
import { UnderConstructionComponent } from './financial/layouts/under-construction-view/under-construction.component';
import { EntryListViewComponent } from './financial/layouts/entry-list-view/entry-list-view.component';
import { EntryClassListViewComponent } from './financial/layouts/entry-class-list-view/entry-class-list-view.component';
import { EntryClassEditViewComponent } from './financial/layouts/entry-class-edit-view/entry-class-edit-view.component';
import { AdmViewComponent } from './financial/layouts/adm-view/adm-view.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'login', component: LoginViewComponent },
  { path: 'signup', component: SignupViewComponent },
  { path: 'home', component: HomeViewComponent, canActivate: [AuthGuard] },
  { path: 'expense-dashboard', component: ExpenseDashboardComponent , canActivate: [AuthGuard]},
  { path: 'entries', component: EntryListViewComponent },
  { path: 'classes', component: EntryClassListViewComponent },
  { path: 'classes/:id', component: EntryClassEditViewComponent },
  { path: 'adm', component: AdmViewComponent },
  { path: 'config', component: ConfigComponent },
  { path: 'config/new', component: ConfigNewComponent },
  { path: 'config/:id', component: ConfigDetailComponent },
  { path: 'user', component: UserFilterComponent },
  { path: 'user/new', component: UserNewComponent },
  { path: 'user/:id', component: UserDetailComponent },
  { path: 'stock-dashboard', component: MainViewComponent },
  { path: 'stock', component: StockFilterComponent },
  { path: 'stock/new', component: StockNewComponent },
  { path: 'stock/:id', component: StockDetailComponent },
  { path: 'operation', component: OperationFilterComponent },
  { path: 'operation/new', component: OperationNewComponent },
  { path: 'operation/:id', component: OperationDetailComponent },
  { path: 'category', component: ExpenseCategoryFilterComponent },
  { path: 'category/new', component: ExpenseCategoryNewComponent },
  { path: 'category/:id', component: ExpenseCategoryDetailComponent },
  { path: 'under-construction', component: UnderConstructionComponent }
];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
