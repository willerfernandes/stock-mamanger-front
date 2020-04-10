import { BrowserModule } from '@angular/platform-browser';
import { NgModule} from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ConfigComponent } from './register/configuration/config/config.component';
import { ConfigDetailComponent } from './register/configuration/config-detail/config-detail.component';
import { ConfigNewComponent } from './register/configuration/config-new/config-new.component';
import { OperationFilterComponent } from './register/operation/operation-filter/operation-filter.component';
import { OperationDetailComponent } from './register/operation/operation-detail/operation-detail.component';
import { OperationNewComponent } from './register/operation/operation-new/operation-new.component';
import { StockFilterComponent } from './register/stock/stock-filter/stock-filter.component';
import { StockDetailComponent } from './register/stock/stock-detail/stock-detail.component';
import { StockNewComponent } from './register/stock/stock-new/stock-new.component';
import { UserFilterComponent } from './register/user/user-filter/user-filter.component';
import { UserDetailComponent } from './register/user/user-detail/user-detail.component';
import { UserNewComponent } from './register/user/user-new/user-new.component';
import { NavbarComponent } from './layouts/navbar/navbar.component';
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




import { MainViewComponent } from './layouts/main-view/main-view.component';
import { LoginViewComponent } from './account/login-view/login-view.component';
import { SignupViewComponent } from './account/signup-view/signup-view.component';
import { ExpenseFilterComponent } from './register/expense/expense-filter/expense-filter.component';
import { ExpenseDetailComponent } from './register/expense/expense-detail/expense-detail.component';
import { ExpenseNewComponent } from './register/expense/expense-new/expense-new.component';
import { ExpenseCategoryNewComponent } from './register/expense/expense-category-new/expense-category-new.component';
import { ExpenseCategoryFilterComponent } from './register/expense/expense-category-filter/expense-category-filter.component';
import { ExpenseCategoryDetailComponent } from './register/expense/expense-category-detail/expense-category-detail.component';
import { ExpenseDashboardComponent } from './layouts/expense-dashboard/expense-dashboard.component';
import { PieChartComponent } from './component/pie-chart/pie-chart.component';
import { DateRangeComponent } from './component/date-range/date-range.component';
import { ExpenseRowComponent } from './component/expense-row/expense-row.component';
import { ExpenseGroupComponent } from './component/expense-group/expense-group.component';
import { ExpenseTableTitleComponent } from './component/expense-table-title/expense-table-title.component';
import { ExpenseErrorScreenComponent } from './component/expense-error-screen/expense-error-screen.component';
import { MainNavBarComponent } from './component/main-nav-bar/main-nav-bar.component';
import { JwtInterceptor } from './account/jwt.interceptor';
import { ErrorInterceptor } from './account/error.interceptor';
import { ButtonPrimaryTextComponent } from './component/basic/button-primary-text/button-primary-text.component';
import { ButtonPrimaryIconComponent } from './component/basic/button-primary-icon/button-primary-icon.component';
import { HomeViewComponent } from './layouts/home-view/home-view.component';
import { CardComponent } from './component/basic/card/card.component';
import { BtnPrimaryBlueComponent } from './component/basic/btn-primary-blue/btn-primary-blue.component';
import { BtnSecondaryBlueComponent } from './component/basic/btn-secondary-blue/btn-secondary-blue.component';
import { BtnSecondaryBlueLargeComponent } from './component/basic/btn-secondary-blue-large/btn-secondary-blue-large.component';
import { BtnPrimaryBlueLargeComponent } from './component/basic/btn-primary-blue-large/btn-primary-blue-large.component';
import { UnderConstructionComponent } from './layouts/under-construction/under-construction.component';
import { TopNavbarComponent } from './component/top-navbar/top-navbar.component';
import { AddMenuComponent } from './component/add-menu/add-menu.component';
import { ExpenseBottomSheetComponent } from './component/expense-bottom-sheet/expense-bottom-sheet.component';
import { NewExpenseViewComponent } from './layouts/new-expense-view/new-expense-view.component';

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
    NavbarComponent,
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
    TopNavbarComponent,
    AddMenuComponent,
    ExpenseBottomSheetComponent,
    NewExpenseViewComponent
  ],
  entryComponents: [
    NewExpenseViewComponent
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
    MatBottomSheetModule

  ],
  providers: [
    MatDatepickerModule,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    CurrencyPipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
