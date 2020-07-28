import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule} from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { LayoutModule } from '@angular/cdk/layout';

import { CommonModule, CurrencyPipe} from '@angular/common';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatCheckboxModule, MatBottomSheetModule} from '@angular/material';
import {MatButtonModule} from '@angular/material';
import {MatInputModule} from '@angular/material/input';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';
import {MatSliderModule} from '@angular/material/slider';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatMenuModule} from '@angular/material/menu';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatListModule} from '@angular/material/list';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatCardModule} from '@angular/material/card';
import {MatStepperModule} from '@angular/material/stepper';
import {MatTabsModule} from '@angular/material/tabs';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatChipsModule} from '@angular/material/chips';
import {MatIconModule} from '@angular/material/icon';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatDialogModule} from '@angular/material/dialog';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatTableModule} from '@angular/material/table';
import {MatSortModule} from '@angular/material/sort';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatNativeDateModule} from '@angular/material/core';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { ChartsModule } from 'ng2-charts-x';
import { MatDatepickerModule } from '@angular/material';
import { NativeDateModule } from '@angular/material';





import { MainViewComponent } from './stocks/layouts/main-view/main-view.component';
import { LoginViewComponent } from './common/account/login-view/login-view.component';
import { SignupViewComponent } from './common/account/signup-view/signup-view.component';
import { ExpenseFilterComponent } from './stocks/layouts/register/expense/expense-filter/expense-filter.component';
import { ExpenseDetailComponent } from './stocks/layouts/register/expense/expense-detail/expense-detail.component';
import { ExpenseNewComponent } from './stocks/layouts/register/expense/expense-new/expense-new.component';
import { ExpenseCategoryNewComponent } from './stocks/layouts/register/expense/expense-category-new/expense-category-new.component';
import { ExpenseCategoryFilterComponent } from './stocks/layouts/register/expense/expense-category-filter/expense-category-filter.component';
import { ExpenseCategoryDetailComponent } from './stocks/layouts/register/expense/expense-category-detail/expense-category-detail.component';
import { ExpenseDashboardComponent } from './financial/layouts/expense-dashboard-view/expense-dashboard.component';
import { PieChartComponent } from './financial/component/pie-chart/pie-chart.component';
import { DateRangeComponent } from './common/uikit/date-range/date-range.component';
import { ExpenseRowComponent } from './financial/component/expense-row/expense-row.component';
import { ExpenseGroupComponent } from './financial/component/expense-group/expense-group.component';
import { ExpenseTableTitleComponent } from './financial/component/expense-table-title/expense-table-title.component';
import { ExpenseErrorScreenComponent } from './financial/component/expense-error-screen/expense-error-screen.component';
import { MainNavBarComponent } from './common/main-nav-bar/main-nav-bar.component';
import { ButtonPrimaryTextComponent } from './common/uikit/button-primary-text/button-primary-text.component';
import { ButtonPrimaryIconComponent } from './common/uikit/button-primary-icon/button-primary-icon.component';
import { HomeViewComponent } from './financial/layouts/home-view/home-view.component';
import { CardComponent } from './common/uikit/card/card.component';
import { BtnPrimaryBlueComponent } from './common/uikit/btn-primary-blue/btn-primary-blue.component';
import { BtnSecondaryBlueComponent } from './common/uikit/btn-secondary-blue/btn-secondary-blue.component';
import { BtnSecondaryBlueLargeComponent } from './common/uikit/btn-secondary-blue-large/btn-secondary-blue-large.component';
import { BtnPrimaryBlueLargeComponent } from './common/uikit/btn-primary-blue-large/btn-primary-blue-large.component';
import { UnderConstructionComponent } from './financial/layouts/under-construction-view/under-construction.component';
import { AddMenuComponent } from './financial/component/add-menu/add-menu.component';
import { ExpenseBottomSheetComponent } from './financial/component/expense-bottom-sheet/expense-bottom-sheet.component';
import { NewExpenseViewComponent } from './financial/layouts/new-expense-view/new-expense-view.component';
import { ExpenseNoResultsFoundComponent } from './financial/component/expense-no-results-found/expense-no-results-found.component';
import { NewReceiptViewComponent } from './financial/layouts/new-receipt-view/new-receipt-view.component';
import { AlertOnScreenComponent } from './common/uikit/alert-on-screen/alert-on-screen.component';
import { EntryTableComponent } from './financial/component/entry-table/entry-table.component';
import { EntryListViewComponent } from './financial/layouts/entry-list-view/entry-list-view.component';
import { EntryClassListViewComponent } from './financial/layouts/entry-class-list-view/entry-class-list-view.component';
import { EntryClassEditViewComponent } from './financial/layouts/entry-class-edit-view/entry-class-edit-view.component';
import { AdmViewComponent } from './financial/layouts/adm-view/adm-view.component';
import { JwtInterceptor } from './common/handlers/jwt.interceptor';
import { ErrorInterceptor } from './common/handlers/error.interceptor';
import { ConfigComponent } from './stocks/layouts/register/configuration/config/config.component';
import { NgxCurrencyModule } from "ngx-currency";


