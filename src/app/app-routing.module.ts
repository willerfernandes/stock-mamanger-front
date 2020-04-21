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
import {MainViewComponent} from './layouts/main-view/main-view.component';
import {ExpenseDashboardComponent} from './layouts/expense-dashboard/expense-dashboard.component';
import {AppComponent} from './app.component';
import {LoginViewComponent} from './account/login-view/login-view.component';
import {SignupViewComponent} from './account/signup-view/signup-view.component';
import {ExpenseCategoryFilterComponent} from './register/expense/expense-category-filter/expense-category-filter.component';
import {ExpenseCategoryNewComponent} from './register/expense/expense-category-new/expense-category-new.component';
import {ExpenseCategoryDetailComponent} from './register/expense/expense-category-detail/expense-category-detail.component';
import {AuthGuard} from './account/auth.guard';
import { HomeViewComponent } from './layouts/home-view/home-view.component';
import { UnderConstructionComponent } from './layouts/under-construction/under-construction.component';
import { EntryListViewComponent } from './component/entry-list-view/entry-list-view.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'stock-dashboard', component: MainViewComponent },
  { path: 'home', component: HomeViewComponent, canActivate: [AuthGuard] },
  { path: 'expense-dashboard', component: ExpenseDashboardComponent , canActivate: [AuthGuard]},
  { path: 'login', component: LoginViewComponent },
  { path: 'signup', component: SignupViewComponent },
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
  { path: 'operation/:id', component: OperationDetailComponent },
  { path: 'category', component: ExpenseCategoryFilterComponent },
  { path: 'category/new', component: ExpenseCategoryNewComponent },
  { path: 'category/:id', component: ExpenseCategoryDetailComponent },
  { path: 'under-construction', component: UnderConstructionComponent },
  { path: 'entries', component: EntryListViewComponent }
];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
