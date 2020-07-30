import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../common/shared.module';
import { ExpenseFilterComponent } from '../stocks/layouts/register/expense/expense-filter/expense-filter.component';
import { ExpenseDetailComponent } from '../stocks/layouts/register/expense/expense-detail/expense-detail.component';
import { ExpenseNewComponent } from '../stocks/layouts/register/expense/expense-new/expense-new.component';
import { ExpenseCategoryNewComponent } from '../stocks/layouts/register/expense/expense-category-new/expense-category-new.component';
import { ExpenseCategoryFilterComponent } from '../stocks/layouts/register/expense/expense-category-filter/expense-category-filter.component';
import { ExpenseCategoryDetailComponent } from '../stocks/layouts/register/expense/expense-category-detail/expense-category-detail.component';
import { ExpenseDashboardComponent } from './layouts/expense-dashboard-view/expense-dashboard.component';
import { PieChartComponent } from './component/pie-chart/pie-chart.component';
import { ExpenseRowComponent } from './component/expense-row/expense-row.component';
import { ExpenseGroupComponent } from './component/expense-group/expense-group.component';
import { ExpenseTableTitleComponent } from './component/expense-table-title/expense-table-title.component';
import { ExpenseErrorScreenComponent } from './component/expense-error-screen/expense-error-screen.component';
import { RouterModule } from '@angular/router';
import { HomeViewComponent } from './layouts/home-view/home-view.component';
import { AddMenuComponent } from './component/add-menu/add-menu.component';
import { ExpenseBottomSheetComponent } from './component/expense-bottom-sheet/expense-bottom-sheet.component';
import { NewExpenseViewComponent } from './layouts/new-expense-view/new-expense-view.component';
import { ExpenseNoResultsFoundComponent } from './component/expense-no-results-found/expense-no-results-found.component';
import { NewReceiptViewComponent } from './layouts/new-receipt-view/new-receipt-view.component';
import { EntryTableComponent } from './component/entry-table/entry-table.component';
import { EntryListViewComponent } from './layouts/entry-list-view/entry-list-view.component';
import { EntryClassListViewComponent } from './layouts/entry-class-list-view/entry-class-list-view.component';
import { EntryClassEditViewComponent } from './layouts/entry-class-edit-view/entry-class-edit-view.component';
import { AdmViewComponent } from './layouts/adm-view/adm-view.component';
import { AppRoutingModule } from '../app-routing.module';

@NgModule({
  declarations: [
    ExpenseFilterComponent,
    ExpenseDetailComponent,
    ExpenseNewComponent,
    ExpenseCategoryNewComponent,
    ExpenseCategoryFilterComponent,
    ExpenseCategoryDetailComponent,
    ExpenseDashboardComponent,
    PieChartComponent,
    ExpenseRowComponent,
    ExpenseGroupComponent,
    ExpenseTableTitleComponent,
    ExpenseErrorScreenComponent,
    HomeViewComponent,
    AddMenuComponent,
    ExpenseBottomSheetComponent,
    NewExpenseViewComponent,
    ExpenseNoResultsFoundComponent,
    NewReceiptViewComponent,
    EntryTableComponent,
    EntryListViewComponent,
    EntryClassListViewComponent,
    EntryClassEditViewComponent,
    AdmViewComponent
  ],
  imports: [
    SharedModule
  ]
})
export class FinancialModule { }