import { ConfigDetailComponent } from './stocks/layouts/register/configuration/config-detail/config-detail.component';
import { ConfigNewComponent } from './stocks/layouts/register/configuration/config-new/config-new.component';
import { OperationFilterComponent } from './stocks/layouts/register/operation/operation-filter/operation-filter.component';
import { OperationDetailComponent } from './stocks/layouts/register/operation/operation-detail/operation-detail.component';
import { OperationNewComponent } from './stocks/layouts/register/operation/operation-new/operation-new.component';
import { StockFilterComponent } from './stocks/layouts/register/stock/stock-filter/stock-filter.component';
import { StockDetailComponent } from './stocks/layouts/register/stock/stock-detail/stock-detail.component';
import { StockNewComponent } from './stocks/layouts/register/stock/stock-new/stock-new.component';
import { UserFilterComponent } from './stocks/layouts/register/user/user-filter/user-filter.component';
import { UserDetailComponent } from './stocks/layouts/register/user/user-detail/user-detail.component';
import { UserNewComponent } from './stocks/layouts/register/user/user-new/user-new.component';

@NgModule({
  declarations: [
    AppComponent,
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
    MainViewComponent,
    LoginViewComponent,
    SignupViewComponent,
    ExpenseFilterComponent,
    ExpenseDetailComponent,
    ExpenseNewComponent,
    ExpenseCategoryNewComponent,
    ExpenseCategoryFilterComponent,
    ExpenseCategoryDetailComponent,
    ExpenseDashboardComponent,
    PieChartComponent,
    DateRangeComponent,
    ExpenseRowComponent,
    ExpenseGroupComponent,
    ExpenseTableTitleComponent,
    ExpenseErrorScreenComponent,
    MainNavBarComponent,
    ButtonPrimaryTextComponent,
    ButtonPrimaryIconComponent,
    HomeViewComponent,
    CardComponent,
    BtnPrimaryBlueComponent,
    BtnSecondaryBlueComponent,
    BtnSecondaryBlueLargeComponent,
    BtnPrimaryBlueLargeComponent,
    UnderConstructionComponent,
    AddMenuComponent,
    ExpenseBottomSheetComponent,
    NewExpenseViewComponent,
    ExpenseNoResultsFoundComponent,
    NewReceiptViewComponent,
    AlertOnScreenComponent,
    EntryTableComponent,
    EntryListViewComponent,
    EntryClassListViewComponent,
    EntryClassEditViewComponent,
    AdmViewComponent
  ],
  entryComponents: [
    NewExpenseViewComponent,
    NewReceiptViewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    LayoutModule,
    BrowserAnimationsModule,
    MatCheckboxModule,
    MatCheckboxModule,
    MatButtonModule,
    MatInputModule,
    MatAutocompleteModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatRadioModule,
    MatSelectModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatMenuModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatStepperModule,
    MatTabsModule,
    MatExpansionModule,
    MatButtonToggleModule,
    MatChipsModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatDialogModule,
    MatTooltipModule,
    MatSnackBarModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    ChartsModule,
    FormsModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    NativeDateModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatBottomSheetModule,
    NgxCurrencyModule

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
