import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainViewComponent } from '../stocks/layouts/main-view/main-view.component';
import { LoginViewComponent } from './account/login-view/login-view.component';
import { SignupViewComponent } from './account/signup-view/signup-view.component';
import { MainNavBarComponent } from './main-nav-bar/main-nav-bar.component';
import { ButtonPrimaryTextComponent } from './uikit/button-primary-text/button-primary-text.component';
import { ButtonPrimaryIconComponent } from './uikit/button-primary-icon/button-primary-icon.component';
import { CardComponent } from './uikit/card/card.component';
import { BtnPrimaryBlueComponent } from './uikit/btn-primary-blue/btn-primary-blue.component';
import { BtnSecondaryBlueComponent } from './uikit/btn-secondary-blue/btn-secondary-blue.component';
import { BtnSecondaryBlueLargeComponent } from './uikit/btn-secondary-blue-large/btn-secondary-blue-large.component';
import { BtnPrimaryBlueLargeComponent } from './uikit/btn-primary-blue-large/btn-primary-blue-large.component';
import { UnderConstructionComponent } from '../financial/layouts/under-construction-view/under-construction.component';
import { AlertOnScreenComponent } from './uikit/alert-on-screen/alert-on-screen.component';
import { DateRangeComponent } from './uikit/date-range/date-range.component';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from '../app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { LayoutModule } from '@angular/cdk/layout';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCheckboxModule, MatButtonModule, MatInputModule, MatAutocompleteModule, MatDatepickerModule, MatFormFieldModule, MatRadioModule, MatSelectModule, MatSliderModule, MatSlideToggleModule, MatMenuModule, MatSidenavModule, MatToolbarModule, MatListModule, MatGridListModule, MatCardModule, MatStepperModule, MatTabsModule, MatExpansionModule, MatButtonToggleModule, MatChipsModule, MatIconModule, MatProgressSpinnerModule, MatProgressBarModule, MatDialogModule, MatTooltipModule, MatSnackBarModule, MatTableModule, MatSortModule, MatPaginatorModule, MatNativeDateModule, NativeDateModule, MatBottomSheetModule } from '@angular/material';
import { ChartsModule } from 'ng2-charts-x';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxCurrencyModule } from 'ngx-currency';
import { InfoMessageComponent } from './uikit/info-message/info-message.component';

@NgModule({
  declarations: [
    MainViewComponent,
    LoginViewComponent,
    SignupViewComponent,
    MainNavBarComponent,
    ButtonPrimaryTextComponent,
    ButtonPrimaryIconComponent,
    CardComponent,
    BtnPrimaryBlueComponent,
    BtnSecondaryBlueComponent,
    BtnSecondaryBlueLargeComponent,
    BtnPrimaryBlueLargeComponent,
    UnderConstructionComponent,
    AlertOnScreenComponent,
    DateRangeComponent,
    InfoMessageComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    LayoutModule,
    BrowserAnimationsModule,
    // Material imports -  TODO: remove uncessary ones
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
    MatButtonModule,
    MatBottomSheetModule,
    NgxCurrencyModule
  ],
  exports: [MainViewComponent,
    LoginViewComponent,
    SignupViewComponent,
    MainNavBarComponent,
    ButtonPrimaryTextComponent,
    ButtonPrimaryIconComponent,
    CardComponent,
    BtnPrimaryBlueComponent,
    BtnSecondaryBlueComponent,
    BtnSecondaryBlueLargeComponent,
    BtnPrimaryBlueLargeComponent,
    UnderConstructionComponent,
    AlertOnScreenComponent,
    DateRangeComponent,
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    LayoutModule,
    BrowserAnimationsModule,
    // Material imports -  TODO: remove uncessary
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
    MatButtonModule,
    MatBottomSheetModule,
    NgxCurrencyModule
  ]
})
export class SharedModule { }
