import { BrowserModule } from '@angular/platform-browser';
import { NgModule} from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';
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
import { MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule, MatMenuModule } from '@angular/material';
import { MainNavComponent } from './main-nav/main-nav.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

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
    MainNavComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatMenuModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
