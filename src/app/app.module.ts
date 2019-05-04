import { BrowserModule } from '@angular/platform-browser';
import { NgModule} from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';
import { ConfigComponent } from './register/configuration/config/config.component';
import { ConfigDetailComponent } from './register/configuration/config-detail/config-detail.component';
import { ConfigNewComponent } from './register/configuration/config-new/config-new.component';

@NgModule({
  declarations: [
    AppComponent,
    ConfigComponent,
    ConfigDetailComponent,
    ConfigNewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
